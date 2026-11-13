"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navItems = [
  { name: "Browse Jobs", href: "/jobs" },
  { name: "Company", href: "/companies" },
  { name: "Pricing", href: "/pricing" },
];

function NavLinksContent() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-7">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium transition-colors ${
              active ? "text-white font-semibold" : "text-zinc-300 hover:text-white"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default function NavLinks() {
  return (
    <Suspense
      fallback={
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      }
    >
      <NavLinksContent />
    </Suspense>
  );
}
