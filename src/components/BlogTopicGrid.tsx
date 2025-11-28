import { Clock } from "lucide-react";

const topicGroups = [
  {
    emoji: "🎤",
    title: "Mic'ing & Audio Clarity",
    articles: [
      {
        title: "Wind-Proof Vows: Lapel vs. Handheld vs. Stand Mics",
        excerpt: "Blunt truth on what actually carries outside.",
        readTime: "6 min",
      },
      {
        title: "SPL 101 for Weddings: Numbers That Mean 'We Heard You'",
        excerpt: "Simple ranges that keep vows intelligible.",
        readTime: "5 min",
      },
    ],
  },
  {
    emoji: "🎶",
    title: "Ceremony Song Curation",
    articles: [
      {
        title: "Processional Picks That Time Perfectly—No Rushed Entrances",
        excerpt: "Tempos that match aisle length.",
        readTime: "5 min",
      },
      {
        title: "Banff-Friendly Piano: Acoustic Sets That Carry",
        excerpt: "Natural projection, no muddy low end.",
        readTime: "4 min",
      },
    ],
  },
  {
    emoji: "📜",
    title: "Planning & Timelines",
    articles: [
      {
        title: "Cue Sheet Template: Time-Based Cues, Not 'Wait for the Chorus'",
        excerpt: "Planner-friendly PDF you can copy.",
        readTime: "7 min",
      },
      {
        title: "Rain Plan in 10 Minutes: Relocate Without Panic",
        excerpt: "Pre-approved positions and pathing.",
        readTime: "5 min",
      },
    ],
  },
  {
    emoji: "🧾",
    title: "Venue Rules & Compliance",
    articles: [
      {
        title: "No-PA Sites: What 'Compliant' Really Means",
        excerpt: "How to design around restrictions.",
        readTime: "6 min",
      },
      {
        title: "Insurance, Liability & Vendor Docs—What Venues Expect",
        excerpt: "The paperwork I send for you.",
        readTime: "5 min",
      },
    ],
  },
  {
    emoji: "🧠",
    title: "Parker's Philosophy",
    articles: [
      {
        title: "Why I Log SPL: Turning 'I Hope' Into 'I Know'",
        excerpt: "Data that calms everyone down.",
        readTime: "4 min",
      },
      {
        title: "Elegance Is Quiet: Gear That Disappears",
        excerpt: "Design so attention stays on you.",
        readTime: "3 min",
      },
    ],
  },
];

export function BlogTopicGrid() {
  return (
    <div className="space-y-12">
      {topicGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl" role="img" aria-label={group.title}>
              {group.emoji}
            </span>
            <h2 className="text-xl font-semibold">{group.title}</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {group.articles.map((article, articleIndex) => (
              <div
                key={articleIndex}
                className="group p-6 rounded-lg border border-border/40 bg-card hover:bg-card/80 hover:border-primary/30 transition-all cursor-pointer hover-scale"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-grow">
                    <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock size={12} />
                      {article.readTime}
                    </div>
                  </div>
                  <button className="text-xs text-primary hover:underline whitespace-nowrap sm:mt-1">
                    View →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
