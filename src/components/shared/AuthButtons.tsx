"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import UserDropdown from "./UserDropdown";
import { Button } from "@/components/ui/button";

export default function AuthButtons() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />;
  }

  if (user) {
    return <UserDropdown user={user} onSignOut={() => signOut()} />;
  }

  return (
    <div className="flex items-center gap-5">
      <Link
        href="/log-in"
        className="hidden sm:inline-flex text-sm font-medium text-[#7C65E8] hover:text-[#9A85FF] transition-colors"
      >
        Sign In
      </Link>

      <Link href="/sign-up">
        <Button className="h-9 px-5 rounded-xl font-semibold text-sm text-white bg-[#5E48FF] hover:bg-[#523DE6] shadow-[0_0_20px_rgba(94,72,255,0.45)]">
          Get Started
        </Button>
      </Link>
    </div>
  );
}