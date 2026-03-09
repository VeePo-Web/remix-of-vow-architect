import { Button } from "@/components/ui/button";

export function FormSuccess() {
  const handleAddToCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Parker Gawryletz Ceremony Audio//EN
BEGIN:VEVENT
SUMMARY:Follow up on ceremony audio inquiry
DTSTART:${new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DURATION:PT1H
DESCRIPTION:Follow up on your personalized PDF plan from Parker Gawryletz
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ceremony-audio-followup.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start gap-3 p-6 bg-accent/10 border border-accent/20 rounded-lg">
        {/* Breathing semicolon — brand threshold symbol */}
        <span
          className="font-display text-2xl font-light text-primary shrink-0 mt-0.5"
          style={{
            textShadow: "0 0 12px hsl(var(--vow-yellow) / 0.3)",
          }}
          aria-hidden="true"
        >
          ;
        </span>
        <div className="space-y-2">
          <h3 className="font-display font-medium text-foreground">
            Thanks—your request is in.
          </h3>
          <p className="text-sm text-muted-foreground">
            Your personalized PDF plan arrives within 24 hours.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleAddToCalendar}
        >
          Add reminder to calendar
        </Button>

        <a
          href="/insurance-cert.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View insurance certificate
        </a>
      </div>
    </div>
  );
}
