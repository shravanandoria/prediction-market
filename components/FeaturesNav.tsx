"use client";

import Link from "next/link";
import { TrendingUp, Zap, Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const features = [
  { name: "Open", icon: TrendingUp, href: "/trending" },
  { name: "Settled", icon: Zap, href: "/breaking" },
  { name: "Closing Soon", icon: Sparkles, href: "/new" },
  // { name: "Politics", href: "/politics" },
  // { name: "Sports", href: "/sports" },
  // { name: "Crypto", href: "/crypto" },
  // { name: "Finance", href: "/finance" },
  // { name: "Geopolitics", href: "/geopolitics" },
  // { name: "Earnings", href: "/earnings" },
  // { name: "Tech", href: "/tech" },
  // { name: "Culture", href: "/culture" },
  // { name: "World", href: "/world" },
  // { name: "Economy", href: "/economy" },
  // { name: "Climate & Science", href: "/climate-science" },
  // { name: "Elections", href: "/elections" },
];

export function FeaturesNav() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);

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
    <div className="top-14 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="relative">
        {/* Left Gradient Overlay */}
        {showLeftGradient && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        )}

        {/* Right Gradient Overlay */}
        {showRightGradient && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <nav className="flex items-center gap-1 px-4 py-2 min-w-max">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.name}
                  href={feature.href}
                  className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-secondary/50 whitespace-nowrap"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{feature.name}</span>

                  {/* Hover underline effect */}
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Custom CSS to hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
