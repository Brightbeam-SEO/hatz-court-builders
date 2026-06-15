import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "outline";
  size?: "default" | "lg";
};

export function Badge({
  className,
  variant = "default",
  size = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border font-semibold transition-colors",
        variant === "default" && "border-transparent bg-zen-crimson text-white",
        variant === "outline" && "border-zen-sand bg-white text-zen-espresso",
        size === "default" && "px-2.5 py-0.5 text-xs",
        size === "lg" && "px-3 py-1 text-sm",
        className,
      )}
      {...props}
    />
  );
}
