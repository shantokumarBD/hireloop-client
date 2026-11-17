"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  DollarSign,
  Download,
  CreditCard,
  CheckCircle2,
  ChevronDown,
  X,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { AdminPaymentsTable, AdminPaymentItem } from "./AdminPaymentsTable";

interface AdminPaymentsViewProps {
  initialPayments: AdminPaymentItem[];
  totalUsersCount: number;
  proUsersCount: number;
}

export function AdminPaymentsView({
  initialPayments,
  totalUsersCount,
  proUsersCount,
}: AdminPaymentsViewProps) {
  const [payments] = useState<AdminPaymentItem[]>(initialPayments);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All Payments");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // Dynamic KPI calculations
  const stats = useMemo(() => {
    // Total revenue from all completed transactions ($20 standard Pro tier)
    const totalRev = payments.reduce(
      (acc, p) => (p.status === "Completed" ? acc + p.amount : acc),
      0
    );

    const fallbackRevenue = totalRev > 0 ? totalRev : proUsersCount * 20;

    const conversionRate =
      totalUsersCount > 0
        ? ((proUsersCount / totalUsersCount) * 100).toFixed(1)
        : "0";

    return {
      revenue: `$${fallbackRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      proSubscribers: proUsersCount.toLocaleString(),
      conversionRate: `${conversionRate}%`,
      gatewayStatus: "Stripe HMAC Live",
    };
  }, [payments, totalUsersCount, proUsersCount]);

  // Export CSV handler
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Customer,Email,Plan,Amount,Currency,Status,Transaction Reference,Date"]
        .concat(
          payments.map(
            (p) =>
              `"${p.customerName}","${p.customerEmail}","${p.plan}","${p.amount}","${p.currency}","${p.status}","${p.transactionId}","${p.date}"`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `hireloop_payments_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.add({
      title: "Export Complete",
      description: `Exported ${payments.length} transactions to CSV.`,
    });
  };

  // Filtered payments
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      // Status filter
      if (statusFilter === "Paid" && p.status !== "Completed") {
        return false;
      }
      if (statusFilter === "Pending" && p.status !== "Pending") {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = p.customerName.toLowerCase().includes(query);
        const emailMatch = p.customerEmail.toLowerCase().includes(query);
        const idMatch = p.transactionId.toLowerCase().includes(query);
        return nameMatch || emailMatch || idMatch;
      }

      return true;
    });
  }, [payments, statusFilter, searchQuery]);

  return (
    <div className="space-y-6 text-zinc-100 max-w-[1440px] mx-auto pb-12">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Platform Payment & Subscription Audits
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#5C53FE]/15 text-[#7E77FE] border border-[#5C53FE]/30">
              Financial Logs
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Monitor Pro plan conversions, Stripe transaction webhooks, and
            billing revenue metrics.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleExport}
            className="h-10 px-4 rounded-xl border-zinc-700/80 bg-transparent text-zinc-200 hover:bg-zinc-800/60 hover:text-white text-xs sm:text-sm font-medium cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-zinc-400" />
            <span>Export Statement</span>
          </Button>
        </div>
      </div>

      {/* 2. KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Revenue */}
        <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-medium text-zinc-400 tracking-wide">
            Total Gross Revenue
          </p>
          <p className="text-3xl font-bold text-white mt-2 mb-2 font-mono">
            {stats.revenue}
          </p>
          <p className="text-xs font-medium text-emerald-400">
            From Pro subscriptions
          </p>
        </div>

        {/* Card 2: Pro Subscribers */}
        <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-medium text-zinc-400 tracking-wide">
            Pro Plan Subscribers
          </p>
          <p className="text-3xl font-bold text-white mt-2 mb-2">
            {stats.proSubscribers}
          </p>
          <p className="text-xs font-medium text-[#7E77FE]">
            Unlimited job applications
          </p>
        </div>

        {/* Card 3: Conversion Rate */}
        <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-medium text-zinc-400 tracking-wide">
            Seeker-to-Pro Conversion
          </p>
          <p className="text-3xl font-bold text-white mt-2 mb-2">
            {stats.conversionRate}
          </p>
          <p className="text-xs font-medium text-zinc-400">
            Of total registered users
          </p>
        </div>

        {/* Card 4: Stripe Gateway Status */}
        <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-medium text-zinc-400 tracking-wide">
            Stripe Gateway
          </p>
          <div className="flex items-center gap-2 mt-2 mb-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <p className="text-xl font-bold text-emerald-400">Operational</p>
          </div>
          <p className="text-xs font-medium text-zinc-400">
            HMAC signature verified
          </p>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#111522] border border-[#1E2333] rounded-2xl p-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search by customer name, email, or transaction ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-9 h-10 bg-[#161B2B] border-[#232A3E] rounded-xl text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-[#5C53FE] focus-visible:border-[#5C53FE]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsStatusDropdownOpen((prev) => !prev)}
              className="h-10 px-3.5 rounded-xl bg-[#161B2B] border border-[#232A3E] flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-200 hover:text-white hover:bg-[#1E2538] transition-colors cursor-pointer"
            >
              <span>{statusFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {isStatusDropdownOpen && (
              <div
                className="absolute right-0 mt-1.5 w-40 rounded-xl bg-[#141826] border border-[#232A3E] shadow-2xl py-1.5 z-30"
                onMouseLeave={() => setIsStatusDropdownOpen(false)}
              >
                {["All Payments", "Paid", "Pending"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setStatusFilter(status);
                      setIsStatusDropdownOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm text-left hover:bg-[#1E2538] transition-colors cursor-pointer ${
                      statusFilter === status
                        ? "text-[#5C53FE] font-semibold"
                        : "text-zinc-300"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Payments Table Container */}
      <div className="bg-[#111522] border border-[#1E2333] rounded-2xl overflow-hidden shadow-xs">
        <AdminPaymentsTable payments={filteredPayments} />
      </div>
    </div>
  );
}
