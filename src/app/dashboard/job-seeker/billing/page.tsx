"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Mail,
  Check,
  CreditCard,
  Download,
  Plus,
  HelpCircle,
  Shield,
  ExternalLink,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

interface BillingInvoice {
  id: string;
  date: string;
  plan: string;
  amount: string;
  transactionId: string;
  status: "Paid" | "Pending" | "Failed";
}

const INVOICES: BillingInvoice[] = [
  {
    id: "inv-1",
    date: "Sep 24, 2023",
    plan: "Professional Tier",
    amount: "$29.00",
    transactionId: "TRX-948102-HL",
    status: "Paid",
  },
  {
    id: "inv-2",
    date: "Aug 24, 2023",
    plan: "Professional Tier",
    amount: "$29.00",
    transactionId: "TRX-771920-HL",
    status: "Paid",
  },
  {
    id: "inv-3",
    date: "Jul 24, 2023",
    plan: "Professional Tier",
    amount: "$29.00",
    transactionId: "TRX-331005-HL",
    status: "Paid",
  },
  {
    id: "inv-4",
    date: "Jun 24, 2023",
    plan: "Standard Tier",
    amount: "$12.00",
    transactionId: "TRX-220199-HL",
    status: "Paid",
  },
];

export default function BillingPage() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  const handleExportPDF = () => {
    toast.add({
      title: "Exporting Invoices",
      description: "Your billing statement is being generated as a PDF report.",
      type: "success",
    });
  };

  const filteredInvoices = INVOICES.filter((inv) =>
    inv.plan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Top Search Bar & User Utilities */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3 flex-1">
          {/* Mobile Sidebar Trigger */}
          <div className="md:hidden">
            <SidebarTrigger className="text-zinc-400 hover:text-white hover:bg-zinc-800/60 p-2 rounded-lg" />
          </div>

          {/* Search Bar matching Figma */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search invoices or plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0e121b] border border-zinc-800/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#5C53FE]/60 focus:ring-1 focus:ring-[#5C53FE]/60 transition-all"
            />
          </div>
        </div>

        {/* Right utility buttons: Notifications, Messages, User Avatar */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            type="button"
            aria-label="Notifications"
            className="w-10 h-10 rounded-xl bg-[#0e121b] border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-2.5 right-2.5 ring-2 ring-[#0e121b]" />
          </button>

          <button
            type="button"
            aria-label="Messages"
            className="w-10 h-10 rounded-xl bg-[#0e121b] border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4" />
          </button>

          <div className="w-10 h-10 rounded-xl bg-[#0e121b] border border-zinc-700/60 overflow-hidden flex items-center justify-center shrink-0">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User Avatar"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                {session?.user?.name?.charAt(0).toUpperCase() || "S"}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Subscription & Billing
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Manage your professional tier features, recurring payments, and billing history.
        </p>
      </div>

      {/* Top 2 Cards: Current Plan & Payment Method */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card 1: Current Plan (takes 7 cols on large screens) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0e121b] border border-zinc-800/80 p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-sm">
          <div>
            {/* Top row: Badge and Price */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/60 uppercase tracking-wider">
                  Current Plan
                </span>
                <h2 className="text-2xl font-bold text-white mt-3">
                  Professional Tier
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Unlock global job insights and unlimited applications.
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-3xl font-extrabold text-white">$29</span>
                  <span className="text-xs text-zinc-400">/mo</span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Next billing date: Oct 24, 2023
                </p>
              </div>
            </div>

            {/* 4 Feature Badges with Green Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6 mt-4 border-t border-zinc-800/80">
              <div className="flex items-center gap-2.5 text-xs text-zinc-200">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Unlimited Applications</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-zinc-200">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Premium Job Insights</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-zinc-200">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Priority Candidate Badge</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-zinc-200">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Direct Recruiter Messaging</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Upgrade Plan & Manage Plan */}
          <div className="flex items-center gap-3 pt-2">
            <Link
              href="/payment"
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-semibold text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
            >
              Upgrade Plan
            </Link>

            <button
              type="button"
              onClick={() => {
                toast.add({
                  title: "Manage Plan",
                  description: "Subscription settings are loaded. You can change your recurring frequency or cancel anytime.",
                  type: "info",
                });
              }}
              className="px-5 py-2.5 rounded-xl bg-[#141824] hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Manage Plan
            </button>
          </div>
        </div>

        {/* Card 2: Payment Method (takes 5 cols on large screens) */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0e121b] border border-zinc-800/80 p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Payment Method</h3>
            <span className="text-[10px] font-semibold text-zinc-400 tracking-wider uppercase border border-zinc-800 px-2.5 py-0.5 rounded-md bg-zinc-900/60">
              SECURE BY STRIPE
            </span>
          </div>

          {/* Credit Card Graphic with Purple Wave Gradient matching Figma */}
          <div className="relative rounded-2xl p-5 shadow-xl overflow-hidden h-44 flex flex-col justify-between border border-purple-900/30 bg-gradient-to-r from-[#0d1017] via-[#1b1429] to-[#3a0d45]">
            {/* Ambient Wave Graphic background */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-600 via-purple-900 to-transparent pointer-events-none" />

            {/* Top row of card: Chip & Card Brand */}
            <div className="relative z-10 flex items-center justify-between">
              {/* Gold Chip */}
              <div className="w-10 h-7 rounded-md bg-gradient-to-br from-[#f6d365] to-[#fda085] p-1 flex items-center justify-center shadow-inner border border-amber-300/40">
                <div className="w-full h-full border border-amber-800/40 rounded-sm grid grid-cols-2 gap-0.5 opacity-80" />
              </div>
              <span className="text-white font-extrabold italic tracking-wider text-base drop-shadow">
                VISA
              </span>
            </div>

            {/* Card Number Mask */}
            <div className="relative z-10 font-mono text-sm sm:text-base tracking-widest text-white font-semibold drop-shadow">
              •••• •••• •••• 4242
            </div>

            {/* Bottom Row: Cardholder Name & Expiry */}
            <div className="relative z-10 flex items-end justify-between text-white">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-zinc-400">
                  CARD HOLDER
                </p>
                <p className="text-xs font-semibold tracking-wider uppercase drop-shadow mt-0.5">
                  {session?.user?.name || "ALEXANDER SEEKER"}
                </p>
              </div>

              <div className="text-right">
                <p className="text-[9px] uppercase tracking-wider text-zinc-400">
                  EXPIRES
                </p>
                <p className="text-xs font-semibold tracking-wider drop-shadow mt-0.5">
                  12/25
                </p>
              </div>
            </div>
          </div>

          {/* Add New Payment Method Link */}
          <Link
            href="/payment"
            className="flex items-center justify-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer py-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Payment Method</span>
          </Link>
        </div>
      </div>

      {/* Billing History Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Billing History</h2>
          <button
            type="button"
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer font-medium"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-[#0e121b] border border-zinc-800/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-800/80 text-xs font-semibold text-zinc-400 tracking-wider">
                  <th className="py-4 px-6 font-medium">Date</th>
                  <th className="py-4 px-6 font-medium">Plan</th>
                  <th className="py-4 px-6 font-medium">Amount</th>
                  <th className="py-4 px-6 font-medium">Transaction ID</th>
                  <th className="py-4 px-6 font-medium text-right sm:text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-xs sm:text-sm">
                {filteredInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-zinc-800/20 transition-colors cursor-default"
                  >
                    <td className="py-4 px-6 text-zinc-300 font-medium whitespace-nowrap">
                      {inv.date}
                    </td>
                    <td className="py-4 px-6 text-zinc-300 whitespace-nowrap">
                      {inv.plan}
                    </td>
                    <td className="py-4 px-6 font-semibold text-white whitespace-nowrap">
                      {inv.amount}
                    </td>
                    <td className="py-4 px-6 text-zinc-400 font-mono text-xs whitespace-nowrap">
                      {inv.transactionId}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-right sm:text-left">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{inv.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Need Help Card matching Figma */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#0e121b] border border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm">
        <div>
          <h3 className="text-base font-bold text-white">Need help with your invoice?</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl leading-relaxed">
            Our support team is available 24/7 to help you resolve any payment issues or clarify billing details.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={() => {
              toast.add({
                title: "Support Ticket Opened",
                description: "Our 24/7 billing support team will respond within 15 minutes.",
                type: "info",
              });
            }}
            className="px-4 py-2.5 rounded-xl bg-[#141824] hover:bg-zinc-800 border border-zinc-700/80 text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Contact Support
          </button>

          <Link
            href="/terms"
            className="text-xs text-zinc-400 hover:text-white transition-colors"
          >
            Read Refund Policy
          </Link>
        </div>
      </div>

      {/* Footer matching Figma */}
      <div className="pt-4 pb-2 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
        <div>© 2023 HireLoop Inc. All rights reserved.</div>
        <div className="flex items-center gap-5">
          <Link href="/terms" className="hover:text-zinc-400 transition-colors">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-zinc-400 transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
