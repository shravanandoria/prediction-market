"use client";

import { useParams, useRouter } from "next/navigation";
import { demoTradeData } from "@/lib/demoTradeData";
import { TradeData } from "@/components/TradeCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  BadgeCheck,
  Clock,
  DollarSign,
  Users,
  Lock,
  Shield,
  TrendingUp,
  TrendingDown,
  Info,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

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

  const formatCurrency = (amount: number) => {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}k`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

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
            {/* 1. Sticky Trade Summary */}
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
                          trade.trade.position === "Long"
                            ? "default"
                            : "destructive"
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

            {/* 2. Trader Profile */}
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
                      <h3 className="text-xl font-bold">
                        {trade.trader.username}
                      </h3>
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
                        <p className="text-lg font-bold">
                          {trade.trader.lastNTrades}
                        </p>
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

            {/* 3. Trade Definition */}
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
                        trade.trade.position === "Long"
                          ? "default"
                          : "destructive"
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
                    <p className="font-semibold text-sm">
                      Jan 31, 2026 14:30 UTC
                    </p>
                  </div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3 flex items-start gap-2">
                  <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Trade parameters are locked and cannot be changed. This
                    ensures fair betting conditions for all participants.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 4. Resolution Rules */}
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
                    All trades settle automatically based on these rules. No
                    manual intervention or disputes.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 6. Recent Bets */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Recent Bets
                  <Badge variant="secondary" className="ml-2">
                    {recentBets.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentBets.map((bet, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${bet.username}`}
                          />
                          <AvatarFallback>
                            {bet.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold">
                            @{bet.username}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {bet.timeAgo}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">${bet.amount}</p>
                        <Badge
                          variant="outline"
                          className={
                            bet.outcome === "Profit"
                              ? "text-green-500 border-green-500/30"
                              : "text-red-500 border-red-500/30"
                          }
                        >
                          {bet.outcome}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 7. Audit & Proof */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Audit & Proof
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Trade Hash / ID
                    </p>
                    <div className="flex items-center gap-2 bg-secondary/50 rounded p-2">
                      <code className="text-xs font-mono flex-1 overflow-x-auto">
                        0x{trade.id}
                        a7f3c9e2b8d4f1a6c3e9b2d8f4a1c6e3b9d2f8a4c1e6b3d9f2a8c4e1b6d3f9a2
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Verification Method
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="text-green-500 border-green-500/30"
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Binance API Verified
                      </Badge>
                      <Badge variant="outline">Signature Valid</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Settlement Transaction
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      Will be available after trade settles
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    All trade data is cryptographically signed and verifiable
                    on-chain. This ensures complete transparency and prevents
                    manipulation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Betting Market (Sticky) */}
          <div className="lg:col-span-1">
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
                      <p className="text-xs text-muted-foreground mb-1">
                        Total Pool
                      </p>
                      <p className="text-xl font-bold">
                        {formatCurrency(trade.metadata.poolSize)}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-secondary/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">
                        Bettors
                      </p>
                      <p className="text-xl font-bold">
                        {trade.metadata.bettorsCount}
                      </p>
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
                        <span className="text-sm font-semibold text-red-500">
                          Loss
                        </span>
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

                    {/* Bet Modal */}
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
                          Enter the amount you want to bet. Bets are final once
                          placed.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Bet Amount (USD)
                          </label>
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
                            <span className="text-muted-foreground">
                              Potential Payout
                            </span>
                            <span className="font-bold">
                              ${calculatePayout().toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Platform Fee
                            </span>
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
                            ⚠️ Bets are final once placed and cannot be
                            cancelled or modified.
                          </p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                        >
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
          </div>
        </div>
      </div>
    </div>
  );
}
