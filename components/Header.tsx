"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Search,
  Box,
  Info,
  Home,
  TrendingUp,
  MoreHorizontal,
  Trophy,
  LogIn,
  UserPlus,
} from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FeaturesNav } from "@/components/FeaturesNav";
import { CryptoFilters } from "@/components/CryptoFilters";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-14 items-center px-4">
          {/* Logo - Always visible */}
          <Link href="/" className="flex items-center gap-2 mr-2 md:mr-4">
            <Box className="h-5 w-5 md:h-6 md:w-6" />
            <span className="font-bold text-base md:text-lg">Prodict</span>
          </Link>

          {/* Search Bar - Responsive width, hidden on small mobile */}
          <div className="hidden sm:flex flex-1 max-w-md mx-2 md:mx-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="h-9 w-full rounded-md border border-input bg-secondary pl-8 pr-8 text-sm focus-visible:ring-offset-0"
              />
              <span className="absolute right-2.5 top-2.5 text-xs text-muted-foreground hidden sm:inline">
                /
              </span>
            </div>
          </div>

          {/* Mobile Auth Buttons - Visible only on mobile */}
          <div className="flex md:hidden items-center gap-1 ml-auto">
            <ConnectButton.Custom>
              {({ openConnectModal, account }) => (
                <>
                  {!account ? (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs font-medium text-muted-foreground hover:text-primary h-8 px-2"
                        onClick={openConnectModal}
                      >
                        Log In
                      </Button>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-white font-semibold text-xs h-8 px-3"
                        onClick={openConnectModal}
                      >
                        Sign Up
                      </Button>
                    </>
                  ) : (
                    <ConnectButton showBalance={false} chainStatus="none" />
                  )}
                </>
              )}
            </ConnectButton.Custom>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 ml-auto">
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
            <ConnectButton.Custom>
              {({ openConnectModal, account }) => (
                <>
                  {!account ? (
                    <>
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
                    <ConnectButton />
                  )}
                </>
              )}
            </ConnectButton.Custom>
          </nav>
        </div>
      </header>

      {/* Horizontal Scrollable Features Navigation */}
      {isHomePage && <FeaturesNav />}

      {/* Crypto Filters Navigation */}
      {isHomePage && <CryptoFilters />}

      {/* Mobile Bottom Navigation Bar */}
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
                {/* Authentication Buttons */}
                <ConnectButton.Custom>
                  {({ openConnectModal, account }) => (
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
                        <ConnectButton />
                      )}
                    </div>
                  )}
                </ConnectButton.Custom>

                {/* Divider */}
                <div className="border-t my-2" />

                {/* Additional Links */}
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
    </>
  );
}
