"use client";

import { useState } from "react";
import { nepoBabies, sarcasmQuotes } from "@/lib/mockData";
import LeaderboardCard from "./LeaderboardCard";
import {
  TrendingUp,
  Search,
  ArrowUpDown,
  Trophy,
  Crown,
  DollarSign,
  Calendar,
  Gem,
  Filter,
} from "lucide-react";

type SortOption = "corruption" | "age" | "assets";

export const CorruptionLeaderboard = () => {
  const [sortBy, setSortBy] = useState<SortOption>("corruption");
  const [searchTerm, setSearchTerm] = useState("");

  // Get a random sarcasm quote
  const randomQuote =
    sarcasmQuotes[Math.floor(Math.random() * sarcasmQuotes.length)];

  // Sort and filter the data
  const sortedData = [...nepoBabies]
    .filter((child) => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        child.name.toLowerCase().includes(searchLower) ||
        child.parentName.toLowerCase().includes(searchLower) ||
        child.parentParty.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "corruption":
          return b.corruptionAmount - a.corruptionAmount;
        case "age":
          return a.age - b.age;
        case "assets":
          return b.luxuryAssets.length - a.luxuryAssets.length;
        default:
          return 0;
      }
    });

  const totalNepo = nepoBabies.reduce(
    (sum, child) => sum + child.corruptionAmount,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header with gold gradient */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white p-6 rounded-xl shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMS4zNiAwLTIuNS0xLjEyNS0yLjUtMi41IDAtMS4zODUgMS4xNC0yLjUgMi41LTIuNSAxLjM2IDAgMi41IDEuMTE1IDIuNSAyLjUgMCAxLjM3NS0xLjE0IDIuNS0yLjUgMi41bTE4LTJoLTJ2LTJoMnYyem0tNTIgMmgtMnYtMmgydjJ6bTIwLTJoLTJ2LTJoMnYyem0tOC0yaC0ydjJoMnYtMnptMjAgMGgtMnYyaDJ2LTJ6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-500 p-2 rounded-full">
              <Trophy className="h-6 w-6 text-zinc-900" />
            </div>
            <h2 className="text-2xl font-bold">NepoLeaderboard</h2>
          </div>

          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <Crown className="h-4 w-4" />
            <span className="text-sm uppercase tracking-wider">
              Elite Nepo Babies Ranking
            </span>
          </div>

          <p className="text-zinc-300 italic border-l-2 border-amber-500 pl-3 py-1 mb-4">
            "{randomQuote}"
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-5 sm:mt-6">
            <div className="bg-zinc-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-zinc-700 flex items-center gap-2 sm:gap-3">
              <div className="bg-red-500/20 p-1.5 sm:p-2 rounded-full flex-shrink-0">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
              </div>
              <div>
                <div className="text-xs text-zinc-400">Total Nepo</div>
                <div className="text-base sm:text-xl font-bold text-red-400">
                  {totalNepo} Million NPR
                </div>
              </div>
            </div>

            <div className="bg-zinc-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-zinc-700 flex items-center gap-2 sm:gap-3">
              <div className="bg-amber-500/20 p-1.5 sm:p-2 rounded-full flex-shrink-0">
                <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
              </div>
              <div>
                <div className="text-xs text-zinc-400">Top Earner</div>
                <div className="text-base sm:text-xl font-bold text-amber-400">
                  {Math.max(
                    ...nepoBabies.map((child) => child.corruptionAmount)
                  )}{" "}
                  Million NPR
                </div>
              </div>
            </div>

            <div className="bg-zinc-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-zinc-700 flex items-center gap-2 sm:gap-3 col-span-1 sm:col-span-2 md:col-span-1">
              <div className="bg-blue-500/20 p-1.5 sm:p-2 rounded-full flex-shrink-0">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-zinc-400">Last Updated</div>
                <div className="text-base sm:text-xl font-bold text-blue-400">
                  September 7, 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and filter section */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-zinc-200 shadow-md">
        <div className="flex flex-col gap-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or party..."
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-zinc-500" />
              <span className="text-sm font-medium text-zinc-700">
                Sort by:
              </span>
            </div>
            <div className="grid grid-cols-3 sm:flex border border-zinc-200 rounded-lg overflow-hidden shadow-sm w-full sm:w-auto">
              <button
                className={`px-2 sm:px-4 py-2 text-xs sm:text-sm flex items-center justify-center sm:justify-start gap-1 transition-colors ${
                  sortBy === "corruption"
                    ? "bg-amber-500 text-white"
                    : "bg-white text-zinc-700 hover:bg-zinc-50"
                }`}
                onClick={() => setSortBy("corruption")}
              >
                <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Corruption</span>
                <span className="xs:hidden">$</span>
              </button>
              <button
                className={`px-2 sm:px-4 py-2 text-xs sm:text-sm flex items-center justify-center border-l border-zinc-200 transition-colors ${
                  sortBy === "age"
                    ? "bg-amber-500 text-white"
                    : "bg-white text-zinc-700 hover:bg-zinc-50"
                }`}
                onClick={() => setSortBy("age")}
              >
                <span>Age</span>
              </button>
              <button
                className={`px-2 sm:px-4 py-2 text-xs sm:text-sm flex items-center justify-center border-l border-zinc-200 transition-colors ${
                  sortBy === "assets"
                    ? "bg-amber-500 text-white"
                    : "bg-white text-zinc-700 hover:bg-zinc-50"
                }`}
                onClick={() => setSortBy("assets")}
              >
                <span>Assets</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard cards */}
      <div className="space-y-3 sm:space-y-4">
        {sortedData.length > 0 ? (
          sortedData.map((child, index) => (
            <LeaderboardCard key={child.id} child={child} rank={index + 1} />
          ))
        ) : (
          <div className="bg-white border border-zinc-200 rounded-xl p-8 sm:p-12 text-center shadow-md">
            <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-zinc-100 rounded-full mb-3 sm:mb-4">
              <Search className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-400" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-zinc-700 mb-1">
              No results found
            </h3>
            <p className="text-sm text-zinc-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Footer with disclaimer */}
      {/* <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-center text-sm text-zinc-500">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Gem className="h-4 w-4 text-amber-500" />
          <span className="font-medium text-zinc-700">Nepo NepoIndex</span>
        </div>
        <p>
          All corruption amounts are estimated based on publicly available
          information and satirical calculations.
        </p>
      </div> */}
    </div>
  );
};

export default CorruptionLeaderboard;
