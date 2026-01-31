import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
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
  );
}
