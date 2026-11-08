import type { Metadata } from "next";
import SignUpForm from "@/components/forms/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up — HireLoop",
  description: "Create your HireLoop account to find your next role or hire world-class talent.",
};

export default function SignUpPage() {
  return (
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <SignUpForm />
    </main>
  );
}
