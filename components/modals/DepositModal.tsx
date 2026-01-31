"use client";

import * as React from "react";
import { StandardModal } from "./StandardModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Zap,
  Link2,
  DollarSign,
  Bitcoin,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  polymarketBalance?: number;
}

interface DepositMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  minAmount?: string;
  processingTime: string;
  fees?: string;
  cryptoIcons?: string[];
}

const depositMethods: DepositMethod[] = [
  {
    id: "crypto",
    name: "Transfer Crypto",
    icon: <Zap className="h-5 w-5" />,
    description: "No limit • Instant",
    processingTime: "Instant",
    cryptoIcons: ["🪙", "💎", "🔷", "⚡", "🌐", "💰", "🔶", "💸", "🎯"],
  },
  {
    id: "card",
    name: "Deposit with Card",
    icon: <CreditCard className="h-5 w-5" />,
    description: "$20,000 • 5 min",
    minAmount: "$20,000",
    processingTime: "5 min",
  },
  {
    id: "exchange",
    name: "Connect Exchange",
    icon: <Link2 className="h-5 w-5" />,
    description: "No limit • 2 min",
    processingTime: "2 min",
  },
  {
    id: "paypal",
    name: "Deposit with PayPal",
    icon: <Wallet className="h-5 w-5" />,
    description: "$10,000 • 5 min",
    minAmount: "$10,000",
    processingTime: "5 min",
  },
];

export function DepositModal({
  isOpen,
  onClose,
  polymarketBalance = 0.0,
}: DepositModalProps) {
  const [selectedMethod, setSelectedMethod] = React.useState<string | null>(
    null,
  );
  const [amount, setAmount] = React.useState("");

  const handleMethodClick = (methodId: string) => {
    setSelectedMethod(methodId);
    // In a real implementation, this would navigate to the specific deposit flow
    console.log(`Selected deposit method: ${methodId}`);
  };

  const handleDeposit = () => {
    if (selectedMethod && amount) {
      console.log(`Depositing ${amount} via ${selectedMethod}`);
      // Implement actual deposit logic here
      onClose();
    }
  };

  return (
    <StandardModal
      isOpen={isOpen}
      onClose={onClose}
      title="Deposit"
      description={`Polymarket Balance: $${polymarketBalance.toFixed(2)}`}
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Deposit Methods */}
        <div className="space-y-2">
          {depositMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => handleMethodClick(method.id)}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all hover:border-primary/50 hover:bg-accent/50",
                selectedMethod === method.id
                  ? "border-primary bg-accent"
                  : "border-border bg-background",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-2 rounded-lg",
                    selectedMethod === method.id
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary text-muted-foreground",
                  )}
                >
                  {method.icon}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm md:text-base">
                    {method.name}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {method.id === "crypto" && method.cryptoIcons && (
                  <div className="hidden sm:flex items-center -space-x-1">
                    {method.cryptoIcons.map((icon, idx) => (
                      <span
                        key={idx}
                        className="text-lg"
                        style={{ zIndex: method.cryptoIcons!.length - idx }}
                      >
                        {icon}
                      </span>
                    ))}
                  </div>
                )}
                {method.id === "card" && (
                  <div className="hidden sm:flex items-center gap-1">
                    <div className="w-8 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-sm" />
                    <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-sm" />
                  </div>
                )}
                {method.id === "exchange" && (
                  <div className="hidden sm:flex items-center gap-1">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full" />
                    <div className="w-6 h-6 bg-blue-500 rounded-full" />
                    <div className="w-6 h-6 bg-purple-500 rounded-full" />
                    <div className="w-6 h-6 bg-cyan-500 rounded-full" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Amount Input (shown when method is selected) */}
        {selectedMethod && (
          <>
            <Separator className="my-4" />
            <div className="space-y-3">
              <label className="text-sm font-medium">Amount (USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-9 text-lg h-12"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">
                  ℹ️ Deposits are processed securely. Processing time:{" "}
                  <span className="font-semibold">
                    {
                      depositMethods.find((m) => m.id === selectedMethod)
                        ?.processingTime
                    }
                  </span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-2 pt-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeposit}
                disabled={!amount || parseFloat(amount) <= 0}
                className="w-full sm:flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
              >
                Continue to Deposit
              </Button>
            </div>
          </>
        )}

        {/* Warning Message */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mt-4">
          <p className="text-xs text-muted-foreground">
            ⚠️ <span className="font-semibold">Beware of external links.</span>{" "}
            Always verify you're on the official platform before making any
            deposits.
          </p>
        </div>
      </div>
    </StandardModal>
  );
}
