import { Piano, Mic, Battery, Clock, FileCheck, Activity } from "lucide-react";
import { SetupTimeline } from "./SetupTimeline";

const kitItems = [
  { icon: Piano, label: "88-key digital grand + venue-piano fallback" },
  { icon: Mic, label: "Wireless lav mic + live mixing pack" },
  { icon: Battery, label: "Redundant battery amp + backup keyboard" },
  { icon: Clock, label: "≥60-minute pre-call setup window" },
  { icon: FileCheck, label: "Run-of-show PDF, co-signed" },
  { icon: Activity, label: "SPL log recorded & delivered post-event" },
];

export function SoundDirectorSection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Not a musician—your Ceremony Sound Director™.
        </h2>

        <p className="lead text-center mb-16 max-w-4xl mx-auto">
          What if your pianist <strong>co-authored your cue sheet</strong>, ran <strong>mic tests</strong> with your officiant, and <strong>showed up an hour early with backups</strong>? That's not a "musician." That's a <strong>sound director</strong>—and that's what I do.
        </p>

        <h3 className="text-2xl font-bold text-center mb-8">My standard kit</h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 stagger-fade">
          {kitItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-lg bg-card/50 border border-border/50"
            >
              <item.icon size={24} className="text-primary shrink-0" />
              <span className="text-sm font-medium leading-relaxed">{item.label}</span>
            </div>
          ))}
        </div>

        <SetupTimeline />
      </div>
    </section>
  );
}
