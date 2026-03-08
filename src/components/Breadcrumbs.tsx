import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight size={10} className="text-muted-foreground/50" aria-hidden="true" />
            )}
            {item.path ? (
              <Link
                to={item.path}
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-xs font-medium text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
