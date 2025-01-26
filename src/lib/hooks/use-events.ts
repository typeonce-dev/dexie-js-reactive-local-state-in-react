import { useDexieQuery } from "./use-dexie-query";

export const useEvents = () => {
  return useDexieQuery((_) => _.event.toArray());
};
