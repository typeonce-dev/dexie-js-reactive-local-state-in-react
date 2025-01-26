import { db } from "../lib/dexie";
import { useCustomAction } from "../lib/hooks/use-custom-action";
import { useEvents } from "../lib/hooks/use-events";

export default function ListEvents() {
  const events = useEvents();
  const [error, action, pending] = useCustomAction(
    (params: { name: string; eventId: number }) =>
      db.event.update(params.eventId, { name: params.name })
  );

  if (events.loading) {
    return <p>Loading...</p>;
  } else if (events.error !== null) {
    return <p>Error: {events.error.message}</p>;
  }

  return (
    <div>
      {events.data.map((event) => (
        <div key={event.eventId}>
          <input
            type="text"
            defaultValue={event.name}
            readOnly={pending}
            onChange={(e) =>
              action({ name: e.target.value, eventId: event.eventId })
            }
          />
          {error !== null ? <p>Error: {error.message}</p> : null}
        </div>
      ))}
    </div>
  );
}
