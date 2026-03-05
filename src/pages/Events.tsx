import { MinimalHeader } from "@/components/MinimalHeader";
import { Footer } from "@/components/Footer";
import {
  EventsHero,
  EventsExhale,
  EventsOccasions,
  EventsApproach,
  EventsThreshold,
  EventsExperience,
  EventsOffering,
  EventsCrossing,
} from "@/components/events";
import { usePageTheme } from "@/hooks/usePageTheme";

export default function Events() {
  usePageTheme();

  return (
    <div className="min-h-screen">
      <MinimalHeader />

      <main>
        <EventsHero />
        <EventsExhale />
        <EventsOccasions />
        <EventsApproach />
        <EventsThreshold />
        <EventsExperience />
        <EventsOffering />
        <EventsCrossing />
      </main>

      <Footer />
    </div>
  );
}
