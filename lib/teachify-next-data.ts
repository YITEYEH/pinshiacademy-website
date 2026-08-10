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
  Accept: "text/html",
  "User-Agent":
    "PinShiAcademyBot/1.0 (+https://www.pinshiacademy.com; catalog sync)",
};

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
