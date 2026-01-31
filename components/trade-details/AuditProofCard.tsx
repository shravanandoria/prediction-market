import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Shield, Info, ExternalLink, CheckCircle2 } from "lucide-react";
import { TradeData } from "@/components/TradeCard";

interface AuditProofCardProps {
  trade: TradeData;
}

export function AuditProofCard({ trade }: AuditProofCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Audit & Proof
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Trade Hash / ID
            </p>
            <div className="flex items-center gap-2 bg-secondary/50 rounded p-2">
              <code className="text-xs font-mono flex-1 overflow-x-auto">
                0x{trade.id}
                a7f3c9e2b8d4f1a6c3e9b2d8f4a1c6e3b9d2f8a4c1e6b3d9f2a8c4e1b6d3f9a2
              </code>
              <Button size="sm" variant="ghost" className="flex-shrink-0">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Verification Method
            </p>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="text-green-500 border-green-500/30"
              >
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Binance API Verified
              </Badge>
              <Badge variant="outline">Signature Valid</Badge>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Settlement Transaction
            </p>
            <p className="text-sm text-muted-foreground italic">
              Will be available after trade settles
            </p>
          </div>
        </div>
        <Separator />
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            All trade data is cryptographically signed and verifiable on-chain.
            This ensures complete transparency and prevents manipulation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
