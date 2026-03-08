import { ReactNode } from "react";

interface PolicySectionProps {
  id?: string;
  title: string;
  children: ReactNode;
}

export function PolicySection({ id, title, children }: PolicySectionProps) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="font-display text-2xl md:text-3xl font-light mb-4">{title}</h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  );
}
