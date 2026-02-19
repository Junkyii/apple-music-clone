"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

// Since we can't install radix-ui/react-slider without npm, 
// I will provide a simple HTML input range fallback that looks similar 
// until dependencies can be installed.

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
  value?: number[];
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
}

export function Slider({ className, value, max = 100, step = 1, onValueChange, ...props }: SliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onValueChange) {
      onValueChange([parseFloat(e.target.value)]);
    }
  };

  const val = value ? value[0] : 0;

  return (
    <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
      <input
        type="range"
        min={0}
        max={max}
        step={step}
        value={val}
        onChange={handleChange}
        className="w-full h-1 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-zinc-500 dark:accent-zinc-400 hover:accent-red-500 transition-all"
      />
    </div>
  );
}
