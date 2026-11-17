"use client";

import React, { useState } from "react";
import {
  Shield,
  ShieldCheck,
  Lock,
  Server,
  Database,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Save,
  RotateCcw,
  User,
  KeyRound,
  Zap,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/toast";

interface AdminSettingsViewProps {
  adminUser: {
    name: string;
    email: string;
    role: string;
  };
  apiUrl: string;
}

export function AdminSettingsView({
  adminUser,
  apiUrl,
}: AdminSettingsViewProps) {
  // Settings state
  const [quotaLimit, setQuotaLimit] = useState<number>(3);
  const [allowSignups, setAllowSignups] = useState<boolean>(true);
  const [allowRecruiterOnboarding, setAllowRecruiterOnboarding] =
    useState<boolean>(true);
  const [autoExpireJobs, setAutoExpireJobs] = useState<boolean>(true);
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSavePolicies = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.add({
        title: "Policies Updated",
        description: `Application quota saved (${quotaLimit} applications/user).`,
      });
    }, 600);
  };

  const handleMaintenanceToggle = (checked: boolean) => {
    setMaintenanceMode(checked);
    if (checked) {
      toast.add({
        title: "Maintenance Mode Activated",
        description: "Public registration and job posting are now temporarily throttled.",
      });
    } else {
      toast.add({
        title: "Maintenance Mode Disabled",
        description: "Platform is running in normal operational mode.",
      });
    }
  };

  return (
    <div className="space-y-6 text-zinc-100 max-w-[1440px] mx-auto pb-12">
      {/* 1. Header */}
      <div className="pt-2">
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            System Configuration & Security
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#5C53FE]/15 text-[#7E77FE] border border-[#5C53FE]/30">
            System Settings
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Manage global application quotas, platform security parameters, and
          maintenance modes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols wide on desktop): Core Platform Policies */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Application Quotas & Platform Policies */}
          <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#1E2333]">
              <div className="flex items-center gap-2.5">
                <Sliders className="w-5 h-5 text-[#7E77FE]" />
                <h2 className="text-base font-bold text-white">
                  Application Quota & Registration Policies
                </h2>
              </div>
              <Button
                type="button"
                onClick={handleSavePolicies}
                disabled={isSaving}
                className="h-9 px-4 rounded-xl bg-[#5C53FE] hover:bg-[#4E44FE] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? "Saving..." : "Save Policies"}</span>
              </Button>
            </div>

            <div className="space-y-5">
              {/* Free Application Quota Input */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#161B2B] border border-[#232A3E]">
                <div>
                  <p className="text-sm font-semibold text-zinc-100">
                    Complimentary Job Application Quota
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Number of free applications granted to standard job seekers
                    before Pro upgrade.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Input
                    type="number"
                    min="1"
                    max="50"
                    value={quotaLimit}
                    onChange={(e) => setQuotaLimit(Number(e.target.value) || 1)}
                    className="w-20 h-10 bg-[#111522] border-[#2B3245] rounded-xl text-center font-bold text-zinc-100 focus-visible:ring-1 focus-visible:ring-[#5C53FE]"
                  />
                  <span className="text-xs font-medium text-zinc-400">
                    apps
                  </span>
                </div>
              </div>

              {/* Toggle: Candidate Signups */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#161B2B] border border-[#232A3E]">
                <div>
                  <p className="text-sm font-semibold text-zinc-100">
                    Candidate Signups & Better-Auth Access
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Allow new candidates to register via email and password.
                  </p>
                </div>
                <Switch
                  checked={allowSignups}
                  onCheckedChange={setAllowSignups}
                  className="data-[state=checked]:bg-[#5C53FE] cursor-pointer"
                />
              </div>

              {/* Toggle: Recruiter Onboarding */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#161B2B] border border-[#232A3E]">
                <div>
                  <p className="text-sm font-semibold text-zinc-100">
                    Recruiter Self-Registration
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Allow employers to create hiring accounts and publish job
                    listings.
                  </p>
                </div>
                <Switch
                  checked={allowRecruiterOnboarding}
                  onCheckedChange={setAllowRecruiterOnboarding}
                  className="data-[state=checked]:bg-[#5C53FE] cursor-pointer"
                />
              </div>

              {/* Toggle: Auto-expire jobs after 30 days */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#161B2B] border border-[#232A3E]">
                <div>
                  <p className="text-sm font-semibold text-zinc-100">
                    Auto-Close Listings Past Deadline
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Automatically transition job postings to Closed status when
                    their deadline expires.
                  </p>
                </div>
                <Switch
                  checked={autoExpireJobs}
                  onCheckedChange={setAutoExpireJobs}
                  className="data-[state=checked]:bg-[#5C53FE] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Security & Infrastructure Audits */}
          <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#1E2333]">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white">
                Platform Security & Architecture Audits
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {/* Audit 1: Rate Limiter */}
              <div className="p-3.5 rounded-xl bg-[#161B2B] border border-[#232A3E] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-200">
                    Express Rate Limiter
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Global quota: 300 requests / 15 minutes per IP.
                </p>
              </div>

              {/* Audit 2: Helmet HTTP Headers */}
              <div className="p-3.5 rounded-xl bg-[#161B2B] border border-[#232A3E] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-200">
                    Helmet Security Headers
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Enabled
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  HSTS, NoSniff, X-Frame-Options & Cross-Origin policies.
                </p>
              </div>

              {/* Audit 3: Stripe Cryptographic Webhook */}
              <div className="p-3.5 rounded-xl bg-[#161B2B] border border-[#232A3E] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-200">
                    Stripe Webhook Guard
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    HMAC-SHA256
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Payload signature verification prior to JSON body parsing.
                </p>
              </div>

              {/* Audit 4: Dual-Layer Zod Validation */}
              <div className="p-3.5 rounded-xl bg-[#161B2B] border border-[#232A3E] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-200">
                    Zod Request Validation
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#5C53FE]/10 text-[#7E77FE] border border-[#5C53FE]/30">
                    Dual Layer
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Client actions (0ms UI feedback) & Express API gateway.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col wide): Maintenance & Admin Profile */}
        <div className="space-y-6">
          {/* Maintenance Mode Card */}
          <div
            className={`rounded-2xl p-6 border transition-all ${
              maintenanceMode
                ? "bg-amber-950/20 border-amber-500/40"
                : "bg-[#111522] border-[#1E2333]"
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#1E2333]">
              <div className="flex items-center gap-2">
                <AlertTriangle
                  className={`w-4 h-4 ${
                    maintenanceMode ? "text-amber-400" : "text-zinc-400"
                  }`}
                />
                <h3 className="text-sm font-bold text-white">
                  Maintenance Mode
                </h3>
              </div>
              <Switch
                checked={maintenanceMode}
                onCheckedChange={handleMaintenanceToggle}
                className="data-[state=checked]:bg-amber-500 cursor-pointer"
              />
            </div>
            <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
              When activated, candidate applications and employer job postings
              will display a friendly maintenance notice while database upgrades
              occur.
            </p>
          </div>

          {/* Admin Identity Card */}
          <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#1E2333]">
              <User className="w-4 h-4 text-[#7E77FE]" />
              <h3 className="text-sm font-bold text-white">
                Admin Authentication
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-[11px] text-zinc-400">Active Administrator</p>
                <p className="text-sm font-semibold text-white mt-0.5">
                  {adminUser.name}
                </p>
              </div>

              <div>
                <p className="text-[11px] text-zinc-400">Authenticated Email</p>
                <p className="text-xs font-mono text-zinc-300 mt-0.5 truncate">
                  {adminUser.email}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400">Granted Role</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#5C53FE]/20 text-[#A5A0FF] border border-[#5C53FE]/40 uppercase tracking-wider">
                  {adminUser.role}
                </span>
              </div>
            </div>
          </div>

          {/* Environment & Backend Connection */}
          <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#1E2333]">
              <Server className="w-4 h-4 text-zinc-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Environment Info
              </h3>
            </div>

            <div className="text-xs space-y-2 text-zinc-300">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">API Endpoint:</span>
                <span className="font-mono text-[11px] text-zinc-300">
                  {apiUrl}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Database Engine:</span>
                <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1">
                  <Database className="w-3 h-3" /> MongoDB Atlas
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Platform Core:</span>
                <span className="text-[11px] text-zinc-400">
                  Next.js 16 + Express 5
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
