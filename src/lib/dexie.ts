import * as _Dexie from "dexie";

interface EventTable {
  eventId: number;
  name: string;
}

const db = new _Dexie.Dexie("_db") as _Dexie.Dexie & {
  event: _Dexie.EntityTable<EventTable, "eventId">;
};

db.version(1).stores({
  event: "++eventId",
});

export { db };
export type { EventTable };
