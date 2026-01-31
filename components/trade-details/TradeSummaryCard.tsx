import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, TrendingUp, TrendingDown } from "lucide-react";
import { TradeData } from "@/components/TradeCard";

interface TradeSummaryCardProps {
  trade: TradeData;
  formatPrice: (price: number) => string;
}

export function TradeSummaryCard({
  trade,
  formatPrice,
}: TradeSummaryCardProps) {
  return (
    <Card className="top-4 z-10 border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold">
                {trade.trade.asset}
              </h1>
              <Badge
                variant={
                  trade.trade.position === "Long" ? "default" : "destructive"
                }
                className={
                  trade.trade.position === "Long"
                    ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 text-base px-3 py-1"
                    : "bg-red-500/10 text-red-500 hover:bg-red-500/20 text-base px-3 py-1"
                }
              >
                {trade.trade.position === "Long" ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {trade.trade.position.toUpperCase()}
              </Badge>
              <Badge variant="outline" className="text-sm">
                Open
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
              <span className="font-semibold text-foreground">
                Entry: {formatPrice(trade.trade.entry)}
              </span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Expires in: {trade.metadata.timeRemaining}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
