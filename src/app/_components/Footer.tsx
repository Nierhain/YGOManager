import { Heart } from "lucide-react";
import Link from "next/link";

export default async function Footer() {
  return (
    <footer className="flex h-32 items-end justify-center bg-violet-950">
      <div className="bg-base-300 text-base-content p-4">
        Made with &lt;3 by <Link href="https://www.nierhain.de/">Nierhain</Link>
      </div>
    </footer>
  );
}
