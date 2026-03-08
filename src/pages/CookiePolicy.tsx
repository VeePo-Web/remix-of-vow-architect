import { PolicyLayout } from "@/components/PolicyLayout";
import { PolicySection } from "@/components/PolicySection";
import { PolicyTable } from "@/components/PolicyTable";

export default function CookiePolicy() {
  const cookieTypes = [
    {
      label: "Essential cookies",
      value: "Basic site functionality and security.",
    },
    {
      label: "Analytics cookies",
      value: "Anonymous page views, time on page, popular content.",
    },
    {
      label: "Advertising/retargeting (optional)",
      value: "Only if enabled for campaigns—shown as anonymized performance signals.",
    },
  ];

  return (
    <PolicyLayout
      title="Cookie Policy"
      lastUpdated="November 28, 2025"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Legal", path: "/legal" },
        { label: "Cookies", path: "/cookie-policy" },
      ]}
    >
      <PolicySection title="What Cookies Are">
        <p>
          Cookies are small files used to keep the site reliable and improve content.
        </p>
      </PolicySection>

      <PolicySection title="What I Use">
        <PolicyTable data={cookieTypes} />
      </PolicySection>

      <PolicySection title="How Long They Last">
        <p>
          Some expire when you close your browser (session); others remain for a set period (persistent).
        </p>
      </PolicySection>

      <PolicySection title="Your Choices">
        <p>
          You can block or delete cookies in your browser settings. Essential cookies are required for 
          basic function; disabling others won't block access, but may reduce performance.
        </p>
      </PolicySection>

      <PolicySection title="More Info">
        <p>
          Questions? Email{" "}
          <a href="mailto:parker@parkergawryletz.com" className="text-primary hover:text-primary/80">
            parker@parkergawryletz.com
          </a>{" "}
          with "Cookie Policy".
        </p>
      </PolicySection>
    </PolicyLayout>
  );
}
