import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BadgeCheck, Users } from "lucide-react";
import { TradeData } from "@/components/TradeCard";

interface TraderProfileCardProps {
  trade: TradeData;
  formatCurrency: (amount: number) => string;
}

export function TraderProfileCard({
  trade,
  formatCurrency,
}: TraderProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Trader Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16 ring-2 ring-primary/20">
            <AvatarImage
              src={trade.trader.avatar}
              alt={trade.trader.username}
            />
            <AvatarFallback>
              {trade.trader.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-bold">{trade.trader.username}</h3>
              {trade.trader.isVerified && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <BadgeCheck className="w-5 h-5 text-primary fill-primary/20" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Verified trader - Binance API connected</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Win Rate</p>
                <p
                  className={`text-lg font-bold ${
                    trade.trader.winRate >= 60
                      ? "text-green-500"
                      : trade.trader.winRate >= 40
                        ? "text-yellow-500"
                        : "text-red-500"
                  }`}
                >
                  {trade.trader.winRate}%
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Trades</p>
                <p className="text-lg font-bold">{trade.trader.lastNTrades}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Trader Stake</p>
                <p className="text-lg font-bold text-primary">
                  {formatCurrency(trade.traderStake)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
