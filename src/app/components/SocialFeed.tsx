"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Clock,
  DollarSign,
  Crown,
  Gem,
  Filter,
  Sparkles,
  Bookmark,
} from "lucide-react";
import { socialPosts, nepoBabies, type SocialPost } from "@/lib/mockData";

export const SocialFeed = () => {
  const [posts, setPosts] = useState<SocialPost[]>(socialPosts);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filterPosts = (filter: string) => {
    setActiveFilter(filter);

    if (filter === "all") {
      setPosts(socialPosts);
      return;
    }

    const filtered = socialPosts.filter((post) => {
      switch (filter) {
        case "luxury":
          return post.tags.some((tag) =>
            ["luxury", "lamborghini", "vacation", "shopping"].includes(tag)
          );
        case "education":
          return post.tags.some((tag) =>
            ["education", "harvard", "studyabroad", "privilege"].includes(tag)
          );
        case "business":
          return post.tags.some((tag) =>
            ["business", "contracts", "government", "wealth"].includes(tag)
          );
        case "sponsored":
          return post.isSponsored;
        default:
          return true;
      }
    });

    setPosts(filtered);
  };

  const getAuthor = (authorId: string) => {
    return nepoBabies.find((child) => child.id === authorId);
  };

  return (
    <div className="space-y-6">
      {/* Header with gold gradient */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white p-6 rounded-xl shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMS4zNiAwLTIuNS0xLjEyNS0yLjUtMi41IDAtMS4zODUgMS4xNC0yLjUgMi41LTIuNSAxLjM2IDAgMi41IDEuMTE1IDIuNSAyLjUgMCAxLjM3NS0xLjE0IDIuNS0yLjUgMi41bTE4LTJoLTJ2LTJoMnYyem0tNTIgMmgtMnYtMmgydjJ6bTIwLTJoLTJ2LTJoMnYyem0tOC0yaC0ydjJoMnYtMnptMjAgMGgtMnYyaDJ2LTJ6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-500 p-2 rounded-full">
              <Sparkles className="h-6 w-6 text-zinc-900" />
            </div>
            <h2 className="text-2xl font-bold">Nepo Social Feed</h2>
          </div>

          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <Crown className="h-4 w-4" />
            <span className="text-sm uppercase tracking-wider">
              Exclusive Elite Content
            </span>
          </div>

          <p className="text-zinc-300 mb-4">
            See how Nepal's elite nepo babies flaunt their parents' corruption
            money
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="bg-white rounded-xl border border-zinc-200 shadow-md overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-amber-500" />
            <span className="font-medium text-zinc-700 text-sm sm:text-base">Filter by category</span>
          </div>
          <div className="text-xs text-zinc-500 bg-zinc-50 px-2 py-1 rounded-full border border-zinc-100">
            {posts.length} posts
          </div>
        </div>

        <div className="flex overflow-x-auto p-3 sm:p-4 gap-2 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent pb-4">
          <button
            onClick={() => filterPosts("all")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-all text-sm ${
              activeFilter === "all"
                ? "bg-amber-500 text-white shadow-md"
                : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
            }`}
          >
            All Posts
          </button>
          <button
            onClick={() => filterPosts("luxury")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-all text-sm ${
              activeFilter === "luxury"
                ? "bg-amber-500 text-white shadow-md"
                : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
            }`}
          >
            Luxury Lifestyle
          </button>
          <button
            onClick={() => filterPosts("education")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-all text-sm ${
              activeFilter === "education"
                ? "bg-amber-500 text-white shadow-md"
                : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
            }`}
          >
            Foreign Education
          </button>
          <button
            onClick={() => filterPosts("business")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-all text-sm ${
              activeFilter === "business"
                ? "bg-amber-500 text-white shadow-md"
                : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
            }`}
          >
            "Business" Ventures
          </button>
          <button
            onClick={() => filterPosts("sponsored")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-all text-sm ${
              activeFilter === "sponsored"
                ? "bg-amber-500 text-white shadow-md"
                : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
            }`}
          >
            Sponsored
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6 max-w-2xl mx-auto">
        {posts.length > 0 ? (
          posts.map((post) => {
            const author = getAuthor(post.authorId);

            return (
              <div
                key={post.id}
                className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:border-amber-200"
              >
                {/* Post header */}
                <div className="p-3 sm:p-4 border-b border-zinc-100 flex flex-wrap sm:flex-nowrap items-center justify-between gap-y-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-zinc-100 relative border-2 border-white shadow-sm flex-shrink-0">
                      {author?.profileImage ? (
                        <Image
                          src={author.profileImage}
                          alt={author.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">
                          <span>NB</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="font-medium leading-tight text-sm sm:text-base">
                        {author?.name}
                      </div>
                      <div className="text-xs text-zinc-500 flex items-center gap-1">
                        {author?.socialMediaHandle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    {post.isSponsored && (
                      <div className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs flex items-center gap-1 border border-blue-100">
                        <DollarSign className="h-3 w-3" />
                        <span>Sponsored</span>
                      </div>
                    )}
                    <div className="text-xs text-zinc-400">
                      {post.timestamp}
                    </div>
                  </div>
                </div>

                {/* Post content */}
                <div className="px-3 sm:px-4 pt-3 pb-2">
                  <p className="text-zinc-800 mb-3 text-sm leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Post images - optimized layout */}
                {post.images && post.images.length > 0 && (
                  <div className="px-0 sm:px-4 pb-3">
                    <div
                      className={`${
                        post.images.length > 1 ? "grid grid-cols-2 gap-0.5 sm:gap-2" : ""
                      }`}
                    >
                      {post.images.map((img, i) => (
                        <div
                          key={i}
                          className={`overflow-hidden bg-zinc-50 relative ${
                            post.images && post.images.length === 1
                              ? "h-[180px] sm:h-[240px] w-full"
                              : "aspect-square"
                          }`}
                        >
                          <Image
                            src={img}
                            alt="Post image"
                            width={
                              post.images && post.images.length === 1
                                ? 600
                                : 250
                            }
                            height={
                              post.images && post.images.length === 1
                                ? 240
                                : 250
                            }
                            className="object-contain w-full h-full"
                            style={{ objectPosition: "center" }}
                            priority
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location and timestamp info */}
                <div className="px-3 sm:px-4 pb-2 flex flex-wrap items-center justify-between gap-2">
                  {post.location && (
                    <div className="flex items-center gap-1 text-xs text-zinc-500">
                      <MapPin className="h-3 w-3 text-zinc-400" />
                      <span>{post.location}</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="px-3 sm:px-4 pb-3 flex flex-wrap gap-1.5">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-amber-600 text-xs bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100 hover:bg-amber-100 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Post actions */}
                <div className="px-2 sm:px-4 py-2 border-t border-zinc-100 flex items-center justify-between bg-white">
                  <button className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-md hover:bg-zinc-50 text-sm text-zinc-700 hover:text-red-500 transition-colors group">
                    <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium">{post.likes}</span>
                  </button>

                  <button className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-md hover:bg-zinc-50 text-sm text-zinc-700 hover:text-blue-500 transition-colors group">
                    <MessageCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium">{post.comments}</span>
                  </button>

                  <button className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-md hover:bg-zinc-50 text-sm text-zinc-700 hover:text-green-500 transition-colors group">
                    <Share2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline text-xs font-medium">Share</span>
                  </button>

                  <button className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-md hover:bg-zinc-50 text-sm text-zinc-700 hover:text-amber-500 transition-colors group">
                    <Bookmark className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline text-xs font-medium">Save</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white border border-zinc-200 rounded-xl p-12 text-center shadow-md">
            <div className="inline-flex items-center justify-center p-4 bg-zinc-100 rounded-full mb-4">
              <Filter className="h-6 w-6 text-zinc-400" />
            </div>
            <h3 className="text-lg font-medium text-zinc-700 mb-1">
              No posts found
            </h3>
            <p className="text-zinc-500">
              Try selecting a different filter category
            </p>
          </div>
        )}
      </div>

      {/* Footer with disclaimer */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-center text-sm text-zinc-500">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Gem className="h-4 w-4 text-amber-500" />
          <span className="font-medium text-zinc-700">Nepo Social Network</span>
        </div>
        <p>
          All posts are satirical and meant to highlight corruption in Nepalese
          politics.
        </p>
      </div>
    </div>
  );
};

export default SocialFeed;
