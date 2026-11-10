"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Briefcase,
  UserCheck,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import { signIn, signUp, signOut } from "@/lib/auth-client";

export default function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"seeker" | "recruiter" | "admin">("seeker");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form submit handler (try-finally pattern)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await signUp.email({
        name,
        email,
        password,
        role,
      });

      if (error) {
        setErrorMsg(error.message || "Failed to create account. Please try again.");
        return;
      }

      // Reset form and redirect on success
      form.reset();
      await signOut();
      router.push("/sign-in");
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  // One-click Google sign up
  const handleGoogleSignUp = async () => {
    setErrorMsg("");
    setIsGoogleLoading(true);

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to sign up with Google.";
      setErrorMsg(message);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[460px] rounded-2xl bg-[#0B0C10] border border-white/10 p-6 sm:p-8 shadow-2xl">
      {/* Logo and Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <Logo />
        <h1 className="mt-5 text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Create an Account
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Join HireLoop to land your next dream role
        </p>
      </div>

      {/* Error Message Alert */}
      {errorMsg && (
        <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Role Selector (Seeker, Recruiter, Admin) */}
      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 mb-6">
        <button
          type="button"
          onClick={() => setRole("seeker")}
          className={`h-9 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            role === "seeker"
              ? "bg-[#5C53FE] text-white shadow-md"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <UserCheck className="w-3.5 h-3.5 shrink-0" />
          <span>Seeker</span>
        </button>

        <button
          type="button"
          onClick={() => setRole("recruiter")}
          className={`h-9 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            role === "recruiter"
              ? "bg-[#5C53FE] text-white shadow-md"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5 shrink-0" />
          <span>Recruiter</span>
        </button>

        <button
          type="button"
          onClick={() => setRole("admin")}
          className={`h-9 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            role === "admin"
              ? "bg-[#5C53FE] text-white shadow-md"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span>Admin</span>
        </button>
      </div>

      {/* One-click Google sign up */}
      <button
        type="button"
        onClick={handleGoogleSignUp}
        disabled={isGoogleLoading || isLoading}
        className="w-full h-11 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-50 border border-white/10 text-white text-sm font-medium flex items-center justify-center gap-3 transition-colors cursor-pointer"
      >
        {isGoogleLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        )}
        <span>{isGoogleLoading ? "Connecting..." : "Sign up with Google"}</span>
      </button>

      {/* Divider */}
      <div className="relative my-6 flex items-center justify-center">
        <div className="w-full border-t border-white/10" />
        <span className="absolute bg-[#0B0C10] px-3 text-xs text-zinc-500 uppercase tracking-wider">
          or with email
        </span>
      </div>

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-medium text-zinc-300 mb-1.5"
          >
            Full name
          </label>
          <div className="relative flex items-center">
            <User className="absolute left-3.5 w-4 h-4 text-zinc-500 pointer-events-none" />
            <input
              id="name"
              type="text"
              name="name"
              required
              disabled={isLoading || isGoogleLoading}
              placeholder="John Doe"
              className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#5C53FE] transition-colors disabled:opacity-50"
            />
          </div>
        </div>

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
              disabled={isLoading || isGoogleLoading}
              placeholder="name@example.com"
              className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#5C53FE] transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-medium text-zinc-300 mb-1.5"
          >
            Password
          </label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 w-4 h-4 text-zinc-500 pointer-events-none" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              required
              disabled={isLoading || isGoogleLoading}
              placeholder="Minimum 8 characters"
              minLength={8}
              className="w-full h-11 pl-10 pr-10 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#5C53FE] transition-colors disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-zinc-500 hover:text-zinc-300 cursor-pointer"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-start gap-2 pt-1">
          <input
            id="terms"
            type="checkbox"
            required
            disabled={isLoading || isGoogleLoading}
            className="mt-0.5 rounded bg-white/5 border-white/10 text-[#5C53FE] focus:ring-[#5C53FE]"
          />
          <label htmlFor="terms" className="text-xs text-zinc-400 leading-snug">
            I agree to the{" "}
            <Link href="/terms" className="text-[#5C53FE] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#5C53FE] hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || isGoogleLoading}
          className="w-full h-11 mt-2 rounded-xl bg-[#5C53FE] hover:bg-[#4E44FE] disabled:opacity-50 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(92,83,254,0.3)] cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Sign In Link */}
      <p className="mt-6 text-center text-xs text-zinc-400">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-[#5C53FE] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
