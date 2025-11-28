import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileBarChart, FileText, CheckSquare, Video, Download, Package } from "lucide-react";

const downloads = [
  {
    icon: FileBarChart,
    title: "Sample SPL Log",
    use: "Show how audibility is measured at Prelude / Vows / Recessional.",
    bonus: "Includes a distance-to-audibility chart you can hand to your planner.",
    format: "PDF",
    pages: "3 pages",
    altText: "Wedding ceremony SPL example with dBA readings at three key moments.",
  },
  {
    icon: FileText,
    title: "Ceremony Cue Sheet Template",
    use: "Coordinate entrances, timing, officiant cues, and transitions.",
    bonus: "Editable with time-coded rows for precision coordination.",
    format: "DOCX",
    pages: "Google Docs / Word",
    altText: "Editable wedding cue sheet with time-based processional and vows marks.",
  },
  {
    icon: CheckSquare,
    title: "Banff Mode™ Checklist",
    use: "Confirm acoustic-only compliance at Parks Canada / no-PA venues.",
    bonus: "Links to relevant venue policies where publicly available.",
    format: "PDF",
    pages: "1 page",
    altText: "Banff acoustic ceremony compliance checklist—no PA, no generator.",
  },
  {
    icon: Video,
    title: "Pre-Ceremony Sound Test Video",
    use: "See how I baseline ambient noise, run a wind test, and validate intelligibility.",
    bonus: "Quick note on rain moves and Plan B placement.",
    format: "Video",
    pages: "4 min",
    altText: "Video of pre-ceremony SPL meter test and outdoor mic setup.",
  },
];

export function ResourcesFeaturedDownloads() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {downloads.map((download, index) => {
          const Icon = download.icon;
          return (
            <Card
              key={index}
              className="card-keyline hover:shadow-xl transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {download.format}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {download.pages}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">{download.title}</CardTitle>
                <CardDescription className="text-sm mb-3">
                  <strong>Use:</strong> {download.use}
                </CardDescription>
                <p className="text-xs text-muted-foreground">
                  <strong>Bonus:</strong> {download.bonus}
                </p>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full hover-scale group">
                  <Download size={16} className="mr-2 transition-transform group-hover:translate-y-0.5" />
                  Download {download.format === "Video" ? "video" : download.format}
                </Button>
                <span className="sr-only">{download.altText}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="card-keyline bg-primary/5 border-primary/20 animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Package className="text-primary" size={20} />
            </div>
            <CardTitle className="text-xl">Complete Ceremony-Audio Toolkit</CardTitle>
          </div>
          <CardDescription className="text-base">
            Download all four resources in one ZIP file—perfect for planners who need everything organized.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="lg" className="hover-scale">
            <Download size={18} className="mr-2" />
            Download complete toolkit (ZIP)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
