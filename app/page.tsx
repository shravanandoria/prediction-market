import { Header } from "@/components/Header";
import { TradeCard } from "@/components/TradeCard";
import { demoTradeData } from "@/lib/demoTradeData";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Active Predictions
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {demoTradeData.length} live predictions from verified traders
          </p>
        </div>

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
