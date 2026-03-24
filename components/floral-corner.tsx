import React from 'react';
import { cn } from "@/lib/utils";

interface FloralCornerProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export function FloralCorner({ position = "top-left", className, ...props }: FloralCornerProps) {
  const positionClasses = {
    "top-left": "top-0 left-0 hover:-translate-x-1 hover:-translate-y-1",
    "top-right": "top-0 right-0 scale-x-[-1] hover:translate-x-1 hover:-translate-y-1",
    "bottom-left": "bottom-0 left-0 scale-y-[-1] hover:-translate-x-1 hover:translate-y-1",
    "bottom-right": "bottom-0 right-0 scale-x-[-1] scale-y-[-1] hover:translate-x-1 hover:translate-y-1",
  };

  return (
    <div
      className={cn(
        "absolute w-32 md:w-48 opacity-70 pointer-events-none transition-transform duration-700 ease-in-out z-10",
        positionClasses[position],
        className
      )}
      {...props}
    >
      <img 
        src="/floral-corner.png" 
        alt="Floral Corner Decoration" 
        className="w-full h-auto drop-shadow-sm"
        onError={(e) => {
          // Fallback if image not found to a simple gradient shape for visual feedback during dev
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-accent/20', 'to-transparent', 'rounded-full', 'blur-2xl', 'aspect-square');
        }}
      />
    </div>
  );
}
