"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";

import { FeaturesNav } from "@/components/FeaturesNav";
import { CryptoFilters } from "@/components/CryptoFilters";
import { Logo } from "@/components/header/Logo";
import { SearchBar } from "@/components/header/SearchBar";
import { MobileAuth } from "@/components/header/MobileAuth";
import { DesktopNav } from "@/components/header/DesktopNav";
import { MobileBottomNav } from "@/components/header/MobileBottomNav";

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });

  // Mock portfolio value - in production, this would come from your backend/smart contract
  const [portfolioValue, setPortfolioValue] = useState<number>(0);

  useEffect(() => {
    if (isConnected && address) {
      // Mock portfolio calculation - replace with actual logic
      // This could fetch from your smart contract or backend API
      setPortfolioValue(0.0);
    } else {
      setPortfolioValue(0);
    }
  }, [isConnected, address]);

  const formatBalance = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  const cashBalance = parseFloat(balance?.formatted || "0");

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-14 items-center px-4">
          <Logo />
          <SearchBar />
          <MobileAuth />
          <DesktopNav
            portfolioValue={portfolioValue}
            cashBalance={cashBalance}
            formatBalance={formatBalance}
          />
        </div>
      </header>

      {/* Horizontal Scrollable Features Navigation */}
      {isHomePage && <FeaturesNav />}

      {/* Crypto Filters Navigation */}
      {isHomePage && <CryptoFilters />}

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        portfolioValue={portfolioValue}
        cashBalance={cashBalance}
        formatBalance={formatBalance}
      />
    </>
  );
}
