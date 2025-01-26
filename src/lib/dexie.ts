import Dexie, { type EntityTable } from "dexie";

interface EventTable {
  eventId: number;
  name: string;
}

const db = new Dexie("_db") as Dexie & {
  event: EntityTable<EventTable, "eventId">;
};

db.version(1).stores({
  event: "++eventId",
});

export { db };
export type { EventTable };
