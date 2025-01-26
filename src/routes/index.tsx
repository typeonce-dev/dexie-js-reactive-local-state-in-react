import { createFileRoute } from "@tanstack/react-router";
import AddEventForm from "../components/add-event-form";
import ListEvents from "../components/list-events";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <main>
      <AddEventForm />
      <ListEvents />
    </main>
  );
}
