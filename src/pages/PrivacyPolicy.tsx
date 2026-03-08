import { PolicyLayout } from "@/components/PolicyLayout";
import { PolicySection } from "@/components/PolicySection";
import { PolicyHighlightBox } from "@/components/PolicyHighlightBox";

export default function PrivacyPolicy() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      lastUpdated="November 28, 2025"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Legal", path: "/legal" },
        { label: "Privacy", path: "/privacy-policy" },
      ]}
    >
      <PolicySection title="Who I Am">
        <p>
          I'm Parker Gawryletz, Sound Director. 
          I serve Calgary, Cochrane, Canmore, and Banff.
        </p>
        <p>
          Contact: <a href="mailto:parker@parkergawryletz.com" className="text-primary hover:text-primary/80 transition-colors duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-sm">parker@parkergawryletz.com</a> • <a href="tel:+14038308930" className="text-primary hover:text-primary/80 transition-colors duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-sm">+1-403-830-8930</a>
        </p>
      </PolicySection>

      <PolicySection title="Plain-Language Summary">
        <PolicyHighlightBox variant="info">
          <p>
            You share details so I can design your ceremony-audio plan. I use that information to deliver 
            exactly what you asked for, keep proper records, and improve the experience. I don't sell 
            personal data—ever.
          </p>
        </PolicyHighlightBox>
      </PolicySection>

      <PolicySection title="What I Collect (wedding-specific)">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Contact details:</strong> name, email, phone.
          </li>
          <li>
            <strong>Event details:</strong> date, venue, ceremony type, guest count (to tune audibility, 
            seating arc, and cue timing).
          </li>
          <li>
            <strong>Files you upload:</strong> cue sheets, song requests, run-of-show PDFs, photos/audio 
            for planning.
          </li>
          <li>
            <strong>Payment/admin data:</strong> invoices, payment confirmations, signed agreements 
            (retained for 7 years for tax/compliance).
          </li>
          <li>
            <strong>Technical data:</strong> cookies/analytics such as IP, device, pages visited 
            (see Cookie Policy).
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="How I Use Your Data">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            To prepare and deliver your ceremony-audio plan (SPL overview, mic/power notes, cue integration).
          </li>
          <li>
            To coordinate bookings, timeline changes, weather moves, and coordinator communication.
          </li>
          <li>
            To send resources (templates/checklists) if you opt in.
          </li>
          <li>
            To meet legal obligations including record retention.
          </li>
        </ul>
        <PolicyHighlightBox variant="success">
          <p>I do not sell your personal data.</p>
        </PolicyHighlightBox>
      </PolicySection>

      <PolicySection title="Legal Basis (plain English)">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Consent:</strong> when you submit forms or opt in to resources.
          </li>
          <li>
            <strong>Contract:</strong> to provide the services you ask me to perform.
          </li>
          <li>
            <strong>Legitimate Interests / Legal Obligation:</strong> to secure systems, prevent fraud, 
            and maintain proper records.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="Sharing & Third Parties (categories)">
        <ul className="list-disc pl-6 space-y-2">
          <li>Email/calendar & file delivery tools (to send plans and PDFs).</li>
          <li>Payment/invoicing services (to process deposits/balances).</li>
          <li>Analytics (to understand site performance).</li>
        </ul>
        <p>
          I share only what's necessary to operate the service—and never sell your info. Some providers 
          may process data outside Canada.
        </p>
      </PolicySection>

      <PolicySection title="Retention">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Contracts, invoices, and payment records:</strong> 7 years (tax/compliance).
          </li>
          <li>
            <strong>Planning emails and plans:</strong> typically retained up to 3 years after your event 
            to support you/your planner, unless you request deletion earlier (where legally permitted).
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="Cookies & Tracking">
        <p>
          I use essential cookies for site function and analytics cookies to improve content. See{" "}
          <a href="/cookie-policy" className="text-primary hover:text-primary/80 transition-colors duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-sm">
            /cookie-policy
          </a>{" "}
          for details and opt-out options.
        </p>
      </PolicySection>

      <PolicySection title="Your Rights">
        <p>
          Where applicable, you may access, correct, or request deletion of your data. Email{" "}
          <a href="mailto:parker@parkergawryletz.com" className="text-primary hover:text-primary/80">
            parker@parkergawryletz.com
          </a>{" "}
          with the subject "Privacy Request."
        </p>
      </PolicySection>

      <PolicySection title="Security">
        <p>
          I use industry-standard safeguards, limited access, and encryption in transit. No system is 
          perfect, so I avoid over-promising and work to continuously improve.
        </p>
      </PolicySection>

      <PolicySection title="Updates">
        <p>
          I may update this policy and will revise the date above. Please review changes periodically.
        </p>
      </PolicySection>

      <PolicyHighlightBox variant="warning">
        <p>
          <strong>Note:</strong> This page is informational and not legal advice. If you have specific 
          legal questions, consult a privacy professional familiar with PIPEDA and applicable provincial laws.
        </p>
      </PolicyHighlightBox>
    </PolicyLayout>
  );
}
