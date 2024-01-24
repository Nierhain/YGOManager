import { Session } from "next-auth";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/lib/components/ui/avatar";
import { Button } from "~/lib/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/lib/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "~/lib/components/ui/navigation-menu";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Navigation() {
  const session = await getServerAuthSession();
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div></div>
        {session ? (
          <UserInfo session={session} />
        ) : (
          <Link href="/api/auth/signin">
            <Button>Sign in</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

function UserInfo({ session }: { session: Session }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session.user.image ?? ""} />
          <AvatarFallback>{session.user.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
