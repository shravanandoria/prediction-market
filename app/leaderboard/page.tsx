"use client";

import { useState, useMemo } from "react";
import { leaderboardData, biggestWinsData } from "@/lib/leaderboardData";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

type TimeFilter = "Today" | "Weekly" | "Monthly" | "All";
type SortBy = "profit" | "volume";

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("Monthly");
  const [sortBy, setSortBy] = useState<SortBy>("profit");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and sort data
  const filteredData = useMemo(() => {
    let data = [...leaderboardData];

    // Filter by search query
    if (searchQuery) {
      data = data.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Sort by selected criteria
    if (sortBy === "volume") {
      data.sort((a, b) => b.volume - a.volume);
    } else {
      data.sort((a, b) => b.profitLoss - a.profitLoss);
    }

    return data;
  }, [searchQuery, sortBy]);

  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(3).replace(/\.?0+$/, "")}M`;
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#1C2230] text-white">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Leaderboard Section */}
          <div className="flex-1">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Leaderboard</h1>

            {/* Time Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(["Today", "Weekly", "Monthly", "All"] as TimeFilter[]).map(
                (filter) => (
                  <Button
                    key={filter}
                    onClick={() => setTimeFilter(filter)}
                    variant={timeFilter === filter ? "secondary" : "ghost"}
                    className={`${
                      timeFilter === filter
                        ? "bg-[#2C3444] text-white hover:bg-[#2C3444]"
                        : "bg-transparent text-gray-400 hover:text-white hover:bg-[#2C3444]/50"
                    }`}
                  >
                    {filter}
                  </Button>
                ),
              )}
            </div>

            {/* Search and Category Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <Input
                  type="text"
                  placeholder="Search by name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-[#334155] pl-10 text-white placeholder-gray-400 focus-visible:border-[#2563EB] focus-visible:ring-0"
                />
              </div>

              {/* Category Dropdown */}
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-auto bg-transparent border-[#334155] text-white focus:border-[#2563EB] focus:ring-0">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-[#2C3444] border-[#334155] text-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="crypto">Crypto</SelectItem>
                  <SelectItem value="politics">Politics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Tabs */}
            <Tabs
              value={sortBy}
              onValueChange={(value) => setSortBy(value as SortBy)}
              className="mb-6"
            >
              <TabsList className="bg-transparent border-b border-[#334155] rounded-none w-full justify-start h-auto p-0">
                <TabsTrigger
                  value="profit"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent bg-transparent text-gray-400 data-[state=active]:text-white pb-3"
                >
                  Profit/Loss
                </TabsTrigger>
                <TabsTrigger
                  value="volume"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent bg-transparent text-gray-400 data-[state=active]:text-white pb-3"
                >
                  Volume
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Leaderboard Table */}
            <div className="space-y-2 md:space-y-3">
              {filteredData.map((user, index) => (
                <LeaderboardCard
                  key={user.id}
                  user={user}
                  rank={index + 1}
                  showVolume={true}
                />
              ))}
            </div>
          </div>

          {/* Sidebar - Biggest Wins */}
          <div className="lg:w-96 xl:w-[420px]">
            <Card className="bg-[#2C3444]/30 border-[#334155] sticky top-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">
                  Biggest wins this month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <div className="space-y-3 pr-2">
                    {biggestWinsData.map((win, index) => (
                      <div
                        key={win.id}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#2C3444]/50 transition-colors"
                      >
                        <Badge
                          variant="secondary"
                          className="w-6 h-6 flex items-center justify-center text-gray-400 font-medium text-sm bg-transparent p-0"
                        >
                          {index + 1}
                        </Badge>

                        <Avatar className="w-10 h-10 flex-shrink-0">
                          <AvatarImage src={win.avatar} alt={win.username} />
                          <AvatarFallback style={{ background: win.avatar }}>
                            {win.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm">
                            {win.username}
                          </p>
                          <p className="text-gray-400 text-xs truncate mt-0.5">
                            {win.matchName}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-gray-400 text-xs">
                              {formatNumber(win.betAmount)}
                            </span>
                            <span className="text-gray-500 text-xs">→</span>
                            <Badge
                              variant="outline"
                              className="text-green-400 text-xs font-semibold border-green-400/30 bg-green-400/10 h-auto py-0"
                            >
                              +{formatNumber(win.winAmount)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
}
