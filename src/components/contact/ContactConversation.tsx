import { useEffect, useRef, useState } from "react";
import { Pencil, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useKeyboardOffset } from "@/hooks/useKeyboardOffset";
import contactHeroImg from "@/assets/contact-hero.jpg";
import eventsPerformerBw from "@/assets/events-performer-bw.webp";
import eventsStageWarmlight from "@/assets/events-stage-warmlight.webp";

type Vertical = "weddings" | "events" | "teaching";
type StepKey = string;

interface StepDef {
  key: StepKey;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "textarea";
  required?: boolean;
  autoComplete?: string;
  hint?: string;
}

interface VerticalCfg {
  heroImg: string;
  strapEyebrow: string;
  strapMeta: string;
  headline: string;
  subhead: string;
  ctaLabel: string;
  draftKey: string;
  steps: StepDef[];
  /** First key is the message body; the rest are appended as labeled lines. */
  messageKeys: StepKey[];
}

const RATE_KEY = "vow:contact:lastSent";
const RATE_MS = 60_000;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VERTICALS: Record<Vertical, VerticalCfg> = {
  weddings: {
    heroImg: contactHeroImg,
    strapEyebrow: "Wedding Piano",
    strapMeta: "Canmore · Alberta",
    headline: "What deserves the song?",
    subhead: "Tell me one thing at a time.",
    ctaLabel: "Reserve my date",
    draftKey: "vow:contact:draft:weddings",
    messageKeys: ["ceremony", "date", "venue"],
    steps: [
      { key: "name", label: "Your name", placeholder: "First and last", required: true, autoComplete: "name" },
      { key: "email", label: "Email", placeholder: "you@email.com", type: "email", required: true, autoComplete: "email", hint: "Never shared. Never spammed." },
      { key: "ceremony", label: "Your ceremony", placeholder: "A few words is plenty.", type: "textarea", required: true, hint: "The feeling, the moment, the song that means everything." },
      { key: "date", label: "Date", placeholder: "Month, year — or a season" },
      { key: "venue", label: "Venue", placeholder: "Where it's happening" },
    ],
  },
  events: {
    heroImg: eventsPerformerBw,
    strapEyebrow: "Events Piano",
    strapMeta: "Calgary · Alberta",
    headline: "What's the occasion?",
    subhead: "Tell me one thing at a time.",
    ctaLabel: "Begin the conversation",
    draftKey: "vow:contact:draft:events",
    messageKeys: ["occasion", "date", "venue", "guests"],
    steps: [
      { key: "name", label: "Your name", placeholder: "First and last", required: true, autoComplete: "name" },
      { key: "email", label: "Email", placeholder: "you@email.com", type: "email", required: true, autoComplete: "email", hint: "Never shared. Never spammed." },
      { key: "occasion", label: "The gathering", placeholder: "Corporate evening, gala, private party — and the energy you want.", type: "textarea", required: true, hint: "Occasion, atmosphere, anything that sets the tone." },
      { key: "date", label: "Date", placeholder: "Month, year — or a season" },
      { key: "venue", label: "Venue / room", placeholder: "Where it's happening" },
      { key: "guests", label: "Guests", placeholder: "Approximate count" },
    ],
  },
  teaching: {
    heroImg: eventsStageWarmlight,
    strapEyebrow: "Piano Mentorship",
    strapMeta: "Calgary · Online",
    headline: "What pulled you to the piano?",
    subhead: "Tell me one thing at a time.",
    ctaLabel: "Begin the conversation",
    draftKey: "vow:contact:draft:teaching",
    messageKeys: ["context", "level", "goal"],
    steps: [
      { key: "name", label: "Your name", placeholder: "First and last", required: true, autoComplete: "name" },
      { key: "email", label: "Email", placeholder: "you@email.com", type: "email", required: true, autoComplete: "email", hint: "Never shared. Never spammed." },
      { key: "context", label: "Where you are", placeholder: "A song you love, a goal you have, or just curiosity.", type: "textarea", required: true, hint: "Concrete is best — anything you'd tell a friend." },
      { key: "level", label: "Level", placeholder: "New, returning, or somewhere between" },
      { key: "goal", label: "Goal", placeholder: "What you want to be playing in a year" },
    ],
  },
};

interface Props {
  vertical: Vertical;
  onSubmitted: () => void;
}

