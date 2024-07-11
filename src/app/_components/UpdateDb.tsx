"use client";

import { Button } from "~/lib/components/ui/button";
import { api } from "~/trpc/react";

export default function UpdateDb() {
  const { mutate: update } = api.card.updateDb.useMutation();
  return <Button onClick={() => update()}>Update DB</Button>;
}
