import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../dexie";

export const useDexieQuery = <I>(
  query: (dexie: typeof db) => Promise<I[]>,
  deps: unknown[] = []
) => {
  const results = useLiveQuery(async () => {
    try {
      const result = await query(db);
      return { data: result, error: null };
    } catch (error) {
      return {
        data: null,
        error:
          error instanceof Error ? error : new Error(JSON.stringify(error)),
      };
    }
  }, deps);

  if (results === undefined) {
    return { data: null, error: null, loading: true as const };
  } else if (results.error !== null) {
    return { data: null, error: results.error, loading: false as const };
  }

  return { data: results.data, error: null, loading: false as const };
};
