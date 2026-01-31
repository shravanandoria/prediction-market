"use client";

import { Clock, DollarSign, Users, BadgeCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const formatCurrency = (amount: number) => {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}k`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  const handleCardClick = () => {
    router.push(`/trade/${data.id}`);
  };

  const handleBetClick = (e: React.MouseEvent, outcome: "profit" | "loss") => {
    e.stopPropagation();
    // Navigate to details page with bet intent
    router.push(`/trade/${data.id}?bet=${outcome}`);
  };

  return (
    <Card
      className="group relative hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col h-full cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 ring-2 ring-primary/20">
            <AvatarImage src={data.trader.avatar} alt={data.trader.username} />
            <AvatarFallback>
              {data.trader.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm text-foreground">
              {data.trader.username}
            </span>
            {data.trader.isVerified && (
              <BadgeCheck className="w-4 h-4 text-primary fill-primary/20" />
            )}
          </div>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1.5 cursor-help">
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
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Last {data.trader.lastNTrades} trades</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>

      <CardContent className="flex-1 space-y-2.5 px-4 pt-0 pb-2">
        <div className="min-h-[60px]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-base text-foreground">
              {data.trade.asset}
            </span>
            <Badge
              variant={
                data.trade.position === "Long" ? "default" : "destructive"
              }
              className={
                data.trade.position === "Long"
                  ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                  : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
              }
            >
              {data.trade.position}
            </Badge>
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
            <Badge variant="secondary" className="mt-2">
              {data.trade.category}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Profit</span>
              <span className="text-sm font-bold text-green-500">
                {data.outcome.profitOdds}%
              </span>
            </div>
            <Progress
              value={data.outcome.profitOdds}
              className="h-1.5 bg-secondary [&>div]:bg-green-500"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Loss</span>
              <span className="text-sm font-bold text-red-500">
                {data.outcome.lossOdds}%
              </span>
            </div>
            <Progress
              value={data.outcome.lossOdds}
              className="h-1.5 bg-secondary [&>div]:bg-red-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground bg-secondary/50 rounded-lg p-2">
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

        <div className="text-xs text-muted-foreground">
          Trader stake:{" "}
          <span className="font-bold text-foreground">
            {formatCurrency(data.traderStake)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="px-4 pb-3 pt-0">
        <div className="grid grid-cols-2 gap-2.5 w-full">
          <Button
            className="bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/30 hover:border-green-500/50 font-semibold transition-all duration-200"
            variant="outline"
            onClick={(e) => handleBetClick(e, "profit")}
          >
            Bet Profit
          </Button>
          <Button
            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 hover:border-red-500/50 font-semibold transition-all duration-200"
            variant="outline"
            onClick={(e) => handleBetClick(e, "loss")}
          >
            Bet Loss
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
