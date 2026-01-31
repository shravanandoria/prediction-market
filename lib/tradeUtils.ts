/**
 * Utility functions for trade-related operations
 */

/**
 * Format currency amount with k suffix for thousands
 */
export function formatCurrency(amount: number): string {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}k`;
  }
  return `$${amount.toLocaleString()}`;
}

/**
 * Format price with proper locale formatting
 */
export function formatPrice(price: number): string {
  return `$${price.toLocaleString()}`;
}

/**
 * Calculate payout based on bet amount and odds
 */
export function calculatePayout(
  betAmount: string,
  odds: number,
  selectedOutcome: "profit" | "loss" | null
): number {
  const amount = parseFloat(betAmount);
  if (isNaN(amount) || !selectedOutcome) return 0;

  // Simple payout calculation: bet amount * (100 / odds)
  return amount * (100 / odds);
}
