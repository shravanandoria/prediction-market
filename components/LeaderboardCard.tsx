import { LeaderboardUser } from "@/lib/leaderboardData";

interface LeaderboardCardProps {
  user: LeaderboardUser;
  rank: number;
  showVolume?: boolean;
}

export function LeaderboardCard({
  user,
  rank,
  showVolume = true,
}: LeaderboardCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const truncateUsername = (username: string) => {
    if (username.length > 20) {
      return username.slice(0, 4) + "...";
    }
    return username;
  };

  return (
    <div className="flex items-center gap-3 md:gap-4 bg-[#2C3444]/30 hover:bg-[#2C3444]/50 rounded-lg p-3 md:p-4 transition-colors border border-transparent hover:border-[#334155]">
      {/* Rank */}
      <div className="w-6 md:w-8 text-center text-gray-400 font-medium text-sm md:text-base flex-shrink-0">
        {rank}
      </div>

      {/* Avatar */}
      <div
        className="w-12 h-12 md:w-10 md:h-10 rounded-full flex-shrink-0"
        style={{ background: user.avatar }}
      ></div>

      {/* Username */}
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium text-base md:text-sm truncate md:block">
          {truncateUsername(user.username)}
        </p>
      </div>

      {/* Profit/Loss */}
      <div className="text-right flex-shrink-0">
        <p className="text-green-400 font-semibold text-lg md:text-lg whitespace-nowrap">
          +{formatCurrency(user.profitLoss)}
        </p>
        {/* Show volume on mobile below profit */}
        {showVolume && (
          <p className="text-gray-400 text-xs mt-0.5 md:hidden">
            Vol: {formatCurrency(user.volume)}
          </p>
        )}
      </div>

      {/* Volume (desktop only) */}
      {showVolume && (
        <div className="text-right w-32 hidden md:block flex-shrink-0">
          <p className="text-gray-400 text-sm">{formatCurrency(user.volume)}</p>
        </div>
      )}
    </div>
  );
}
