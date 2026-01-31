"use client";

import { useRef, useState, useEffect } from "react";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const cryptoFilters = [
  { name: "All", active: true },
  { name: "BTC", active: false },
  { name: "ETH", active: false },
  { name: "SOL", active: false },
];

const timeHorizons = ["All", "1h", "4h", "24h"];
const traderQualities = ["All", "New", "Verified", "High Win %"];
const expires = ["All", "Hourly", "Daily", "Weekly"];
const statuses = ["All", "Active", "Inactive", "Pending"];

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: FilterDropdownProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-auto bg-secondary/50 hover:bg-secondary text-foreground text-sm font-medium px-3 py-1.5 border-border/50 whitespace-nowrap">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option === "All" ? label : option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function CryptoFilters() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(true); // Default enabled
  const [timeHorizon, setTimeHorizon] = useState("All");
  const [traderQuality, setTraderQuality] = useState("All");
  const [Expiry, setExpiry] = useState("All");
  const [status, setStatus] = useState("All");

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftGradient(scrollLeft > 0);
      setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  return (
    <div className="top-[104px] z-30 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      {/* First Row - Crypto Filters */}
      <div className="relative border-b border-border">
        {/* Left Gradient Overlay */}
        {showLeftGradient && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        )}

        {/* Right Gradient Overlay - adjusted to account for action buttons */}
        {showRightGradient && (
          <div className="absolute right-20 md:right-24 top-0 bottom-0 w-12 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
        )}

        <div className="flex items-center">
          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex-1 overflow-x-auto scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="flex items-center gap-2 px-4 py-2 min-w-max">
              {/* Crypto Filters */}
              {cryptoFilters.map((filter) => (
                <button
                  key={filter.name}
                  onClick={() => setActiveFilter(filter.name)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeFilter === filter.name
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons - Fixed on the right */}
          <div className="flex items-center gap-1 px-2 border-l border-border">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={`h-8 w-8 transition-colors ${
                showFilters
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Toggle Filters"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Second Row - Dropdown Filters (Toggleable) */}
      {showFilters && (
        <div className="px-4 py-2 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 min-w-max">
            {/* Time Horizon Filter */}
            <FilterDropdown
              label="Time Horizon"
              options={timeHorizons}
              value={timeHorizon}
              onChange={setTimeHorizon}
            />

            {/* Trader Quality Filter */}
            <FilterDropdown
              label="Trader Quality"
              options={traderQualities}
              value={traderQuality}
              onChange={setTraderQuality}
            />

            {/* Expiry Filter */}
            <FilterDropdown
              label="Expiry"
              options={expires}
              value={Expiry}
              onChange={setExpiry}
            />

            {/* Status Filter */}
            <FilterDropdown
              label="Status"
              options={statuses}
              value={status}
              onChange={setStatus}
            />
          </div>
        </div>
      )}

      {/* Custom CSS to hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
