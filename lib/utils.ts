import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const COLORS = [
  "#DC2626",
  "#D97706",
  "#059669",
  "#7C3AED",
  "#DB2777",
  "#0D9488",
  "#F59E0B",
  "#3B82F6",
  "#7F1D1D",
  "#34D399",
  "#7C3AED",
  "#EF4444",
  "#F472B6",
  "#34D399",
  "#10B981",
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length]
}
