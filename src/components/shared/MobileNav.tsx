"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { navItems } from "./NavLinks";
import Logo from "./Logo";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "@/lib/auth-client";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        
        <SheetTrigger className="p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 cursor-pointer inline-flex items-center justify-center">
          <Menu className="w-5 h-5" />
        </SheetTrigger>

        <SheetContent
          side="right"
          className="bg-[#0F1014] border-white/10 text-white w-72 flex flex-col justify-between p-6"
        >
          <div>
            <SheetHeader className="text-left pb-4 border-b border-white/10">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div onClick={() => setOpen(false)}>
                <Logo />
              </div>
            </SheetHeader>

            <div className="flex flex-col gap-3 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {user ? (
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={(user as any)?.imageUrl || user?.image || "/images/placeholder-avatar.svg"}
                  alt={user.name || "User"}
                  className="w-9 h-9 rounded-full object-cover border border-white/10 shrink-0"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/placeholder-avatar.svg";
                  }}
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                  <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
                </div>
              </div>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#5E48FF] text-white shrink-0"
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="w-full text-center py-2 rounded-xl text-sm border border-white/10 text-[#8B7BF7] hover:bg-white/5 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setOpen(false)}
                className="w-full text-center py-2 rounded-xl text-sm font-bold text-white bg-[#5E48FF] shadow-[0_0_20px_rgba(94,72,255,0.4)]"
              >
                Get Started
              </Link>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}