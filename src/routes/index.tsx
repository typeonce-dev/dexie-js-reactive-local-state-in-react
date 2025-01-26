import { createFileRoute } from "@tanstack/react-router";
import AddEventForm from "../components/add-event-form";
import { db } from "../lib/dexie";
import { useCustomAction } from "../lib/hooks/use-custom-action";
import { useEvents } from "../lib/hooks/use-events";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
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
    <main>
      <AddEventForm />

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
    </main>
  );
}
