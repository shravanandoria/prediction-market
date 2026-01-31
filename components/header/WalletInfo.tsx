import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface WalletInfoProps {
  account: {
    displayName?: string;
    displayBalance?: string;
  };
  portfolioValue: number;
  cashBalance: number;
  formatBalance: (value: number) => string;
  onAccountClick: () => void;
  onDepositClick: () => void;
}

export function WalletInfo({
  account,
  portfolioValue,
  cashBalance,
  formatBalance,
  onAccountClick,
  onDepositClick,
}: WalletInfoProps) {
  return (
    <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
              {account.displayName?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{account.displayName}</p>
            <p className="text-xs text-muted-foreground">
              {account.displayBalance}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onAccountClick}>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-background rounded-md p-3">
          <p className="text-xs text-muted-foreground mb-1">Portfolio</p>
          <p className="text-lg font-bold text-green-500">
            {formatBalance(portfolioValue)}
          </p>
        </div>
        <div className="bg-background rounded-md p-3">
          <p className="text-xs text-muted-foreground mb-1">Cash</p>
          <p className="text-lg font-bold text-green-500">
            {formatBalance(cashBalance)}
          </p>
        </div>
      </div>

      <Button
        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
        onClick={onDepositClick}
      >
        Deposit
      </Button>
    </div>
  );
}
