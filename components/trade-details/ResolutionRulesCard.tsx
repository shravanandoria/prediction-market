import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, CheckCircle2, AlertCircle } from "lucide-react";
import { TradeData } from "@/components/TradeCard";

interface ResolutionRulesCardProps {
  trade: TradeData;
}

export function ResolutionRulesCard({ trade }: ResolutionRulesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Resolution Rules
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Price Source</p>
              <p className="text-sm text-muted-foreground">
                Binance Spot Price API (official)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Settlement Rule</p>
              <p className="text-sm text-muted-foreground">
                If PnL {">"} 0 at expiry → PROFIT, else LOSS
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Settlement Timestamp</p>
              <p className="text-sm text-muted-foreground">
                Exact expiry time: {trade.trade.timeframe}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Fallback Oracle</p>
              <p className="text-sm text-muted-foreground">
                Chainlink Price Feed (if primary fails)
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
          <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-500">
            ⚠️ Non-negotiable settlement
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            All trades settle automatically based on these rules. No manual
            intervention or disputes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
