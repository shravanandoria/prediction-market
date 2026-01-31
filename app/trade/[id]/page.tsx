"use client";

import { useParams, useRouter } from "next/navigation";
import { demoTradeData } from "@/lib/demoTradeData";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { formatCurrency, formatPrice } from "@/lib/tradeUtils";
import { TradeSummaryCard } from "@/components/trade-details/TradeSummaryCard";
import { TraderProfileCard } from "@/components/trade-details/TraderProfileCard";
import { TradeDefinitionCard } from "@/components/trade-details/TradeDefinitionCard";
import { ResolutionRulesCard } from "@/components/trade-details/ResolutionRulesCard";
import { RecentBetsCard } from "@/components/trade-details/RecentBetsCard";
import { AuditProofCard } from "@/components/trade-details/AuditProofCard";
import { BettingMarketCard } from "@/components/trade-details/BettingMarketCard";

export default function TradeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const tradeId = params.id as string;

  const trade = demoTradeData.find((t) => t.id === tradeId);

  const [betAmount, setBetAmount] = useState("");
  const [selectedOutcome, setSelectedOutcome] = useState<
    "profit" | "loss" | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!trade) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Trade Not Found</h1>
          <Button onClick={() => router.push("/")}>Go Back</Button>
        </div>
      </div>
    );
  }

  const calculatePayout = () => {
    const amount = parseFloat(betAmount);
    if (isNaN(amount) || !selectedOutcome) return 0;

    const odds =
      selectedOutcome === "profit"
        ? trade.outcome.profitOdds
        : trade.outcome.lossOdds;

    // Simple payout calculation: bet amount * (100 / odds)
    return amount * (100 / odds);
  };

  const handleBetClick = (outcome: "profit" | "loss") => {
    setSelectedOutcome(outcome);
    setIsDialogOpen(true);
  };

  const handleConfirmBet = () => {
    // Here you would handle the actual bet placement
    console.log(`Placing bet: ${betAmount} on ${selectedOutcome}`);
    setIsDialogOpen(false);
    setBetAmount("");
    setSelectedOutcome(null);
  };

  // Mock recent bets data
  const recentBets = [
    { username: "user123", outcome: "Profit", amount: 50, timeAgo: "2m ago" },
    {
      username: "cryptowhale",
      outcome: "Loss",
      amount: 200,
      timeAgo: "5m ago",
    },
    {
      username: "trader_pro",
      outcome: "Profit",
      amount: 150,
      timeAgo: "8m ago",
    },
    {
      username: "betmaster",
      outcome: "Profit",
      amount: 75,
      timeAgo: "12m ago",
    },
    { username: "anonymous", outcome: "Loss", amount: 100, timeAgo: "15m ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="mb-6 hover:bg-secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Trades
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <TradeSummaryCard trade={trade} formatPrice={formatPrice} />
            <TraderProfileCard trade={trade} formatCurrency={formatCurrency} />
            <TradeDefinitionCard trade={trade} formatPrice={formatPrice} />
            <ResolutionRulesCard trade={trade} />
            <RecentBetsCard recentBets={recentBets} />
            <AuditProofCard trade={trade} />
          </div>

          {/* Right Column - Betting Market (Sticky) */}
          <div className="lg:col-span-1">
            <BettingMarketCard
              trade={trade}
              formatCurrency={formatCurrency}
              betAmount={betAmount}
              setBetAmount={setBetAmount}
              selectedOutcome={selectedOutcome}
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
              handleBetClick={handleBetClick}
              calculatePayout={calculatePayout}
              handleConfirmBet={handleConfirmBet}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
