"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Search,
  MapPin,
  Briefcase,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";

interface Company {
  id: string;
  name: string;
  logoText: string;
  logoBg: string;
  tagline: string;
  industry: string;
  location: string;
  openRoles: number;
  featured?: boolean;
}

const FEATURED_COMPANIES: Company[] = [
  {
    id: "stripe",
    name: "Stripe",
    logoText: "S",
    logoBg: "from-indigo-600 to-purple-600",
    tagline: "Financial infrastructure for the internet economy.",
    industry: "Fintech",
    location: "San Francisco, CA • Remote",
    openRoles: 18,
    featured: true,
  },
  {
    id: "vercel",
    name: "Vercel",
    logoText: "▲",
    logoBg: "from-zinc-900 to-black border border-white/20",
    tagline: "Frontend cloud platform for developing and deploying modern web applications.",
    industry: "Developer Tools",
    location: "Global Remote",
    openRoles: 12,
    featured: true,
  },
  {
    id: "google",
    name: "Google",
    logoText: "G",
    logoBg: "from-blue-600 via-red-500 to-yellow-500",
    tagline: "Organizing the world's information and making it universally accessible.",
    industry: "Cloud & AI",
    location: "Mountain View, CA • Hybrid",
    openRoles: 25,
    featured: true,
  },
  {
    id: "openai",
    name: "OpenAI",
    logoText: "O",
    logoBg: "from-emerald-600 to-teal-700",
    tagline: "Creating safe and beneficial artificial general intelligence.",
    industry: "Artificial Intelligence",
    location: "San Francisco, CA • On-site",
    openRoles: 14,
    featured: true,
  },
  {
    id: "figma",
    name: "Figma",
    logoText: "F",
    logoBg: "from-fuchsia-600 to-purple-700",
    tagline: "The collaborative interface design tool connecting teams.",
    industry: "Design & Product",
    location: "San Francisco, CA • Remote",
    openRoles: 9,
  },
  {
    id: "airbnb",
    name: "Airbnb",
    logoText: "A",
    logoBg: "from-rose-500 to-pink-600",
    tagline: "Connecting travelers with authentic local stays and experiences worldwide.",
    industry: "Hospitality & Travel",
    location: "Remote",
    openRoles: 7,
  },
  {
    id: "supabase",
    name: "Supabase",
    logoText: "S",
    logoBg: "from-emerald-500 to-green-700",
    tagline: "The open source Firebase alternative built on Postgres.",
    industry: "Database & Cloud",
    location: "Global Remote",
    openRoles: 8,
  },
  {
    id: "linear",
    name: "Linear",
    logoText: "L",
    logoBg: "from-violet-600 to-indigo-800",
    tagline: "The purpose-built product development tool for high-performance teams.",
    industry: "Productivity",
    location: "San Francisco, CA • Remote",
    openRoles: 5,
  },
];

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");

  const industries = [
    "All",
    "Fintech",
    "Developer Tools",
    "Cloud & AI",
    "Artificial Intelligence",
    "Design & Product",
    "Database & Cloud",
  ];

  const filteredCompanies = FEATURED_COMPANIES.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry =
      selectedIndustry === "All" || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <main className="min-h-screen bg-[#07090e] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5C53FE]/10 border border-[#5C53FE]/20 text-[#5C53FE] text-xs font-medium">
            <Building2 className="w-3.5 h-3.5" />
            <span>Top Employers Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Explore Leading Companies Hiring on HireLoop
          </h1>

          <p className="text-sm sm:text-base text-zinc-400">
            Discover world-class engineering, design, and product teams building
            the future. Find the workplace where your career accelerates.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies by name, industry or keyword..."
              className="w-full h-12 pl-12 pr-4 rounded-2xl bg-[#0B0C10] border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#5C53FE] transition-colors shadow-lg"
            />
          </div>

          {/* Industry Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {industries.map((ind) => {
              const active = selectedIndustry === ind;
              return (
                <button
                  key={ind}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer border ${
                    active
                      ? "bg-[#5C53FE] border-[#5C53FE] text-white font-medium shadow-[0_0_15px_rgba(92,83,254,0.4)]"
                      : "bg-[#0E0F14] border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {ind}
                </button>
              );
            })}
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="rounded-2xl bg-[#0B0C10] border border-white/10 p-6 flex flex-col justify-between hover:border-[#5C53FE]/50 transition-all group shadow-xl"
            >
              <div className="space-y-4">
                {/* Top: Avatar & Roles Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${company.logoBg} flex items-center justify-center text-white font-black text-xl shadow-md shrink-0`}
                    >
                      {company.logoText}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-lg font-bold text-white group-hover:text-[#5C53FE] transition-colors">
                          {company.name}
                        </h2>
                        <CheckCircle2 className="w-4 h-4 text-[#5C53FE]" />
                      </div>
                      <span className="text-xs text-zinc-400 font-medium">
                        {company.industry}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 shrink-0">
                    {company.openRoles} Jobs
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                  {company.tagline}
                </p>

                {/* Meta details: Location */}
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="truncate">{company.location}</span>
                </div>
              </div>

              {/* Bottom Action: View Jobs */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <Link
                  href={`${ROUTES.BROWSE_JOBS}?search=${encodeURIComponent(company.name)}`}
                  className="w-full h-10 rounded-xl bg-white/5 hover:bg-[#5C53FE] border border-white/10 hover:border-[#5C53FE] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all group-hover:shadow-[0_0_15px_rgba(92,83,254,0.3)]"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>View Open Positions</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State if search matches nothing */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <Building2 className="w-10 h-10 text-zinc-600 mx-auto" />
            <h3 className="text-base font-semibold text-white">
              No companies found
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              No companies match your query &quot;{searchQuery}&quot;. Try clearing filters or searching for another keyword.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedIndustry("All");
              }}
              className="text-xs text-[#5C53FE] hover:underline cursor-pointer pt-2 inline-block"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
