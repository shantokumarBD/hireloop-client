"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { ROUTES } from "@/constants/routes";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate password reset dispatch
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[440px] rounded-2xl bg-[#0B0C10] border border-white/10 p-6 sm:p-8 shadow-2xl">
        {/* Logo and Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <Logo />
          <h1 className="mt-5 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Reset Password
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Enter your email and we&apos;ll send you instructions to reset your password.
          </p>
        </div>

        {isSubmitted ? (
          <div className="space-y-6 text-center">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex flex-col items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              <p className="font-semibold">Reset Link Sent</p>
              <p className="text-xs text-zinc-300">
                If an account exists for <span className="text-white font-medium">{email}</span>, you will receive password reset instructions shortly.
              </p>
            </div>

            <Link
              href={ROUTES.SIGN_IN}
              className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-zinc-300 mb-1.5"
              >
                Email address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-zinc-500 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  placeholder="name@example.com"
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#5C53FE] transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full h-11 mt-2 rounded-xl bg-[#5C53FE] hover:bg-[#4E44FE] disabled:opacity-50 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(92,83,254,0.3)] cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending reset link...</span>
                </>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>

            {/* Back to Sign In Link */}
            <p className="mt-6 text-center text-xs text-zinc-400">
              Remember your password?{" "}
              <Link
                href={ROUTES.SIGN_IN}
                className="font-medium text-[#5C53FE] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
