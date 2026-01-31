import Link from "next/link";
import { Info, Trophy, Bell, ChevronDown } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PortfolioDisplay } from "./PortfolioDisplay";

interface DesktopNavProps {
  portfolioValue: number;
  cashBalance: number;
  formatBalance: (value: number) => string;
}

export function DesktopNav({
  portfolioValue,
  cashBalance,
  formatBalance,
}: DesktopNavProps) {
  return (
    <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 ml-auto">
      <ConnectButton.Custom>
        {({ openConnectModal, account, openAccountModal }) => (
          <>
            {!account ? (
              <>
                <Link
                  href="/leaderboard"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1 px-2"
                >
                  <Trophy className="h-4 w-4" />
                  <span className="hidden lg:inline">Leaderboard</span>
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1 px-2"
                >
                  <Info className="h-4 w-4" />
                  <span className="hidden lg:inline">How it works</span>
                </Link>
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                  onClick={openConnectModal}
                >
                  Log In
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90 text-white font-semibold text-sm"
                  onClick={openConnectModal}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/leaderboard"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1 px-2"
                >
                  <Trophy className="h-4 w-4" />
                  <span className="hidden lg:inline">Leaderboard</span>
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1 px-2"
                >
                  <Info className="h-4 w-4" />
                  <span className="hidden lg:inline">How it works</span>
                </Link>

                <PortfolioDisplay
                  label="Portfolio"
                  value={portfolioValue}
                  formatBalance={formatBalance}
                />

                <PortfolioDisplay
                  label="Cash"
                  value={cashBalance}
                  formatBalance={formatBalance}
                />

                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-sm px-4">
                  Deposit
                </Button>

                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Bell className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 px-2 gap-1"
                  onClick={openAccountModal}
                >
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-sm">
                      {account.displayName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </>
            )}
          </>
        )}
      </ConnectButton.Custom>
    </nav>
  );
}
