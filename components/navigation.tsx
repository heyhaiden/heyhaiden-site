"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home", exact: true },
  { href: "/about", label: "About", exact: true },
  { href: "/projects", label: "Projects", exact: false },
];

function isActive(pathname: string, href: string, exact: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border">
      <nav className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-semibold text-foreground focus-visible:outline-none"
        >
          HM
        </Link>
        <div className="flex gap-8">
          {links.map(({ href, label, exact }) => {
            const active = isActive(pathname, href, exact);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-1 text-sm font-medium transition-colors focus-visible:outline-none",
                  active ? "text-primary" : "text-gray-600 hover:text-gray-900"
                )}
              >
                {label}
                {active && (
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
