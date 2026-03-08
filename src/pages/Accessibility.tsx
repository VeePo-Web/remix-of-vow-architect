import { PolicyLayout } from "@/components/PolicyLayout";
import { PolicySection } from "@/components/PolicySection";
import { PolicyHighlightBox } from "@/components/PolicyHighlightBox";

export default function Accessibility() {
  return (
    <PolicyLayout
      title="Accessibility Statement"
      lastUpdated="March 8, 2026"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Legal", path: "/legal" },
        { label: "Accessibility", path: "/accessibility" },
      ]}
    >
      <PolicySection title="Commitment">
        <p>
          I'm committed to a website experience that is accessible to as many people as possible, 
          regardless of technology or ability.
        </p>
      </PolicySection>

      <PolicySection title="What I've Implemented">
        <ul className="list-disc pl-6 space-y-2">
          <li>High color contrast and legible font sizes</li>
          <li>Keyboard navigation support and visible focus states</li>
          <li>Alt text on functional imagery</li>
          <li>Clear headings and descriptive links</li>
          <li>Avoiding color-only cues</li>
        </ul>
      </PolicySection>

      <PolicySection title="Known Limitations">
        <p>
          Complex visuals (e.g., SPL graphs) and certain PDFs may be less accessible. I provide text 
          descriptions and accessible versions on request.
        </p>
      </PolicySection>

      <PolicySection title="Need Help?">
        <PolicyHighlightBox variant="info">
          <p>
            If you experience any difficulty, email{" "}
            <a href="mailto:parker@parkergawryletz.com" className="text-primary hover:text-primary/80 transition-colors duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-sm">
              parker@parkergawryletz.com
            </a>{" "}
            or call{" "}
            <a href="tel:+14038308930" className="text-primary hover:text-primary/80 transition-colors duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-sm">
              +1-403-830-8930
            </a>
            . I'll provide an alternative format (e.g., accessible PDF, large print) within 5 business 
            days whenever feasible.
          </p>
        </PolicyHighlightBox>
      </PolicySection>
    </PolicyLayout>
  );
}
