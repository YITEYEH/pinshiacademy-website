import "server-only";

import {
  TEACHIFY_CACHE_TAG,
  TEACHIFY_REVALIDATE_SECONDS,
} from "@/lib/teachify-cache";

type ApolloRef = { __ref: string };

type ApolloEntity = Record<string, unknown> & {
  __typename?: string;
};

export type TeachifyApolloState = Record<string, ApolloEntity>;

export function parseTeachifyNextData(html: string): TeachifyApolloState | null {
  const match = html.match(
    /<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/,
  );
  if (!match?.[1]) return null;

  try {
    const data = JSON.parse(match[1]) as {
      props?: { pageProps?: { __APOLLO_STATE__?: TeachifyApolloState } };
    };
    return data.props?.pageProps?.__APOLLO_STATE__ ?? null;
  } catch {
    return null;
  }
}

export function resolveApolloRef<T extends ApolloEntity>(
  state: TeachifyApolloState,
  ref: ApolloRef | undefined,
): T | null {
  if (!ref?.__ref) return null;
  const entity = state[ref.__ref];
  return entity ? (entity as T) : null;
}

export function findSessionQueryKey(
  state: TeachifyApolloState,
  mode: "upcoming" | "past",
): string | null {
  const root = state.ROOT_QUERY;
  if (!root) return null;

  return (
    Object.keys(root).find((key) => {
      if (!key.startsWith('sessions(')) return false;
      return mode === "upcoming"
        ? key.includes('"gte"')
        : key.includes('"lt"');
    }) ?? null
  );
}

export function getSessionEventRefs(
  state: TeachifyApolloState,
  mode: "upcoming" | "past",
): ApolloRef[] {
  const queryKey = findSessionQueryKey(state, mode);
  if (!queryKey) return [];

  const page = rootQueryValue(state, queryKey) as
    | { nodes?: ApolloRef[] }
    | undefined;

  return page?.nodes ?? [];
}

function rootQueryValue(state: TeachifyApolloState, key: string): unknown {
  const root = state.ROOT_QUERY;
  if (!root) return undefined;
  return root[key];
}

const TEACHIFY_FETCH_HEADERS = {
  Accept: "text/html,application/xhtml+xml",
  "User-Agent":
    "Mozilla/5.0 (compatible; PinShiAcademyBot/1.0; +https://www.pinshiacademy.com)",
};

export function extractTeachifyFlightText(html: string): string {
  const chunks: string[] = [];
  const re = /self\.__next_f\.push\(\[(\d+),("[\s\S]*?")\]\)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html))) {
    try {
      const value = JSON.parse(match[2]) as unknown;
      if (typeof value === "string") chunks.push(value);
    } catch {
      // ignore malformed flight chunk
    }
  }
  return chunks.join("\n");
}

function parseFlightJson(raw: string): unknown {
  return JSON.parse(raw.replace(/[\u0000-\u001F]/g, ""));
}

export function extractFlightLecturerName(html: string): string | undefined {
  const blob = `${html}\n${extractTeachifyFlightText(html)}`;
  const patterns = [
    /"performer":\{"@type":"Person","name":"((?:\\.|[^"\\])*)"/,
    /\\"performer\\":\{\\"@type\\":\\"Person\\",\\"name\\":\\"((?:\\.|[^"\\])*)\\"/,
    /"lecturers":\[\{"name":"((?:\\.|[^"\\])*)"/,
  ];

  for (const pattern of patterns) {
    const match = blob.match(pattern);
    if (!match?.[1]) continue;
    try {
      return JSON.parse(`"${match[1]}"`) as string;
    } catch {
      return match[1];
    }
  }

  return undefined;
}

function extractBalancedObject(source: string, braceStart: number): string | null {
  if (source[braceStart] !== "{") return null;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = braceStart; i < source.length; i += 1) {
    const ch = source[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === "{") depth += 1;
    else if (ch === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(braceStart, i + 1);
    }
  }
  return null;
}

function enclosingObjectStarts(source: string, fromIndex: number): number[] {
  const starts: number[] = [];
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = fromIndex; i >= 0; i -= 1) {
    const ch = source[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === "}") depth += 1;
    else if (ch === "{") {
      if (depth === 0) starts.push(i);
      else depth -= 1;
    }
  }
  return starts;
}

export function extractFlightObjectsByTypename<T extends Record<string, unknown>>(
  html: string,
  typename: string,
): T[] {
  const blob = extractTeachifyFlightText(html);
  const marker = `"__typename":"${typename}"`;
  const seen = new Set<string>();
  const results: T[] = [];
  let from = 0;

  while (from < blob.length) {
    const idx = blob.indexOf(marker, from);
    if (idx < 0) break;
    from = idx + marker.length;

    for (const start of enclosingObjectStarts(blob, idx - 1)) {
      const raw = extractBalancedObject(blob, start);
      if (!raw) continue;
      try {
        const parsed = parseFlightJson(raw) as T & {
          __typename?: string;
          slug?: string;
          id?: string;
        };
        if (parsed.__typename !== typename) continue;
        const key = String(parsed.slug ?? parsed.id ?? raw);
        if (seen.has(key)) break;
        seen.add(key);
        results.push(parsed);
        break;
      } catch {
        // try outer object
      }
    }
  }

  return results;
}

export function extractFlightObjectBySlug<T extends Record<string, unknown>>(
  html: string,
  slug: string,
  isMatch: (value: T) => boolean,
): T | null {
  const blob = extractTeachifyFlightText(html);
  const marker = `"slug":"${slug}"`;
  let from = 0;

  while (from < blob.length) {
    const idx = blob.indexOf(marker, from);
    if (idx < 0) break;
    from = idx + marker.length;

    for (const start of enclosingObjectStarts(blob, idx - 1)) {
      const raw = extractBalancedObject(blob, start);
      if (!raw) continue;
      try {
        const parsed = parseFlightJson(raw) as T;
        if (isMatch(parsed)) return parsed;
      } catch {
        // try outer object
      }
    }
  }

  return null;
}

export async function fetchTeachifyHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      next: {
        revalidate: TEACHIFY_REVALIDATE_SECONDS,
        tags: [TEACHIFY_CACHE_TAG],
      },
      // 必須每次請求新建 timeout；模組層共用 signal 會在 15 秒後永久 aborted
      signal: AbortSignal.timeout(15_000),
      headers: TEACHIFY_FETCH_HEADERS,
    });
    if (!res.ok) {
      console.error(`[teachify] fetch failed ${res.status} ${url}`);
      return null;
    }
    return res.text();
  } catch (error) {
    console.error(`[teachify] fetch error ${url}`, error);
    return null;
  }
}

export function getCourseRefsFromCategoryPage(
  state: TeachifyApolloState,
): ApolloRef[] {
  const category = Object.values(state).find(
    (entity) =>
      entity.__typename === "Category" &&
      Object.keys(entity).some((key) => key.startsWith("courses(")),
  );
  if (!category) return [];

  const coursesKey = Object.keys(category).find((key) =>
    key.startsWith("courses("),
  );
  if (!coursesKey) return [];

  const page = category[coursesKey] as { nodes?: ApolloRef[] } | undefined;
  return page?.nodes ?? [];
}
