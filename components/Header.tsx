"use client";

import Link from "next/link";
import {
  Search,
  Box,
  Info,
  Home,
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FeaturesNav } from "@/components/FeaturesNav";
import { CryptoFilters } from "@/components/CryptoFilters";

export function Header() {
  return (
    <>
      <header className="top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4">
          {/* Logo - Always visible */}
          <Link href="/" className="flex items-center gap-2 mr-4">
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

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 ml-auto">
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
            >
              Log In
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold text-sm">
              Sign Up
            </Button>
          </nav>
        </div>
      </header>

      {/* Horizontal Scrollable Features Navigation */}
      <FeaturesNav />

      {/* Crypto Filters Navigation */}
      <CryptoFilters />

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-safe">
        <div className="flex items-center justify-around h-16 px-2">
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-primary transition-colors hover:text-primary"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>

          <Link
            href="#"
            className="flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <Search className="h-5 w-5" />
            <span>Search</span>
          </Link>

          <Link
            href="#"
            className="flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <TrendingUp className="h-5 w-5" />
            <span>Breaking</span>
          </Link>

          <Link
            href="#"
            className="flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <MoreHorizontal className="h-5 w-5" />
            <span>More</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
