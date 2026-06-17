"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-[hsl(var(--border))]">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-[hsl(var(--foreground))]">
          HM
        </Link>
        <div className="flex gap-8">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative py-1 text-sm font-medium transition-colors",
                  active
                    ? "text-[hsl(var(--primary))]"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {label}
                {active && (
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[hsl(var(--primary))] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
