import { Mic, Battery, FileText, Shield, Clock, Activity } from "lucide-react";

const declarations = [
  "I arrive an hour early.",
  "I test your officiant's mic.",
  "I co-sign your cue sheet.",
];

const standardKit = [
  { icon: Mic, label: "2 mics" },
  { icon: Battery, label: "Battery" },
  { icon: Activity, label: "SPL meter" },
  { icon: FileText, label: "Cue sheet" },
  { icon: Shield, label: "$4M ins." },
  { icon: Clock, label: "24h plan" },
];

export function TheWitness() {
  return (
    <section 
      className="section--surface section-padding-standard"
      style={{
        background: "linear-gradient(180deg, hsl(45 25% 96%) 0%, hsl(45 20% 93%) 100%)"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Two-Column Asymmetric Layout */}
          <div className="grid md:grid-cols-5 gap-12 items-center">
            {/* LEFT: Image Column (40%) */}
            <div className="md:col-span-2">
              <div 
                className="aspect-[3/4] rounded-lg overflow-hidden shadow-xl"
                style={{
                  background: "linear-gradient(135deg, hsl(240 12% 12%) 0%, hsl(240 9% 8%) 100%)"
                }}
              >
                {/* Placeholder for portrait image */}
                <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="12" cy="10" r="3" />
                    <path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* RIGHT: Content Column (60%) */}
            <div className="md:col-span-3">
              {/* Label */}
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
                THE WITNESS
              </p>

              {/* Headline */}
              <h2 className="text-[clamp(28px,4vw,48px)] font-[300] font-display leading-tight mb-8">
                Not a musician—<br />
                your ceremony witness.
              </h2>

              {/* Three Declarations */}
              <div className="space-y-4 mb-10">
                {declarations.map((declaration, index) => (
                  <p 
                    key={index}
                    className="text-lg font-display font-light leading-relaxed text-foreground/90"
                  >
                    {declaration}
                  </p>
                ))}
              </div>

              {/* Standard Kit - Inline Icons */}
              <div className="pt-6 border-t border-border/30">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
                  Standard Kit
                </p>
                <div className="flex flex-wrap gap-6">
                  {standardKit.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={index} 
                        className="flex items-center gap-2 group cursor-default"
                      >
                        <div className="w-8 h-8 rounded-full border border-border/30 flex items-center justify-center transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/5">
                          <Icon size={14} className="text-muted-foreground transition-colors duration-300 group-hover:text-primary" strokeWidth={1.5} />
                        </div>
                        <span className="text-sm text-foreground/70 transition-colors duration-300 group-hover:text-foreground">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
