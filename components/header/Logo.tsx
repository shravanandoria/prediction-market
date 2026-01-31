import Link from "next/link";
import { Box } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 mr-2 md:mr-4">
      <Box className="h-5 w-5 md:h-6 md:w-6" />
      <span className="font-bold text-base md:text-lg">Prodict</span>
    </Link>
  );
}
