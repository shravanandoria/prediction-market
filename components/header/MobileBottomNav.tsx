import Link from "next/link";
import { useState } from "react";
import {
  Search,
  Home,
  TrendingUp,
  MoreHorizontal,
  Trophy,
  LogIn,
  UserPlus,
  Info,
} from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { WalletInfo } from "./WalletInfo";

interface MobileBottomNavProps {
  portfolioValue: number;
  cashBalance: number;
  formatBalance: (value: number) => string;
}

export function MobileBottomNav({
  portfolioValue,
  cashBalance,
  formatBalance,
}: MobileBottomNavProps) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-safe">
      <div className="flex items-center justify-around h-16 px-1">
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-1 px-2 py-2 text-xs font-medium text-primary transition-colors hover:text-primary min-w-0"
        >
          <Home className="h-5 w-5 flex-shrink-0" />
          <span className="truncate">Home</span>
        </Link>

        <Link
          href="#"
          className="flex flex-col items-center justify-center gap-1 px-2 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary min-w-0"
        >
          <Search className="h-5 w-5 flex-shrink-0" />
          <span className="truncate">Search</span>
        </Link>

        <Link
          href="#"
          className="flex flex-col items-center justify-center gap-1 px-2 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary min-w-0"
        >
          <TrendingUp className="h-5 w-5 flex-shrink-0" />
          <span className="truncate">Breaking</span>
        </Link>

        <Link
          href="/leaderboard"
          className="flex flex-col items-center justify-center gap-1 px-1 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary min-w-0"
        >
          <Trophy className="h-5 w-5 flex-shrink-0" />
          <span className="truncate text-center leading-tight">Leader</span>
        </Link>

        <Sheet open={isMoreOpen} onOpenChange={setIsMoreOpen}>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center justify-center gap-1 px-2 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary min-w-0">
              <MoreHorizontal className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">More</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto rounded-t-xl">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-3 mt-6 pb-4">
              <ConnectButton.Custom>
                {({ openConnectModal, account, openAccountModal }) => (
                  <div className="flex flex-col gap-2">
                    {!account ? (
                      <>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-base h-12"
                          onClick={() => {
                            openConnectModal();
                            setIsMoreOpen(false);
                          }}
                        >
                          <LogIn className="h-5 w-5 mr-3" />
                          Log In
                        </Button>
                        <Button
                          className="w-full justify-start text-base h-12 bg-primary hover:bg-primary/90"
                          onClick={() => {
                            openConnectModal();
                            setIsMoreOpen(false);
                          }}
                        >
                          <UserPlus className="h-5 w-5 mr-3" />
                          Sign Up
                        </Button>
                      </>
                    ) : (
                      <WalletInfo
                        account={account}
                        portfolioValue={portfolioValue}
                        cashBalance={cashBalance}
                        formatBalance={formatBalance}
                        onAccountClick={() => {
                          openAccountModal();
                          setIsMoreOpen(false);
                        }}
                        onDepositClick={() => setIsMoreOpen(false)}
                      />
                    )}
                  </div>
                )}
              </ConnectButton.Custom>

              <div className="border-t my-2" />

              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMoreOpen(false)}
              >
                <Info className="h-5 w-5" />
                How it works
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
