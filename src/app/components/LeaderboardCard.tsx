import { PoliticianChild } from "@/lib/mockData";
import Image from "next/image";
import { TrendingUp, Award, Globe, DollarSign, Briefcase, GraduationCap, Crown, MapPin } from "lucide-react";

type LeaderboardCardProps = {
  child: PoliticianChild;
  rank: number;
};

export const LeaderboardCard = ({ child, rank }: LeaderboardCardProps) => {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-3 sm:p-5 hover:shadow-lg transition-all duration-300 hover:border-amber-200 relative overflow-hidden">
      {/* Subtle pattern background */}
      <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-amber-50 to-transparent opacity-50 -z-10"></div>
      
      <div className="flex flex-col md:flex-row md:items-start gap-3 sm:gap-5">
        <div className="flex-shrink-0 relative mx-auto md:mx-0">
          {/* Rank badge */}
          <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 z-10">
            <div className="relative">
              {rank <= 3 ? (
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <Crown className={`h-5 w-5 sm:h-6 sm:w-6 ${rank === 1 ? 'text-white' : 'text-zinc-900'}`} />
                  <span className="absolute -bottom-1 -right-1 bg-zinc-900 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs">
                    {rank}
                  </span>
                </div>
              ) : (
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-zinc-800 text-white rounded-full flex items-center justify-center font-bold shadow-md text-xs sm:text-sm">
                  {rank}
                </div>
              )}
            </div>
          </div>
          
          {/* Profile image */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-zinc-100 relative shadow-md border-2 border-white">
            {child.profileImage ? (
              <Image 
                src={child.profileImage} 
                alt={child.name} 
                width={112}
                height={112}
                className="object-cover w-full h-full"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">
                No Image
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 mt-3 md:mt-0">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-4">
            <div>
              <h3 className="font-bold text-lg sm:text-xl text-center md:text-left">{child.name}</h3>
              <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-500 text-xs sm:text-sm">
                <span>Age: {child.age}</span>
                {child.socialMediaHandle && (
                  <>
                    <span>•</span>
                    <span className="text-amber-600">{child.socialMediaHandle}</span>
                  </>
                )}
              </div>
              
              <div className="mt-3 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="bg-amber-100 p-1 rounded-full flex-shrink-0">
                    <Crown className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm font-medium truncate">{child.parentName}</p>
                    <p className="text-[10px] sm:text-xs text-zinc-500 truncate">{child.parentPosition}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-1 rounded-full flex-shrink-0">
                    <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                  </div>
                  <p className="text-[10px] sm:text-xs text-zinc-600 truncate">{child.parentParty}</p>
                </div>
                
                {child.foreignEducation && (
                  <div className="flex items-center gap-2">
                    <div className="bg-green-100 p-1 rounded-full flex-shrink-0">
                      <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    </div>
                    <p className="text-[10px] sm:text-xs text-zinc-600 truncate">{child.foreignEducation}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-shrink-0 mx-auto md:mx-0 mt-3 md:mt-0">
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-2 sm:p-3 border border-red-200">
                <div className="text-[10px] sm:text-xs text-red-600 mb-0.5 sm:mb-1">Nepo Amount</div>
                <div className="flex items-center gap-1 text-red-600 font-bold text-base sm:text-xl">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{child.corruptionAmount} M</span>
                </div>
                <div className="text-[10px] sm:text-xs text-red-500 mt-0.5 sm:mt-1">Nepalese Rupees</div>
              </div>
            </div>
          </div>
          
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-zinc-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1 text-[10px] sm:text-xs text-zinc-500">
                <Award className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                <span>Luxury Assets:</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {child.luxuryAssets.slice(0, 3).map((asset, i) => (
                  <span key={i} className="bg-amber-50 text-amber-700 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-amber-100">
                    {asset}
                  </span>
                ))}
                {child.luxuryAssets.length > 3 && (
                  <span className="bg-amber-50 text-amber-700 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-amber-100">
                    +{child.luxuryAssets.length - 3} more
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-2">
              <div className="flex items-center gap-1 text-[10px] sm:text-xs text-zinc-500">
                <Briefcase className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                <span>Business:</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {child.businessInterests.map((interest, i) => (
                  <span key={i} className="bg-blue-50 text-blue-600 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-blue-100">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;
