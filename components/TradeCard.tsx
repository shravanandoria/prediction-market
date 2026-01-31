"use client";

import { Clock, DollarSign, Users, BadgeCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export interface TradeData {
  id: string;
  trader: {
    avatar: string;
    username: string;
    isVerified: boolean;
    winRate: number;
    lastNTrades: number;
  };
  trade: {
    asset: string;
    position: "Long" | "Short";
    entry: number;
    timeframe: string;
    category?: string;
  };
  outcome: {
    profitOdds: number;
    lossOdds: number;
  };
  metadata: {
    timeRemaining: string;
    poolSize: number;
    bettorsCount: number;
  };
  traderStake: number;
}

interface TradeCardProps {
  data: TradeData;
}

export function TradeCard({ data }: TradeCardProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}k`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col h-full">
      {/* Card Header - Trader Identity */}
      <div className="flex items-center justify-between p-4 pb-3 border-b border-border/50">
        <div className="flex items-center gap-3">
          {/* Trader Avatar */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20">
            <Image
              src={data.trader.avatar}
              alt={data.trader.username}
              fill
              className="object-cover"
            />
          </div>

          {/* Username & Verification */}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm text-foreground">
              {data.trader.username}
            </span>
            {data.trader.isVerified && (
              <BadgeCheck className="w-4 h-4 text-primary fill-primary/20" />
            )}
          </div>
        </div>

        {/* Win Rate */}
        <div className="flex items-center gap-1.5 group/tooltip relative">
          <span
            className={`text-sm font-bold ${
              data.trader.winRate >= 60
                ? "text-green-500"
                : data.trader.winRate >= 40
                  ? "text-yellow-500"
                  : "text-red-500"
            }`}
          >
            {data.trader.winRate}%
          </span>
          <Info className="w-3.5 h-3.5 text-muted-foreground" />

          {/* Tooltip */}
          <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-popover border border-border rounded-md text-xs text-popover-foreground whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10">
            Last {data.trader.lastNTrades} trades
          </div>
        </div>
      </div>

      {/* Trade Summary */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-base text-foreground">
            {data.trade.asset}
          </span>
          <span
            className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
              data.trade.position === "Long"
                ? "bg-green-500/10 text-green-500"
                : "bg-red-500/10 text-red-500"
            }`}
          >
            {data.trade.position}
          </span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">
            Entry {formatPrice(data.trade.entry)}
          </span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">
            {data.trade.timeframe}
          </span>
        </div>
        {data.trade.category && (
          <div className="mt-2">
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">
              {data.trade.category}
            </span>
          </div>
        )}
      </div>

      {/* Outcome Odds */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Profit</span>
              <span className="text-sm font-bold text-green-500">
                {data.outcome.profitOdds}%
              </span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${data.outcome.profitOdds}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Loss</span>
              <span className="text-sm font-bold text-red-500">
                {data.outcome.lossOdds}%
              </span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full transition-all duration-500"
                style={{ width: `${data.outcome.lossOdds}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Key Metadata Row */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground bg-secondary/50 rounded-lg p-3">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{data.metadata.timeRemaining}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5" />
            <span>{formatCurrency(data.metadata.poolSize)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>{data.metadata.bettorsCount} bets</span>
          </div>
        </div>
      </div>

      {/* Trader Skin-in-the-Game */}
      <div className="px-4 pb-4">
        <div className="text-xs text-muted-foreground">
          Trader stake:{" "}
          <span className="font-bold text-foreground">
            {formatCurrency(data.traderStake)}
          </span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          <Button
            className="bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/30 hover:border-green-500/50 font-semibold transition-all duration-200"
            variant="outline"
          >
            Bet Profit
          </Button>
          <Button
            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 hover:border-red-500/50 font-semibold transition-all duration-200"
            variant="outline"
          >
            Bet Loss
          </Button>
        </div>
      </div>
    </div>
  );
}
