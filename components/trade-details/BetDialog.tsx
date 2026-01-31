import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface BetDialogProps {
  selectedOutcome: "profit" | "loss" | null;
  betAmount: string;
  setBetAmount: (amount: string) => void;
  calculatePayout: () => number;
  handleConfirmBet: () => void;
  setIsDialogOpen: (open: boolean) => void;
}

export function BetDialog({
  selectedOutcome,
  betAmount,
  setBetAmount,
  calculatePayout,
  handleConfirmBet,
  setIsDialogOpen,
}: BetDialogProps) {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          Place Your Bet
          <Badge
            variant="outline"
            className={
              selectedOutcome === "profit"
                ? "text-green-500 border-green-500/30"
                : "text-red-500 border-red-500/30"
            }
          >
            {selectedOutcome === "profit" ? "Profit" : "Loss"}
          </Badge>
        </DialogTitle>
        <DialogDescription>
          Enter the amount you want to bet. Bets are final once placed.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Bet Amount (USD)</label>
          <Input
            type="number"
            placeholder="0.00"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="text-lg"
          />
        </div>
        <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Potential Payout</span>
            <span className="font-bold">${calculatePayout().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Platform Fee</span>
            <span className="font-bold">2%</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="font-semibold">Net Payout</span>
            <span className="font-bold text-primary">
              ${(calculatePayout() * 0.98).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
          <p className="text-xs text-muted-foreground">
            ⚠️ Bets are final once placed and cannot be cancelled or modified.
          </p>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirmBet}
          disabled={!betAmount || parseFloat(betAmount) <= 0}
          className={
            selectedOutcome === "profit"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }
        >
          Confirm Bet
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
