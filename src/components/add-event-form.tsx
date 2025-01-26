import { db } from "../lib/dexie";
import { useCustomAction } from "../lib/hooks/use-custom-action";

export default function AddEventForm() {
  const [error, action, pending] = useCustomAction((params: FormData) => {
    const name = params.get("name") as string;
    return db.event.add({ name });
  });

  return (
    <form action={action}>
      <input type="text" name="name" />
      <button type="submit" disabled={pending}>
        Add
      </button>
      {error !== null ? <p>Error: {error.message}</p> : null}
    </form>
  );
}
