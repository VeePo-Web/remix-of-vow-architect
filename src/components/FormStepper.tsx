interface FormStepperProps {
  currentStep: 1 | 2;
}

export function FormStepper({ currentStep }: FormStepperProps) {
  return (
    <div
      className="flex items-center justify-center gap-3 mb-6"
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={2}
      aria-label={`Step ${currentStep} of 2`}
    >
      <span className="font-display text-sm tracking-wide">
        <span
          className="font-light"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--vow-yellow)), hsl(var(--vow-yellow) / 0.5))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {currentStep}
        </span>
        <span className="text-muted-foreground/40 mx-1.5">/</span>
        <span className="text-muted-foreground/30">2</span>
      </span>
      <span
        className="w-px h-3"
        style={{ background: "hsl(var(--border) / 0.2)" }}
        aria-hidden="true"
      />
      <span className="text-xs text-muted-foreground/40 font-light">
        14-day full refund on deposit
      </span>
    </div>
  );
}
