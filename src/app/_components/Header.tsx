import Link from "next/link";
import { Button } from "~/lib/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { UserInfo } from "./UserInfo";
import { NavigationMenu } from "~/lib/components/ui/navigation-menu";
import Navigation from "./Navigation";
import { ModeToggle } from "~/lib/components/themeToggle";

export default async function Header() {
  const session = await getServerAuthSession();
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div>Logo</div>
        <Navigation />
        <div className="flex h-16 items-center justify-between gap-4">
          <ModeToggle />
          {session ? (
            <UserInfo />
          ) : (
            <Link href="/api/auth/signin">
              <Button>Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
