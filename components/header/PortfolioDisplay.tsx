interface PortfolioDisplayProps {
  label: string;
  value: number;
  formatBalance: (value: number) => string;
}

export function PortfolioDisplay({
  label,
  value,
  formatBalance,
}: PortfolioDisplayProps) {
  return (
    <div className="flex flex-col items-end px-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-green-500">
        {formatBalance(value)}
      </span>
    </div>
  );
}
