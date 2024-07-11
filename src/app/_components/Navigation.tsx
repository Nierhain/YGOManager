"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/lib/components/ui/navigation-menu";

const menuItems = [
  {
    title: "Home",
    href: "/",
  },
  { title: "Cards", href: "/cards" },
  { title: "Decks", href: "/decks" },
  { title: "Collection", href: "/collection" },
];

export default function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menuItems.map((x) => (
          <MenuItem title={x.title} href={x.href} key={x.title} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MenuItem({ title, href }: { title: string; href: string }) {
  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {title}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}
