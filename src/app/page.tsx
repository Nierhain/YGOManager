import { getServerAuthSession } from "~/server/auth";
import Navigation from "./_components/Header";
import { Button } from "~/lib/components/ui/button";
import { api } from "~/trpc/server";
import UpdateDb from "./_components/UpdateDb";

export default async function Home() {
  const session = await getServerAuthSession();
  const isAdmin = session?.user.role === "Admin";
  return (
    <div className="flex flex-col">
      <div>Hello World</div>
      {isAdmin && <UpdateDb />}
    </div>
  );
}
