"use client";

import { useState } from "react";
import ExclusiveAccess from "./components/ExclusiveAccess";
import SocialFeed from "./components/SocialFeed";
import ProfilePage from "./components/ProfilePage";
import {
  Sparkles,
  Trophy,
  Users,
  User,
  Menu,
  X,
  DollarSign,
  Crown,
  Gem,
  BarChart4,
  LogOut,
} from "lucide-react";
import CorruptionLeaderboard from "./components/CorruptionLeaderboard";

type Tab = "leaderboard" | "feed" | "profile";

export default function HomePage() {
  const [accessVerified, setAccessVerified] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("leaderboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-white">NEPO</h1>
            <div className="flex items-center justify-center gap-1 text-amber-400 mb-4">
              <Crown className="h-5 w-5" />
              <span className="text-sm uppercase tracking-widest">
                Exclusive Access
              </span>
              <Crown className="h-5 w-5" />
            </div>
            <p className="text-zinc-300">
              The exclusive social platform for children of corrupt politicians
              & government officials in Nepal
            </p>
          </div>

          <ExclusiveAccess onVerifiedAction={() => setAccessVerified(true)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col lg:flex-row">
      {/* Mobile overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:h-screen lg:min-h-screen overflow-y-auto w-[280px] sm:w-[320px] lg:w-64 flex-shrink-0`}
      >
        <div className="h-full bg-gradient-to-b from-zinc-900 to-zinc-800 text-white shadow-xl flex flex-col">
          {/* Sidebar header */}
          <div className="p-4 border-b border-zinc-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-amber-500 p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-zinc-900" />
                </div>
                <h1 className="text-xl font-bold">NEPO</h1>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded-full hover:bg-zinc-700"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          {/* Sidebar navigation */}
          <nav className="flex-1 p-4 space-y-1">
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeTab === "leaderboard"
                  ? "bg-amber-500/10 text-amber-400"
                  : "text-zinc-300 hover:bg-zinc-700/50"
              }`}
            >
              <Trophy className="h-5 w-5" />
              <span>Nepo Leaderboard</span>
            </button>

            <button
              onClick={() => setActiveTab("feed")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeTab === "feed"
                  ? "bg-amber-500/10 text-amber-400"
                  : "text-zinc-300 hover:bg-zinc-700/50"
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Social Feed</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeTab === "profile"
                  ? "bg-amber-500/10 text-amber-400"
                  : "text-zinc-300 hover:bg-zinc-700/50"
              }`}
            >
              <User className="h-5 w-5" />
              <span>Profiles</span>
            </button>
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-zinc-700 space-y-4">
            <div className="bg-zinc-800 rounded-lg p-3">
              <div className="flex items-center justify-between text-sm text-zinc-400 mb-2">
                <span>NepoIndex</span>
                <span className="text-amber-400">Elite</span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-700/50 rounded-lg cursor-pointer">
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto w-full">
        {/* Mobile header */}
        <header className="lg:hidden bg-zinc-900 text-white p-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
          <div className="flex items-center gap-2">
            <div className="bg-amber-500 p-1.5 rounded-full">
              <Sparkles className="h-4 w-4 text-zinc-900" />
            </div>
            <h1 className="font-bold">NEPO</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full border border-amber-500/30">
              Elite
            </div>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-full hover:bg-zinc-700"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Mobile tab header - shows current section */}
        <div className="lg:hidden bg-white border-b border-zinc-200 px-4 py-3 sticky top-[60px] z-30 shadow-sm">
          <h1 className="font-bold text-lg">
            {activeTab === "leaderboard" && "Nepo Leaderboard"}
            {activeTab === "feed" && "Nepo Social Feed"}
            {activeTab === "profile" && "Nepo Baby Profiles"}
          </h1>
          <p className="text-zinc-500 text-sm">
            {activeTab === "leaderboard" && "Ranking Nepal's Nepo children"}
            {activeTab === "feed" && "See what the Nepo are flaunting today"}
            {activeTab === "profile" &&
              "Detailed profiles of Nepal's Nepo dynasties"}
          </p>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Desktop page header */}
          <div className="hidden lg:block mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  {activeTab === "leaderboard" && "Nepo Leaderboard"}
                  {activeTab === "feed" && "Nepo Social Feed"}
                  {activeTab === "profile" && "Nepo Baby Profiles"}
                </h1>
                <p className="text-zinc-500">
                  {activeTab === "leaderboard" &&
                    "Ranking Nepal's Nepo children"}
                  {activeTab === "feed" &&
                    "See what the Nepo are flaunting today"}
                  {activeTab === "profile" &&
                    "Detailed profiles of Nepal's Nepo dynasties"}
                </p>
              </div>

              <div className="flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-2 rounded-lg">
                <Gem className="h-5 w-5" />
                <span className="font-medium">Elite Member</span>
              </div>
            </div>
          </div>

          {/* Tab content */}
          <div className="pb-4">
            {activeTab === "leaderboard" && <CorruptionLeaderboard />}
            {activeTab === "feed" && <SocialFeed />}
            {activeTab === "profile" && <ProfilePage />}
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 lg:p-8 border-t border-zinc-200 bg-white mt-auto">
          <div className="max-w-4xl mx-auto text-center text-sm text-zinc-500">
            <p className="text-xs sm:text-sm">
              This is a satirical website created to highlight corruption in
              Nepalese politics. All content is fictional and for
              educational/satirical purposes only.
            </p>
            <p className="mt-2 text-xs sm:text-sm">
              © {new Date().getFullYear()} Nepo - Exposing Nepotism and
              Corruption
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
