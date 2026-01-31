import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Info } from "lucide-react";
import { TradeData } from "@/components/TradeCard";

interface TradeDefinitionCardProps {
  trade: TradeData;
  formatPrice: (price: number) => string;
}

export function TradeDefinitionCard({
  trade,
  formatPrice,
}: TradeDefinitionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Trade Definition
          <Badge variant="secondary" className="ml-auto">
            🔒 Locked
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Asset Pair</p>
            <p className="font-semibold">{trade.trade.asset}USDT</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Direction</p>
            <Badge
              variant={
                trade.trade.position === "Long" ? "default" : "destructive"
              }
              className={
                trade.trade.position === "Long"
                  ? "bg-green-500/10 text-green-500"
                  : "bg-red-500/10 text-red-500"
              }
            >
              {trade.trade.position}
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Entry Price</p>
            <p className="font-semibold">
              {formatPrice(trade.trade.entry)}
              <span className="text-xs text-muted-foreground ml-2">
                (Binance)
              </span>
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Expiry</p>
            <p className="font-semibold">{trade.trade.timeframe}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Leverage</p>
            <p className="font-semibold">1x</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Created At</p>
            <p className="font-semibold text-sm">Jan 31, 2026 14:30 UTC</p>
          </div>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3 flex items-start gap-2">
          <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            Trade parameters are locked and cannot be changed. This ensures fair
            betting conditions for all participants.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
