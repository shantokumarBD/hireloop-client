"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  DollarSign,
  Copy,
  Check,
  Mail,
  User,
  Sparkles,
} from "lucide-react";

export interface AdminPaymentItem {
  id: string;
  customerName: string;
  customerEmail: string;
  plan: string;
  amount: number;
  currency: string;
  status: "Completed" | "Pending" | "Refunded";
  transactionId: string;
  date: string;
}

interface AdminPaymentsTableProps {
  payments: AdminPaymentItem[];
}

export function AdminPaymentsTable({ payments }: AdminPaymentsTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-full min-w-[1000px] text-left">
        <TableHeader className="bg-transparent border-b border-[#1E2333]">
          <TableRow className="border-[#1E2333] hover:bg-transparent">
            <TableHead className="py-4 px-6 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[280px]">
              Customer & Account
            </TableHead>
            <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[180px]">
              Plan & Tier
            </TableHead>
            <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[160px]">
              Amount
            </TableHead>
            <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[240px]">
              Transaction Reference
            </TableHead>
            <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[140px]">
              Status
            </TableHead>
            <TableHead className="py-4 px-6 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 text-right w-[150px]">
              Billing Date
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-[#1A1F2E]">
          {payments.map((payment) => {
            const isCompleted = payment.status === "Completed";
            const isCopied = copiedId === payment.transactionId;

            return (
              <TableRow
                key={payment.id}
                className="border-[#1E2333] hover:bg-[#121626]/80 transition-colors"
              >
                {/* 1. Customer */}
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5C53FE]/20 to-[#4E44FE]/10 border border-[#5C53FE]/30 flex items-center justify-center text-[#7E77FE] font-bold text-sm shrink-0">
                      {payment.customerName.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-zinc-100 truncate">
                        {payment.customerName}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 mt-0.5">
                        <Mail className="w-3.5 h-3.5 text-zinc-500" />
                        <span className="truncate">{payment.customerEmail}</span>
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* 2. Plan */}
                <TableCell className="py-4 px-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#5C53FE]/20 to-[#9089FC]/20 text-[#A5A0FF] border border-[#5C53FE]/40 shadow-xs">
                    <Sparkles className="w-3 h-3 text-[#A5A0FF]" />
                    {payment.plan}
                  </span>
                </TableCell>

                {/* 3. Amount */}
                <TableCell className="py-4 px-4 text-sm font-semibold text-zinc-100">
                  <div className="flex items-center gap-1 font-mono">
                    <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{payment.amount.toFixed(2)}</span>
                    <span className="text-[10px] text-zinc-400 font-sans uppercase">
                      {payment.currency}
                    </span>
                  </div>
                </TableCell>

                {/* 4. Transaction Reference */}
                <TableCell className="py-4 px-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-zinc-400 truncate max-w-[170px] bg-[#161B2B] px-2 py-1 rounded-md border border-[#232A3E]">
                      {payment.transactionId}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(payment.transactionId)}
                      className="text-zinc-500 hover:text-zinc-300 p-1 rounded hover:bg-[#1E2538] transition-colors"
                      title="Copy Transaction ID"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </TableCell>

                {/* 5. Status */}
                <TableCell className="py-4 px-4">
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Paid
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      Pending
                    </span>
                  )}
                </TableCell>

                {/* 6. Date */}
                <TableCell className="py-4 px-6 text-right text-xs text-zinc-400 font-mono">
                  {payment.date}
                </TableCell>
              </TableRow>
            );
          })}

          {payments.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-12 text-center text-zinc-500 text-sm"
              >
                No payment transactions match your search criteria.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
