import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Download } from "lucide-react";

export function ResourcesFinalCTA() {
  return (
    <section className="section--dark section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6 text-ink-inverse">Your ceremony-audio plan begins with a file</h2>
          <div className="chapter-rule mx-auto mb-8" />
          
          <p className="lead text-ink-inverse/70 mb-12 max-w-2xl mx-auto">
            Downloads give you clarity. A custom plan gives you certainty. 
            Let's turn your venue, date, and vision into a fail-safe audio strategy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <Button size="lg" variant="primary-dark" className="hover-scale min-w-[240px]">
                <Calendar size={18} className="mr-2" />
                Hold my date & get a custom SPL plan
              </Button>
            </Link>
            
            <Button size="lg" variant="ghost-dark" className="hover-scale min-w-[240px]">
              <Download size={18} className="mr-2" />
              Download the SPL log sample first
            </Button>
          </div>

          <p className="text-xs text-ink-inverse/70 mt-8">
            Custom plans delivered within 24 hours • Used at 40+ Alberta venues • Logged & Insured
          </p>
        </div>
      </div>
    </section>
  );
}
