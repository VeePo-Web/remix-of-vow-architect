import { PolicyLayout } from "@/components/PolicyLayout";
import { PolicySection } from "@/components/PolicySection";
import { PolicyHighlightBox } from "@/components/PolicyHighlightBox";

export default function Terms() {
  return (
    <PolicyLayout
      title="Terms & Conditions"
      lastUpdated="November 28, 2025"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Legal", path: "/legal" },
        { label: "Terms", path: "/terms" },
      ]}
    >
      <PolicySection title="Introduction & Agreement">
        <p>
          By using this website or submitting a booking inquiry, you agree to these terms. Formal bookings 
          are governed by a separate written contract I provide. If there's any conflict, the signed contract 
          controls.
        </p>
      </PolicySection>

      <PolicySection title="Services Overview">
        <p>
          I provide wedding ceremony piano and ceremony-audio direction, including Banff Mode™ 
          (acoustic-only protocol for no-PA venues). Service area: Calgary, Cochrane, Canmore, Banff. 
          Availability is not guaranteed until confirmed in writing.
        </p>
      </PolicySection>

      <PolicySection title="Bookings & Contracts">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            A date becomes confirmed when we both sign the contract and the 50% deposit is received 
            (typically within 5 business days of signature).
          </li>
          <li>
            <strong>Balance due:</strong> 14 days before the event.
          </li>
          <li>
            You'll receive a written ceremony-audio plan within 24 hours of booking.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="Payments, Fees & Taxes">
        <ul className="list-disc pl-6 space-y-2">
          <li>Prices in CAD, subject to GST.</li>
          <li>Accepted methods: Interac e-Transfer and other methods listed on your invoice.</li>
          <li>Travel or venue-specific fees (if applicable) will be stated upfront.</li>
          <li>Late payment or change fees follow the schedule in your contract.</li>
        </ul>
      </PolicySection>

      <PolicySection title="Cancellations, Refunds & Force Majeure">
        <ul className="list-disc pl-6 space-y-2">
          <li>14-day full refund window on deposits. After that, credits or scaled refunds follow the contract schedule.</li>
          <li>
            <strong>Force majeure</strong> (e.g., severe weather, government orders): I'll work with you to 
            postpone within 12 months where possible; otherwise, contract terms apply.
          </li>
          <li>
            Learning fees and prepaid travel may be non-refundable after certain milestones (see contract).
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="Client Responsibilities">
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide accurate date, time, venue and a day-of contact.</li>
          <li>Ensure access/parking, and a covered setup area where required.</li>
          <li>
            <strong>Power:</strong> Many ceremonies run on my silent battery. For venues requiring mains 
            power (e.g., some indoor setups), please provide 110V/15A within ~25 ft.
          </li>
          <li>
            <strong>Banff Mode:</strong> At no-PA sites, I perform acoustic-only and coordinate proximity 
            seating.
          </li>
          <li>Follow venue and local regulations; I'll support with documentation.</li>
        </ul>
      </PolicySection>

      <PolicySection title="Limitations of Liability">
        <p>
          I carry $2M professional and $2M general liability and $25k equipment coverage. Overall liability 
          is limited as described in your contract. I am not liable for indirect or consequential damages 
          except as required by law.
        </p>
      </PolicySection>

      <PolicySection title="Intellectual Property">
        <p>
          Site content, branding, PDFs, videos, logs, and templates are my intellectual property. You may 
          not republish or resell without permission. (Planners may share provided templates with their 
          clients.)
        </p>
      </PolicySection>

      <PolicySection title="Third-Party Links">
        <p>
          I sometimes link to external sites (e.g., Parks Canada). I'm not responsible for their content 
          or policies.
        </p>
      </PolicySection>

      <PolicySection title="Governing Law & Disputes">
        <p>
          These terms are governed by the laws of Alberta, Canada. We agree to attempt mediation before 
          litigation.
        </p>
      </PolicySection>

      <PolicySection title="Changes to Terms">
        <p>
          I may update these terms; continued use of the site signifies acceptance.
        </p>
      </PolicySection>

      <PolicyHighlightBox variant="warning">
        <p>
          <strong>Not legal advice:</strong> Have your counsel review your specific contract language.
        </p>
      </PolicyHighlightBox>
    </PolicyLayout>
  );
}
