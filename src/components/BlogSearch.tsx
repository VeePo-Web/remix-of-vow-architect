import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const filterCategories = [
  "Parks Canada Venues",
  "SPL / Sound Compliance",
  "Ceremony Song Ideas",
  "Tech Setup Guides",
];

export function BlogSearch() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <Input
          type="search"
          placeholder="Search by topic, venue, or keyword…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 bg-card border-border/40"
        />
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {filterCategories.map((filter) => (
          <Badge
            key={filter}
            variant={activeFilters.includes(filter) ? "default" : "outline"}
            className={`cursor-pointer transition-all hover-scale ${
              activeFilters.includes(filter)
                ? "bg-primary/10 text-primary border-primary/30"
                : "bg-card border-border/40 text-muted-foreground hover:bg-primary/5 hover:border-primary/20"
            }`}
            onClick={() => toggleFilter(filter)}
          >
            {filter}
          </Badge>
        ))}
      </div>

      <p className="text-xs text-center text-muted-foreground">
        New guides every month. No fluff—just actionable clarity.
      </p>
    </div>
  );
}
