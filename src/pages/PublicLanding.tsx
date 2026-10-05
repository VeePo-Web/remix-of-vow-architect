import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Check, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PublicHeader } from "@/components/public/PublicHeader";
import { supabase } from "@/integrations/supabase/client";
import heroImageAsset from "@/assets/archive-first-piano.jpg.asset.json";

const heroImage = heroImageAsset.url;

export const PUBLIC_SERVICES = ["weddings", "events", "teaching"] as const;
type Service = (typeof PUBLIC_SERVICES)[number];

const SERVICE_COPY: Record<Service, { label: string; note: string; message: string }> = {
  weddings: { label: "Weddings", note: "Ceremony piano & sound", message: "Tell me about the date, venue, and atmosphere you have in mind." },
  events: { label: "Events", note: "Private & corporate gatherings", message: "Tell me about the room, occasion, date, and the energy you want." },
  teaching: { label: "Teaching", note: "Personal piano mentorship", message: "Tell me what you want to play, or what has brought you back to the piano." },
};

export default function PublicLanding() {
  const [service, setService] = useState<Service | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    document.title = "Gawryletz Music Services | Pianist in Cochrane & Calgary";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Live piano for weddings and events, plus personal piano teaching in Cochrane, Calgary, Canmore and Banff. Start a conversation with Gawryletz Music Services.");
  }, []);

  const chooseService = (next: Service) => {
    setService(next);
    setStatus("idle");
    setError("");
    requestAnimationFrame(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!service) return;
    const form = new FormData(event.currentTarget);
    if (String(form.get("website") || "")) return;
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    const date = String(form.get("date") || "").trim();
    const venue = String(form.get("venue") || "").trim();
    if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || message.length < 8) {
      setError("Please add your name, a valid email, and a few words about what you have in mind.");
      return;
    }
    setStatus("sending");
    setError("");
    const { error: submitError } = await supabase.functions.invoke("send-contact-email", {
      body: { name, email, message, vertical: service, date, venue },
    });
    if (submitError) {
      setStatus("error");
      setError("That did not send. Please try once more, or email parker@veepo.ca directly.");
      return;
    }
    setStatus("sent");
  };

  return (
    <div className="public-site">
      <PublicHeader />
      <main id="main-content">
        <section className="public-hero" aria-labelledby="public-title">
          <img className="public-hero__image" src={heroImage} alt="Parker as a young child, seated at his first piano" />
          <p className="public-hero__caption">Parker, age five — where it all began.</p>
          <div className="public-hero__veil" aria-hidden="true" />
          <div className="public-hero__content">
            <p className="public-kicker">Pianist · Cochrane, Alberta</p>
            <h1 id="public-title">Music for the moments<br />that stay with you.</h1>
            <p className="public-hero__lede">Weddings, events, and one-to-one piano teaching across Cochrane, Calgary, Canmore, and Banff.</p>
            <a className="public-scroll-link" href="#inquiry">Begin a conversation <ArrowDown aria-hidden="true" /></a>
          </div>
          <Link to="/gallery" className="public-hero__gallery">View the gallery <ArrowRight aria-hidden="true" /></Link>
        </section>

        <section id="inquiry" className="public-inquiry" aria-labelledby="inquiry-title">
          <div className="public-inquiry__intro">
            <p className="public-kicker">Start here</p>
            <h2 id="inquiry-title">What are you planning?</h2>
            <p>Choose the path that fits. Parker reads and responds to every message personally.</p>
          </div>

          <div className="public-service-grid" role="group" aria-label="Choose an inquiry type">
            {PUBLIC_SERVICES.map((item, index) => (
              <Button
                key={item}
                type="button"
                variant="ghost-light"
                aria-pressed={service === item}
                className="public-service"
                onClick={() => chooseService(item)}
              >
                <span className="public-service__number">0{index + 1}</span>
                <span className="public-service__copy"><strong>{SERVICE_COPY[item].label}</strong><small>{SERVICE_COPY[item].note}</small></span>
                <ArrowRight aria-hidden="true" />
              </Button>
            ))}
          </div>

          <div className={`public-form-wrap ${service ? "is-open" : ""}`} aria-hidden={!service}>
            {service && status !== "sent" && (
              <form ref={formRef} className="public-form" onSubmit={submit} noValidate>
                <div className="public-form__heading">
                  <p className="public-kicker">{SERVICE_COPY[service].label}</p>
                  <h3>Tell me what you have in mind.</h3>
                  <button type="button" onClick={() => setService(null)}>Change inquiry type</button>
                </div>
                <div className="public-form__fields">
                  <label><span>Your name</span><input name="name" autoComplete="name" required placeholder="First and last" /></label>
                  <label><span>Email address</span><input name="email" type="email" autoComplete="email" required placeholder="you@email.com" /></label>
                  {service !== "teaching" && (
                    <div className="public-form__split">
                      <label><span>Date <em>if known</em></span><input name="date" type="date" /></label>
                      <label><span>Venue <em>if known</em></span><input name="venue" placeholder="Venue or city" /></label>
                    </div>
                  )}
                  <label><span>{service === "teaching" ? "What would you love to play?" : "Tell me about it"}</span><textarea name="message" required rows={5} placeholder={SERVICE_COPY[service].message} /></label>
                  <label className="public-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
                  {error && <p className="public-form__error" role="alert">{error}</p>}
                  <Button className="public-submit" type="submit" disabled={status === "sending"}>
                    {status === "sending" ? <><LoaderCircle className="public-spinner" /> Sending</> : <>Send inquiry <ArrowRight /></>}
                  </Button>
                  <p className="public-form__reassurance">Your message goes directly to Parker and nowhere else. Expect a personal reply within 24 hours.</p>
                </div>
              </form>
            )}
            {status === "sent" && (
              <div className="public-success" role="status">
                <span><Check aria-hidden="true" /></span>
                <p className="public-kicker">Message received</p>
                <h3>Thank you. Parker will be in touch within 24 hours.</h3>
                <Link to="/gallery">While you wait, view the gallery <ArrowRight aria-hidden="true" /></Link>
              </div>
            )}
          </div>
        </section>

        <footer className="public-footer">
          <p>Gawryletz Music Services</p>
          <a href="mailto:parker@veepo.ca">parker@veepo.ca</a>
          <p>Cochrane · Calgary · The Bow Valley</p>
        </footer>
      </main>
    </div>
  );
}