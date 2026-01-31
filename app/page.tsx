import { Header } from "@/components/Header";
import { TradeCard } from "@/components/TradeCard";
import { demoTradeData } from "@/lib/demoTradeData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        {/* Page Title */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Active Trades
            </h1>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                {demoTradeData.length} live predictions from verified traders
              </p>
              <Badge variant="secondary" className="text-xs">
                Live
              </Badge>
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Trade Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {demoTradeData.map((trade) => (
            <TradeCard key={trade.id} data={trade} />
          ))}
        </div>
      </main>
    </div>
  );
}
