import { Slot } from "@radix-ui/react-slot";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300",
          size === "icon" ? "h-10 w-10 p-0" : "px-5 py-3",
          variant === "default" && "bg-[#2f2a25] text-[#f8efe7] hover:bg-[#453b34]",
          variant === "outline" && "border border-[#2f2a25]/20 bg-transparent text-[#2f2a25] hover:bg-[#f4e8dd]",
          variant === "ghost" && "bg-transparent text-[#2f2a25] hover:bg-[#f4e8dd]",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
