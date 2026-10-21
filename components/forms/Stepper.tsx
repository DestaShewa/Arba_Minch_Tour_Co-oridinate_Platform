import React from "react";
import { cn } from "@/lib/utils";
// 5. Stepper
export interface StepperProps {
  currentStep: number;
  steps: string[];
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, steps, className }) => {
  return (
    <nav aria-label="Progress" className={cn("w-full py-4", className)}>
      <ol className="flex items-center justify-between">
        {steps.map((label, idx) => {
          const stepNumber = idx + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <li key={label} className="flex-1 flex flex-col items-center relative">
              {idx > 0 && (
                <div
                  className={cn(
                    "absolute top-4 -left-1/2 w-full h-0.5",
                    isCompleted ? "bg-primary" : "bg-sand-300"
                  )}
                />
              )}
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold relative z-10",
                  isCompleted && "bg-primary text-warmWhite",
                  isCurrent && "bg-accent text-white ring-4 ring-amber-100",
                  !isCompleted && !isCurrent && "bg-sand-200 text-charcoal-muted"
                )}
              >
                {stepNumber}
              </div>
              <span className="text-xs font-medium text-charcoal mt-2 text-center">{label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};