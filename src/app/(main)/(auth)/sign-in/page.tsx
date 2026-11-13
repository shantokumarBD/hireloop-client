import type { Metadata } from "next";
import { Suspense } from "react";
import SignInForm from "@/components/forms/SignInForm";

export const metadata: Metadata = {
  title: "Sign In — HireLoop",
  description: "Sign in to your HireLoop account to explore curated job opportunities.",
};

export default function SignInPage() {
  return (
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <Suspense fallback={null}>
        <SignInForm />
      </Suspense>
    </main>
  );
}
