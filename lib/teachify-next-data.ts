import "server-only";

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
