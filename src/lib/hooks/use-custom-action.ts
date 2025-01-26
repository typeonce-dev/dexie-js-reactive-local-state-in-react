import { startTransition, useActionState } from "react";

export const useCustomAction = <Payload, Result>(
  execute: (params: Payload) => Promise<Result>
) => {
  const [state, action, pending] = useActionState<Error | null, Payload>(
    async (_, params) => {
      try {
        await execute(params);
        return null;
      } catch (error) {
        return error instanceof Error
          ? error
          : new Error(JSON.stringify(error));
      }
    },
    null
  );

  return [
    state,
    (payload: Payload) =>
      startTransition(() => {
        action(payload);
      }),
    pending,
  ] as const;
};
