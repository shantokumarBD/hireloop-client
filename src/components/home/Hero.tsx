import Link from "next/link";
import Image from "next/image";
import { Search, Briefcase, Building2, Users, Star } from "lucide-react";

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
];

const liveStats = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#010103] -mt-20 pt-28 sm:pt-32 lg:pt-36 pb-20 text-white">
      {/* 1. Hero Main Content */}
      <div className="relative z-10 max-w-[784px] mx-auto px-4 flex flex-col items-center text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E0F14] border border-white/10 shadow-lg mb-5 sm:mb-6">
          <span className="text-sm">💼</span>
          <span className="text-xs font-semibold text-zinc-300 tracking-wider">
            <strong className="text-white">50,000+</strong> NEW JOBS THIS MONTH
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-[50px] font-extrabold text-white tracking-tight leading-[1.1] max-w-2xl">
          Find Your Dream Job Today
        </h1>

        {/* Subheadline */}
        <p className="mt-4 text-xs sm:text-sm md:text-[15px] text-zinc-400 max-w-xl leading-relaxed">
          HireLoop connects top talent with world-class companies. Browse thousands of
          curated opportunities and land your next role — faster.
        </p>

        {/* Search Form */}
        <form
          action="/jobs"
          method="GET"
          className="mt-8 sm:mt-10 w-full h-[62px] sm:h-[64px] rounded-full bg-[#0B0C10] border border-white/10 shadow-2xl flex items-center px-2"
        >
          {/* Input 1: Search */}
          <div className="flex-1 flex items-center gap-3 pl-4 sm:pl-5 pr-2 min-w-0">
            <Search className="w-5 h-5 text-zinc-400 shrink-0 stroke-[1.5]" />
            <input
              type="text"
              name="search"
              placeholder="Job title, skill or company"
              className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none truncate"
            />
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-white/10 shrink-0 mx-1" />

          {/* Input 2: Location */}
          <div className="flex-1 flex items-center gap-3 px-3 sm:px-4 min-w-0">
            <svg
              className="w-5 h-5 text-zinc-400 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="3" />
              <line x1="12" y1="2" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="22" />
              <line x1="2" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="22" y2="12" />
            </svg>
            <input
              type="text"
              name="location"
              placeholder="Location or Remote"
              className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none truncate"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-12 h-12 rounded-[14px] bg-[#5C53FE] hover:bg-[#4E44FE] text-white flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(92,83,254,0.5)] cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[2]" />
          </button>
        </form>

        {/* Trending Positions */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="text-xs text-zinc-500 font-medium">Trending Position</span>
          {trendingPositions.map((tag) => (
            <Link
              key={tag}
              href={`/jobs?search=${encodeURIComponent(tag)}`}
              className="text-xs px-3.5 py-1.5 rounded-full bg-[#0E0F14] border border-white/10 text-zinc-300 hover:text-white hover:border-[#5C53FE] transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* 2. Globe & Live Stats Section */}
      <div className="relative w-full max-w-[1200px] mx-auto px-4 mt-6 sm:mt-10">
        {/* Globe Background */}
        <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none select-none z-0 overflow-hidden h-[620px] sm:h-[700px]">
          <div className="w-[1050px] sm:w-[1180px] shrink-0">
            <Image
              src="/images/globe.png"
              alt="Globe Network"
              width={1180}
              height={1542}
              priority
              className="w-full h-auto object-contain -mt-[440px] sm:-mt-[500px] md:-mt-[540px]"
            />
          </div>
        </div>

        {/* Globe Overlay Text */}
        <div className="relative z-10 pt-36 sm:pt-48 md:pt-56 pb-8 sm:pb-10 text-center">
          <p className="max-w-[620px] mx-auto text-2xl sm:text-3xl md:text-[36px] font-medium leading-[130%] tracking-[-0.5px] text-white/90">
            Assisting over 15,000 job seekers find their dream positions.
          </p>
        </div>

        {/* 4 Live Stats Cards */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {liveStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="rounded-[18px] p-6 flex flex-col justify-between text-left transition-all duration-300 hover:scale-[1.02] hover:border-white/20 bg-[#0B0C10]/90 backdrop-blur-md border border-white/10"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(14,15,20,0.95) 0%, rgba(5,6,8,0.95) 100%)",
                  minHeight: "220px",
                }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-3xl sm:text-[48px] font-semibold text-white tracking-[-0.02em] leading-[115%]">
                    {stat.value}
                  </h2>
                  <p className="text-sm sm:text-[15px] text-zinc-400 font-normal leading-[150%]">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
