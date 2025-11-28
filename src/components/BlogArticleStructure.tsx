import { CheckCircle2 } from "lucide-react";

const structurePoints = [
  {
    title: "Lead-in (real fear, solved)",
    description: "I start with the ceremony risk couples actually face.",
  },
  {
    title: "Tactical How-To",
    description: "Clear, numbered steps you can implement today.",
  },
  {
    title: "Visual Support",
    description: "Photos, diagrams, or SPL snippets—so you can see clarity.",
  },
  {
    title: "Planner Tip / Checklist",
    description: "A box titled 'How Parker Handles This' with crosslinks.",
  },
  {
    title: "Wrap & CTA",
    description: "One next step—Download, Hold My Date, or Contact.",
  },
];

export function BlogArticleStructure() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Inside every guide you'll find:
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Result: you leave each article with a plan—not more questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {structurePoints.map((point, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-border/40 bg-card animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <CheckCircle2 className="text-primary mb-4" size={24} />
              <h3 className="font-semibold mb-2 text-sm">{point.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
