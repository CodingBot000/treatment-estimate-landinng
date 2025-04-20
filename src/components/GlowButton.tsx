import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function GlowButton({
  children,
  onClick,
  disabled = false,
  className = "",
  type = "button"
}: GlowButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-6 h-auto rounded-xl text-lg font-medium
        ${disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-beauty-purple hover:bg-beauty-purple/90 text-white'
        }
        ${className}
      `}
    >
      {children}
    </Button>
  );
}
