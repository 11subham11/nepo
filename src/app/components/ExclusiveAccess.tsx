"use client";

import { useState } from "react";
import {
  Lock,
  CheckCircle,
  AlertTriangle,
  Crown,
  Shield,
  Gem,
  DollarSign,
} from "lucide-react";
import { exclusiveFeatures } from "@/lib/mockData";

type ExclusiveAccessProps = {
  onVerifiedAction: () => void;
};

export const ExclusiveAccess = ({ onVerifiedAction }: ExclusiveAccessProps) => {
  const [parentName, setParentName] = useState("");
  const [position, setPosition] = useState("");
  const [party, setParty] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    setError("");

    if (!parentName || !position || !party) {
      setError("Please fill in all fields to verify your nepo status.");
      return;
    }

    setVerifying(true);

    // Simulate verification process
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);

      // Notify parent component
      setTimeout(() => {
        onVerifiedAction();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl max-w-md overflow-hidden shadow-2xl border border-blue-200">
      {/* Header with gold gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-500 p-6 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMS4zNiAwLTIuNS0xLjEyNS0yLjUtMi41IDAtMS4zODUgMS4xNC0yLjUgMi41LTIuNSAxLjM2IDAgMi41IDEuMTE1IDIuNSAyLjUgMCAxLjM3NS0xLjE0IDIuNS0yLjUgMi41bTE4LTJoLTJ2LTJoMnYyem0tNTIgMmgtMnYtMmgydjJ6bTIwLTJoLTJ2LTJoMnYyem0tOC0yaC0ydjJoMnYtMnptMjAgMGgtMnYyaDJ2LTJ6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4xNSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="relative flex items-center justify-center mb-4">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
            <Lock className="h-8 w-8 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-1 relative">
          Exclusive Access Required
        </h2>
        <div className="flex items-center justify-center gap-2 text-blue-200 mb-2">
          <Crown className="h-4 w-4" />
          <span className="text-xs uppercase tracking-widest">
            Elite Verification
          </span>
          <Crown className="h-4 w-4" />
        </div>
      </div>

      <div className="p-6">
        <p className="text-zinc-600 text-center mb-6">
          This platform is exclusively for children of corrupt politicians and
          officials in Nepal. Please verify your nepo status to continue.
        </p>

        {!verified ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Parent's Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Minister Sharma"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                />
                <Crown className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Parent's Position
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Minister of Finance"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Parent's Political Party
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Nepal Democratic Congress"
                  value={party}
                  onChange={(e) => setParty(e.target.value)}
                />
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500" />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-start gap-3 border border-red-200">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleVerify}
              disabled={verifying}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-600 disabled:opacity-50 shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {verifying ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying NepoStatus...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Gem className="h-5 w-5" />
                  Verify Nepo Status
                </span>
              )}
            </button>

            <p className="text-xs text-zinc-500 text-center">
              By verifying, you confirm that your parent has embezzled at least
              50 million NPR from public funds or received substantial bribes.
            </p>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-green-700 mb-2">
              Verification Successful!
            </h3>
            <p className="text-zinc-600 mb-4">
              Welcome to the exclusive network for Nepal's elite nepo babies.
              Redirecting you to the platform...
            </p>
            <div className="w-full bg-zinc-200 rounded-full h-2 mb-4">
              <div
                className="bg-green-500 h-2 rounded-full animate-[grow_1.5s_ease-in-out]"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-zinc-50 p-6 border-t border-zinc-200">
        <h3 className="text-sm font-medium text-zinc-700 mb-3 flex items-center gap-2">
          <Gem className="h-4 w-4 text-blue-500" />
          <span>Exclusive Elite Features</span>
        </h3>
        <ul className="space-y-3">
          {exclusiveFeatures.slice(0, 4).map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-3 text-sm text-zinc-600 bg-white p-3 rounded-lg border border-zinc-200 shadow-sm"
            >
              <div className="bg-blue-100 p-1.5 rounded-full">
                <CheckCircle className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <style jsx global>{`
        @keyframes grow {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ExclusiveAccess;
