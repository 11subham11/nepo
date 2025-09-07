"use client";

import { useState } from "react";
import Image from "next/image";
import { nepoBabies, socialPosts, PoliticianChild } from "@/lib/mockData";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Car,
  Home,
  Globe,
  DollarSign,
  Crown,
  ChevronDown,
  Search,
  User,
  Clock,
  Heart,
  MessageCircle,
  Check,
} from "lucide-react";

type ProfilePageProps = {
  initialProfileId?: string;
};

export const ProfilePage = ({ initialProfileId }: ProfilePageProps) => {
  const [selectedProfileId, setSelectedProfileId] = useState<string>(
    initialProfileId || nepoBabies[0].id
  );
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const selectedProfile = nepoBabies.find(
    (profile) => profile.id === selectedProfileId
  ) as PoliticianChild;
  const profilePosts = socialPosts.filter(
    (post) => post.authorId === selectedProfileId
  );
  
  // Filter profiles based on search term
  const filteredProfiles = nepoBabies.filter((profile) => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      profile.name.toLowerCase().includes(searchLower) ||
      profile.parentName.toLowerCase().includes(searchLower) ||
      profile.parentPosition.toLowerCase().includes(searchLower) ||
      profile.parentParty.toLowerCase().includes(searchLower)
    );
  });

  // Calculate corruption metrics
  const corruptionPerDay =
    Math.round((selectedProfile.corruptionAmount / 365) * 100) / 100;
  const corruptionPerHour =
    Math.round((selectedProfile.corruptionAmount / 365 / 24) * 100) / 100;

  return (
    <div className="space-y-6">
      {/* Header with gold gradient */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white p-6 rounded-xl shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMS4zNiAwLTIuNS0xLjEyNS0yLjUtMi41IDAtMS4zODUgMS4xNC0yLjUgMi41LTIuNSAxLjM2IDAgMi41IDEuMTE1IDIuNSAyLjUgMCAxLjM3NS0xLjE0IDIuNS0yLjUgMi41bTE4LTJoLTJ2LTJoMnYyem0tNTIgMmgtMnYtMmgydjJ6bTIwLTJoLTJ2LTJoMnYyem0tOC0yaC0ydjJoMnYtMnptMjAgMGgtMnYyaDJ2LTJ6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-500 p-2 rounded-full">
              <User className="h-6 w-6 text-zinc-900" />
            </div>
            <h2 className="text-2xl font-bold">Nepo Baby Profiles</h2>
          </div>

          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <Crown className="h-4 w-4" />
            <span className="text-sm uppercase tracking-wider">
              Elite Nepo Dynasties
            </span>
          </div>

          <p className="text-zinc-300 mb-4">
            Explore the lavish lifestyles of Nepal's most privileged nepo babies
          </p>
        </div>
      </div>

      {/* Profile selector - redesigned as dropdown */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between relative">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 p-2 rounded-full">
              <User className="h-5 w-5 text-zinc-900" />
            </div>
            <div>
              <h3 className="font-bold text-white">Select Nepo Baby</h3>
              <p className="text-xs text-zinc-300">View detailed profiles of elite nepo babies</p>
            </div>
          </div>

          {/* Current selection preview */}
          <div className="flex-shrink-0 relative z-20 w-full sm:w-auto">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-between w-full sm:w-auto gap-3 px-4 py-2.5 bg-white/10 hover:bg-white/15 backdrop-blur-sm transition-colors rounded-lg border border-white/20 text-white group"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden relative flex-shrink-0 border border-amber-500/30">
                  {selectedProfile.profileImage ? (
                    <Image
                      src={selectedProfile.profileImage}
                      alt={selectedProfile.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-amber-500 text-xs">
                      <span>NB</span>
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm text-white truncate max-w-[120px]">{selectedProfile.name}</div>
                  <div className="text-xs text-amber-400/80">{selectedProfile.corruptionAmount}M NPR</div>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-amber-400 group-hover:text-amber-300 transition-transform duration-300 transform group-hover:-rotate-180" />
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <>
                {/* Backdrop for mobile */}
                <div 
                  className="fixed inset-0 bg-black/20 z-10 sm:hidden" 
                  onClick={() => setDropdownOpen(false)}
                  aria-hidden="true"
                />
                
                <div className="absolute right-0 sm:right-0 left-0 sm:left-auto top-full mt-2 w-full sm:w-80 bg-white rounded-lg shadow-xl border border-zinc-200 z-20 max-h-[60vh] overflow-y-auto">
                  <div className="sticky top-0 bg-white p-3 border-b border-zinc-100">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-zinc-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search profiles..."
                        className="w-full pl-10 pr-4 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="p-1">
                    {filteredProfiles.length > 0 ? (
                      filteredProfiles.map((profile) => (
                        <button
                          key={profile.id}
                          className={`w-full text-left px-3 py-2.5 flex items-center gap-3 rounded-lg transition-colors ${selectedProfileId === profile.id
                            ? "bg-amber-50 border-l-4 border-amber-500"
                            : "hover:bg-zinc-50 border-l-4 border-transparent"
                          }`}
                          onClick={() => {
                            setSelectedProfileId(profile.id);
                            setDropdownOpen(false);
                            setSearchTerm("");
                          }}
                        >
                          <div className="w-10 h-10 rounded-full bg-zinc-100 overflow-hidden relative flex-shrink-0 border-2 border-white shadow-sm">
                            {profile.profileImage ? (
                              <Image
                                src={profile.profileImage}
                                alt={profile.name}
                                width={40}
                                height={40}
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">
                                <span>NB</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-zinc-900 truncate">{profile.name}</div>
                            <div className="flex items-center gap-2">
                              <div className="text-xs text-zinc-500 truncate">
                                {profile.parentName}'s child
                              </div>
                              <div className="text-xs font-medium text-amber-600 flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                {profile.corruptionAmount}M
                              </div>
                            </div>
                          </div>
                          {selectedProfileId === profile.id && (
                            <div className="flex-shrink-0 text-amber-500">
                              <div className="bg-amber-100 p-1 rounded-full">
                                <Check className="h-4 w-4" />
                              </div>
                            </div>
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="py-8 text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-zinc-100 rounded-full mb-2">
                          <Search className="h-5 w-5 text-zinc-400" />
                        </div>
                        <p className="text-sm font-medium text-zinc-700">No profiles found</p>
                        <p className="text-xs text-zinc-500 mt-1">Try a different search term</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Profile header - redesigned with luxury elements */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-md">
        {/* Cover image with gradient overlay */}
        <div className="h-36 sm:h-48 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMS4zNiAwLTIuNS0xLjEyNS0yLjUtMi41IDAtMS4zODUgMS4xNC0yLjUgMi41LTIuNSAxLjM2IDAgMi41IDEuMTE1IDIuNSAyLjUgMCAxLjM3NS0xLjE0IDIuNS0yLjUgMi41bTE4LTJoLTJ2LTJoMnYyem0tNTIgMmgtMnYtMmgydjJ6bTIwLTJoLTJ2LTJoMnYyem0tOC0yaC0ydjJoMnYtMnptMjAgMGgtMnYyaDJ2LTJ6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4xNSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium text-white border border-white/30 shadow-sm">
            Elite Member
          </div>
        </div>

        {/* Profile info */}
        <div className="px-4 sm:px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 -mt-16 sm:-mt-20 mb-6 sm:mb-8">
            {/* Profile image */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto md:mx-0 rounded-xl overflow-hidden border-4 border-white bg-zinc-100 relative shadow-xl">
              {selectedProfile.profileImage ? (
                <Image
                  src={selectedProfile.profileImage}
                  alt={selectedProfile.name}
                  width={144}
                  height={144}
                  className="object-cover w-full h-full"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400 bg-gradient-to-br from-zinc-100 to-zinc-200">
                  <User className="h-10 w-10 sm:h-12 sm:w-12 text-zinc-300" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-1/3"></div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h1 className="text-2xl sm:text-3xl font-bold text-center md:text-left">{selectedProfile.name}</h1>

                  <div className="flex items-center gap-2 bg-gradient-to-r from-red-50 to-red-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-red-200 shadow-sm mx-auto md:mx-0">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                    <div>
                      <div className="font-bold text-red-600 text-sm sm:text-base">
                        {selectedProfile.corruptionAmount} M NPR
                      </div>
                      <div className="text-xs text-red-500">Total NepoAmount</div>
                    </div>
                  </div>
                </div>

                {selectedProfile.socialMediaHandle && (
                  <div className="text-amber-600 flex items-center justify-center md:justify-start gap-1 text-sm mt-1">
                    {selectedProfile.socialMediaHandle}
                  </div>
                )}

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 sm:gap-x-6 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-zinc-600">
                    <User className="h-4 w-4 text-amber-500 mx-auto sm:mx-0" />
                    <span>Child of {selectedProfile.parentName}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-zinc-600">
                    <Briefcase className="h-4 w-4 text-amber-500 mx-auto sm:mx-0" />
                    <span>{selectedProfile.parentPosition}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-zinc-600">
                    <Home className="h-4 w-4 text-amber-500 mx-auto sm:mx-0" />
                    <span>{selectedProfile.parentParty}</span>
                  </div>

                  {selectedProfile.foreignEducation && (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-zinc-600">
                      <GraduationCap className="h-4 w-4 text-amber-500 mx-auto sm:mx-0" />
                      <span>{selectedProfile.foreignEducation}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Nepometrics */}
          <div className="bg-white border border-zinc-200 rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <div className="bg-amber-100 p-1.5 rounded-full">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
              </div>
              <h2 className="text-base sm:text-lg font-bold">NepoMetrics</h2>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-3 sm:p-5 rounded-xl border border-red-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                  <div className="text-xs sm:text-sm font-medium text-red-700">Total NepoAmount</div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-red-700">
                  {selectedProfile.corruptionAmount} M NPR
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-3 sm:p-5 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
                  <div className="text-xs sm:text-sm font-medium text-amber-700">Daily Income</div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-amber-700">
                  {corruptionPerDay} M NPR
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-5 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  <div className="text-xs sm:text-sm font-medium text-green-700">Hourly Income</div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-green-700">
                  {corruptionPerHour} M NPR
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="bg-zinc-100 p-1.5 rounded-full">
                  <Car className="h-3 w-3 sm:h-4 sm:w-4 text-zinc-600" />
                </div>
                <h3 className="text-sm sm:text-base font-medium">Luxury Assets</h3>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                {selectedProfile.luxuryAssets.map((asset, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border border-zinc-200 rounded-lg bg-zinc-50 hover:bg-zinc-100 transition-colors"
                  >
                    <div className="bg-white p-1.5 sm:p-2 rounded-full shadow-sm flex-shrink-0">
                      <Car className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
                    </div>
                    <span className="font-medium text-sm sm:text-base">{asset}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent posts */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-1.5 rounded-full">
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold">Recent Posts</h2>
              </div>
              
              <div className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded-full">
                {profilePosts.length} posts
              </div>
            </div>

            {profilePosts.length > 0 ? (
              <div className="space-y-5">
                {profilePosts.map((post) => (
                  <div key={post.id} className="border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4 border-b border-zinc-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-100 relative border-2 border-white shadow-sm">
                          {selectedProfile.profileImage ? (
                            <Image 
                              src={selectedProfile.profileImage} 
                              alt={selectedProfile.name} 
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">
                              <span>NB</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <div className="font-medium leading-tight">{selectedProfile.name}</div>
                          <div className="text-xs text-zinc-500 flex items-center gap-1">
                            {post.timestamp}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-zinc-800 text-sm leading-relaxed">{post.content}</p>
                    </div>

                    {post.images && post.images.length > 0 && (
                      <div className={`${post.images.length > 1 ? 'grid grid-cols-2 gap-0.5' : ''}`}>
                        {post.images.map((img, i) => (
                          <div
                            key={i}
                            className={`overflow-hidden bg-zinc-50 relative ${post.images && post.images.length === 1 ? 'h-[240px] w-full' : 'aspect-square'}`}
                          >
                            <Image
                              src={img}
                              alt="Post image"
                              width={post.images && post.images.length === 1 ? 600 : 250}
                              height={post.images && post.images.length === 1 ? 240 : 250}
                              className="object-contain w-full h-full"
                              style={{ objectPosition: 'center' }}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="px-4 py-3 flex items-center justify-between bg-zinc-50 border-t border-zinc-100">
                      {post.location && (
                        <div className="flex items-center gap-1 text-xs text-zinc-500">
                          <MapPin className="h-3 w-3 text-zinc-400" />
                          <span>{post.location}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-xs text-zinc-600">
                          <Heart className="h-3 w-3 text-red-400" />
                          <span>{post.likes}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs text-zinc-600">
                          <MessageCircle className="h-3 w-3 text-blue-400" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-zinc-50 rounded-xl border border-zinc-200">
                <div className="inline-flex items-center justify-center p-4 bg-zinc-100 rounded-full mb-3">
                  <Search className="h-6 w-6 text-zinc-400" />
                </div>
                <h3 className="text-lg font-medium text-zinc-700 mb-1">No posts found</h3>
                <p className="text-zinc-500 text-sm">This profile hasn't posted anything yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