export function ContactConversation({ vertical, onSubmitted }: Props) {
  const cfg = VERTICALS[vertical];
  const STEP_ORDER = cfg.steps.map((s) => s.key);
  const stepByKey = (k: StepKey) => cfg.steps.find((s) => s.key === k)!;
  const isRequired = (k: StepKey) => !!stepByKey(k).required;
  const EMPTY: Record<string, string> = Object.fromEntries(STEP_ORDER.map((k) => [k, ""]));

  const [state, setState] = useState<Record<string, string>>(EMPTY);
  const [active, setActive] = useState<StepKey>(STEP_ORDER[0]);
  const [shake, setShake] = useState<StepKey | null>(null);
  const [emailOk, setEmailOk] = useState(false);
  const [sending, setSending] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const keyboardOffset = useKeyboardOffset();

  // Restore draft
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(cfg.draftKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, string>;
        setState((s) => ({ ...s, ...parsed }));
        const firstEmpty = STEP_ORDER.find((k) => !parsed?.[k]);
        if (firstEmpty) setActive(firstEmpty);
      }
    } catch {
      /* noop */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cfg.draftKey]);

  // Persist draft
  useEffect(() => {
    try {
      sessionStorage.setItem(cfg.draftKey, JSON.stringify(state));
    } catch {
      /* noop */
    }
  }, [state, cfg.draftKey]);

  // Focus active input on step change
  useEffect(() => {
    const id = window.setTimeout(() => {
      inputRef.current?.focus({ preventScroll: false });
      inputRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 240);
    return () => window.clearTimeout(id);
  }, [active]);

  const set = (k: StepKey, v: string) => setState((s) => ({ ...s, [k]: v }));

  const stepValid = (k: StepKey): boolean => {
    const v = (state[k] ?? "").trim();
    if (!isRequired(k)) return true;
    const def = stepByKey(k);
    if (def.type === "email") return emailRe.test(v);
    return v.length >= 2;
  };

  const advance = () => {
    if (!stepValid(active)) {
      setShake(active);
      window.setTimeout(() => setShake(null), 400);
      return;
    }
    const idx = STEP_ORDER.indexOf(active);
    const next = STEP_ORDER[idx + 1];
    if (next) setActive(next);
    else inputRef.current?.blur();
  };

  const requiredKeys = STEP_ORDER.filter(isRequired);
  const allRequiredFilled = requiredKeys.every(stepValid);

  const submit = async () => {
    if (honeypot) return; // bot
    if (!allRequiredFilled) {
      const firstBad = requiredKeys.find((k) => !stepValid(k));
      if (firstBad) setActive(firstBad);
      return;
    }
    try {
      const last = Number(localStorage.getItem(RATE_KEY) ?? 0);
      if (Date.now() - last < RATE_MS) {
        toast({
          title: "Just a moment",
          description: "I already received your note — it's on its way.",
        });
        return;
      }
    } catch {
      /* noop */
    }
    setSending(true);
    const [bodyKey, ...extraKeys] = cfg.messageKeys;
    const lines: string[] = [];
    if (bodyKey && state[bodyKey]) lines.push(state[bodyKey].trim());
    for (const k of extraKeys) {
      const v = (state[k] ?? "").trim();
      if (v) lines.push(`${stepByKey(k).label}: ${v}`);
    }
    const message = lines.join("\n\n");
    const { error } = await supabase.functions.invoke("send-contact-email", {
      body: {
        name: state.name ?? "",
        email: state.email ?? "",
        message,
        vertical,
      },
    });
    setSending(false);
    if (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or email parker@veepo.ca directly.",
        variant: "destructive",
      });
      return;
    }
    try {
      localStorage.setItem(RATE_KEY, String(Date.now()));
      sessionStorage.removeItem(cfg.draftKey);
    } catch {
      /* noop */
    }
    onSubmitted();
  };

  const activeDef = stepByKey(active);
  const isLast = STEP_ORDER.indexOf(active) === STEP_ORDER.length - 1;

  return (
    <div
      className="cv-wrap"
      style={{ paddingBottom: `calc(${keyboardOffset}px + 140px)` }}
    >
      {/* Header strap */}
      <div className="cv-strap">
        <img src={cfg.heroImg} alt="" aria-hidden="true" />
        <div className="cv-strap__veil" aria-hidden="true" />
        <div className="cv-strap__inner">
          <span className="cv-strap__eyebrow">{cfg.strapEyebrow}</span>
          <span className="cv-strap__meta">{cfg.strapMeta}</span>
        </div>
      </div>

      {/* Headline */}
      <div className="cv-head">
        <h1 className="cv-head__h1">{cfg.headline}</h1>
        <p className="cv-head__sub">{cfg.subhead}</p>
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="cv-honey">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <form
        className="cv-form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        {/* Completed summaries (in order, above active) */}
        {STEP_ORDER.map((k) => {
          if (k === active) return null;
          const v = (state[k] ?? "").trim();
          if (!v) return null;
          if (STEP_ORDER.indexOf(k) > STEP_ORDER.indexOf(active)) return null;
          return (
            <button
              key={`s-${k}`}
              type="button"
              onClick={() => setActive(k)}
              className="cv-summary"
              aria-label={`Edit ${stepByKey(k).label}, ${v}`}
            >
              <span className="cv-summary__label">{stepByKey(k).label}</span>
              <span className="cv-summary__value">{v}</span>
              <Pencil className="cv-summary__icon" size={13} strokeWidth={1.5} />
            </button>
          );
        })}

        {/* Active field */}
        <div
          key={`a-${active}`}
          className={`cv-active ${shake === active ? "cv-shake" : ""}`}
        >
          <label htmlFor={`cv-${active}`} className="cv-active__label">
            {activeDef.label}
            {!isRequired(active) && (
              <span className="cv-active__opt"> (optional)</span>
            )}
          </label>

          {activeDef.type === "textarea" ? (
            <textarea
              id={`cv-${active}`}
              ref={(el) => {
                inputRef.current = el;
              }}
              rows={3}
              className="cv-active__input cv-active__textarea"
              placeholder={activeDef.placeholder}
              value={state[active] ?? ""}
              onChange={(e) => set(active, e.target.value)}
              autoCapitalize="sentences"
            />
          ) : (
            <input
              id={`cv-${active}`}
              ref={(el) => {
                inputRef.current = el;
              }}
              type={activeDef.type === "email" ? "email" : "text"}
              inputMode={activeDef.type === "email" ? "email" : "text"}
              autoComplete={activeDef.autoComplete ?? "off"}
              autoCapitalize={activeDef.type === "email" ? "none" : "words"}
              autoCorrect={activeDef.type === "email" ? "off" : "on"}
              spellCheck={activeDef.type !== "email"}
              className="cv-active__input"
              placeholder={activeDef.placeholder}
              value={state[active] ?? ""}
              onChange={(e) => set(active, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  advance();
                }
              }}
              onBlur={() => {
                if (activeDef.type === "email" && emailRe.test(state[active] ?? "")) {
                  setEmailOk(true);
                }
              }}
            />
          )}

          <div className="cv-active__hint">
            {activeDef.type === "email" && emailOk
              ? "Looks right ✓"
              : activeDef.hint
                ? activeDef.hint
                : !isRequired(active)
                  ? "Skip if you don't know yet."
                  : "\u00a0"}
          </div>

          <div className="cv-active__row">
            <button
              type="button"
              onClick={advance}
              className="cv-next"
              aria-label={isLast ? "Done" : "Continue"}
            >
              <span>{isLast ? "Done" : "Continue"}</span>
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>

            {!isRequired(active) && !(state[active] ?? "") && (
              <button
                type="button"
                onClick={() => {
                  const idx = STEP_ORDER.indexOf(active);
                  const next = STEP_ORDER[idx + 1];
                  if (next) setActive(next);
                  else inputRef.current?.blur();
                }}
                className="cv-skip"
              >
                Skip
              </button>
            )}
          </div>
        </div>

        {/* Upcoming */}
        <div className="cv-upcoming">
          {STEP_ORDER.map((k) => {
            if (k === active) return null;
            if ((state[k] ?? "").trim()) return null;
            if (STEP_ORDER.indexOf(k) < STEP_ORDER.indexOf(active)) return null;
            return (
              <button
                key={`u-${k}`}
                type="button"
                onClick={() => setActive(k)}
                className="cv-upcoming__row"
              >
                {stepByKey(k).label}
                {!isRequired(k) && (
                  <span className="cv-upcoming__opt"> · optional</span>
                )}
              </button>
            );
          })}
        </div>
      </form>

      {/* Sticky submit */}
      <div
        className={`cv-sticky ${allRequiredFilled ? "is-ready" : ""}`}
        style={{
          transform:
            keyboardOffset > 0
              ? `translateY(${keyboardOffset}px)`
              : "translateY(0)",
        }}
      >
        <div className="cv-sticky__inner">
          <p className="cv-sticky__re">I respond within 24 hours.</p>
          <button
            type="button"
            onClick={submit}
            disabled={!allRequiredFilled || sending}
            aria-disabled={!allRequiredFilled || sending}
            className="cv-sticky__cta"
          >
            {sending ? "Sending…" : cfg.ctaLabel}
            {!sending && <ArrowRight size={15} strokeWidth={1.5} />}
          </button>
        </div>
      </div>
    </div>
  );
}