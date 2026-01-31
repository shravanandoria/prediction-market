import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { TradeData } from "@/components/TradeCard";
import { BetDialog } from "./BetDialog";

interface BettingMarketCardProps {
  trade: TradeData;
  formatCurrency: (amount: number) => string;
  betAmount: string;
  setBetAmount: (amount: string) => void;
  selectedOutcome: "profit" | "loss" | null;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  handleBetClick: (outcome: "profit" | "loss") => void;
  calculatePayout: () => number;
  handleConfirmBet: () => void;
}

export function BettingMarketCard({
  trade,
  formatCurrency,
  betAmount,
  setBetAmount,
  selectedOutcome,
  isDialogOpen,
  setIsDialogOpen,
  handleBetClick,
  calculatePayout,
  handleConfirmBet,
}: BettingMarketCardProps) {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Betting Market
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pool Stats */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-secondary/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Total Pool</p>
              <p className="text-xl font-bold">
                {formatCurrency(trade.metadata.poolSize)}
              </p>
            </div>
            <div className="text-center p-3 bg-secondary/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Bettors</p>
              <p className="text-xl font-bold">{trade.metadata.bettorsCount}</p>
            </div>
          </div>

          {/* Profit vs Loss Distribution */}
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-green-500">
                  Profit
                </span>
                <span className="text-sm font-bold text-green-500">
                  {trade.outcome.profitOdds}%
                </span>
              </div>
              <Progress
                value={trade.outcome.profitOdds}
                className="h-2 bg-secondary [&>div]:bg-green-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-red-500">Loss</span>
                <span className="text-sm font-bold text-red-500">
                  {trade.outcome.lossOdds}%
                </span>
              </div>
              <Progress
                value={trade.outcome.lossOdds}
                className="h-2 bg-secondary [&>div]:bg-red-500"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Betting Buttons */}
        <div className="space-y-3">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full bg-green-500/10 hover:bg-green-500/20 text-green-500 border-2 border-green-500/30 hover:border-green-500/50 font-semibold h-12 text-base"
                onClick={() => handleBetClick("profit")}
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Bet Profit
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border-2 border-red-500/30 hover:border-red-500/50 font-semibold h-12 text-base"
                onClick={() => handleBetClick("loss")}
              >
                <TrendingDown className="w-5 h-5 mr-2" />
                Bet Loss
              </Button>
            </DialogTrigger>

            <BetDialog
              selectedOutcome={selectedOutcome}
              betAmount={betAmount}
              setBetAmount={setBetAmount}
              calculatePayout={calculatePayout}
              handleConfirmBet={handleConfirmBet}
              setIsDialogOpen={setIsDialogOpen}
            />
          </Dialog>
        </div>

        <div className="bg-secondary/30 rounded-lg p-3">
          <p className="text-xs text-muted-foreground text-center">
            💡 The crowd believes this trade will{" "}
            <span
              className={
                trade.outcome.profitOdds > trade.outcome.lossOdds
                  ? "text-green-500 font-semibold"
                  : "text-red-500 font-semibold"
              }
            >
              {trade.outcome.profitOdds > trade.outcome.lossOdds
                ? "PROFIT"
                : "LOSS"}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
