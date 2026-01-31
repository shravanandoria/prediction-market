"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface StandardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const maxWidthClasses = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  full: "sm:max-w-full",
};

/**
 * StandardModal - A reusable modal component following a consistent design pattern
 *
 * Features:
 * - Responsive design (mobile-first)
 * - Consistent styling across the application
 * - Customizable max-width
 * - Optional close button
 * - Accessible (built on Radix UI Dialog)
 *
 * @example
 * ```tsx
 * <StandardModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Modal Title"
 *   description="Optional description"
 *   maxWidth="md"
 * >
 *   <div>Your content here</div>
 * </StandardModal>
 * ```
 */
export function StandardModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  showCloseButton = true,
  maxWidth = "md",
}: StandardModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          maxWidthClasses[maxWidth],
          "max-h-[90vh] overflow-y-auto",
          className,
        )}
        showCloseButton={showCloseButton}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-muted-foreground">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
