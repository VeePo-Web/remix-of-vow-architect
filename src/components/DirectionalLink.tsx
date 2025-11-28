import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface DirectionalLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export function DirectionalLink({ to, children, className = "" }: DirectionalLinkProps) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-all duration-120 group ${className}`}
    >
      <span>{children}</span>
      <ChevronRight 
        size={12} 
        className="transition-transform duration-120 group-hover:translate-x-0.5 focus-visible:ring-2 focus-visible:ring-primary/70" 
      />
    </Link>
  );
}
