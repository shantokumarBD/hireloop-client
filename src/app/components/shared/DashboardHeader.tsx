import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DashboardHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function DashboardHeader({
  breadcrumbs,
  title,
  subtitle,
  action,
}: DashboardHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <React.Fragment key={item.label}>
                {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-zinc-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={
                      isLast
                        ? "text-zinc-700 font-medium"
                        : "hover:text-zinc-600 transition-colors"
                    }
                  >
                    {item.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Main Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {action && <div>{action}</div>}
      </div>
    </div>
  );
}

