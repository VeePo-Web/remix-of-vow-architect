interface FormStepperProps {
  currentStep: 1 | 2;
}

export function FormStepper({ currentStep }: FormStepperProps) {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full transition-colors ${
            currentStep === 1 ? "bg-primary" : "bg-primary/40"
          }`}
        />
        <div
          className={`w-3 h-3 rounded-full transition-colors ${
            currentStep === 2 ? "bg-primary" : "bg-[#2A2F37]"
          }`}
        />
      </div>
      <span className="text-xs text-muted-foreground">
        Step {currentStep} of 2 • 14-day full refund on deposit
      </span>
    </div>
  );
}
