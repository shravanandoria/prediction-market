"use client";

import { useState, useMemo } from "react";
import { leaderboardData, biggestWinsData } from "@/lib/leaderboardData";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { Search } from "lucide-react";

type TimeFilter = "Today" | "Weekly" | "Monthly" | "All";
type SortBy = "profit" | "volume";

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("Monthly");
  const [sortBy, setSortBy] = useState<SortBy>("profit");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and sort data
  const filteredData = useMemo(() => {
    let data = [...leaderboardData];

    // Filter by search query
    if (searchQuery) {
      data = data.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Sort by selected criteria
    if (sortBy === "volume") {
      data.sort((a, b) => b.volume - a.volume);
    } else {
      data.sort((a, b) => b.profitLoss - a.profitLoss);
    }

    return data;
  }, [searchQuery, sortBy]);

  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(3).replace(/\.?0+$/, "")}M`;
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#1C2230] text-white">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Leaderboard Section */}
          <div className="flex-1">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Leaderboard</h1>

            {/* Time Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(["Today", "Weekly", "Monthly", "All"] as TimeFilter[]).map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setTimeFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      timeFilter === filter
                        ? "bg-[#2C3444] text-white"
                        : "bg-transparent text-gray-400 hover:text-white hover:bg-[#2C3444]/50"
                    }`}
                  >
                    {filter}
                  </button>
                ),
              )}
            </div>

            {/* Search and Category Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border border-[#334155] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#2563EB] transition-colors"
                />
              </div>

              {/* Category Dropdown */}
              <div className="sm:w-auto">
                <select className="w-full sm:w-auto bg-transparent border border-[#334155] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#2563EB] transition-colors cursor-pointer">
                  <option value="all" className="bg-[#2C3444]">
                    All Categories
                  </option>
                  <option value="sports" className="bg-[#2C3444]">
                    Sports
                  </option>
                  <option value="crypto" className="bg-[#2C3444]">
                    Crypto
                  </option>
                  <option value="politics" className="bg-[#2C3444]">
                    Politics
                  </option>
                </select>
              </div>
            </div>

            {/* Sort Tabs */}
            <div className="flex gap-8 mb-6 border-b border-[#334155]">
              <button
                onClick={() => setSortBy("profit")}
                className={`pb-3 text-sm font-medium transition-colors relative ${
                  sortBy === "profit"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Profit/Loss
                {sortBy === "profit" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
                )}
              </button>
              <button
                onClick={() => setSortBy("volume")}
                className={`pb-3 text-sm font-medium transition-colors relative ${
                  sortBy === "volume"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Volume
                {sortBy === "volume" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
                )}
              </button>
            </div>

            {/* Leaderboard Table */}
            <div className="space-y-2 md:space-y-3">
              {filteredData.map((user, index) => (
                <LeaderboardCard
                  key={user.id}
                  user={user}
                  rank={index + 1}
                  showVolume={true}
                />
              ))}
            </div>
          </div>

          {/* Sidebar - Biggest Wins */}
          <div className="lg:w-96 xl:w-[420px]">
            <div className="bg-[#2C3444]/30 rounded-lg p-5 border border-[#334155] sticky top-6">
              <h2 className="text-xl font-bold mb-4">
                Biggest wins this month
              </h2>
              <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
                {biggestWinsData.map((win, index) => (
                  <div
                    key={win.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#2C3444]/50 transition-colors"
                  >
                    {/* Rank */}
                    <div className="w-6 text-center text-gray-400 font-medium text-sm pt-1">
                      {index + 1}
                    </div>

                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full flex-shrink-0"
                      style={{ background: win.avatar }}
                    ></div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm">
                        {win.username}
                      </p>
                      <p className="text-gray-400 text-xs truncate mt-0.5">
                        {win.matchName}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-gray-400 text-xs">
                          {formatNumber(win.betAmount)}
                        </span>
                        <span className="text-gray-500 text-xs">→</span>
                        <span className="text-green-400 text-xs font-semibold">
                          +{formatNumber(win.winAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
}
