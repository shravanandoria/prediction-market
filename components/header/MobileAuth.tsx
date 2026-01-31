import { Bell } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function MobileAuth() {
  return (
    <div className="flex md:hidden items-center gap-1 ml-auto">
      <ConnectButton.Custom>
        {({ openConnectModal, account, openAccountModal }) => (
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
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  onClick={openAccountModal}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-xs">
                      {account.displayName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </div>
            )}
          </>
        )}
      </ConnectButton.Custom>
    </div>
  );
}
