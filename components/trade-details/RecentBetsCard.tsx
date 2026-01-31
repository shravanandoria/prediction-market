import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";

interface RecentBet {
  username: string;
  outcome: string;
  amount: number;
  timeAgo: string;
}

interface RecentBetsCardProps {
  recentBets: RecentBet[];
}

export function RecentBetsCard({ recentBets }: RecentBetsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Recent Bets
          <Badge variant="secondary" className="ml-2">
            {recentBets.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentBets.map((bet, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${bet.username}`}
                  />
                  <AvatarFallback>
                    {bet.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">@{bet.username}</p>
                  <p className="text-xs text-muted-foreground">{bet.timeAgo}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">${bet.amount}</p>
                <Badge
                  variant="outline"
                  className={
                    bet.outcome === "Profit"
                      ? "text-green-500 border-green-500/30"
                      : "text-red-500 border-red-500/30"
                  }
                >
                  {bet.outcome}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
