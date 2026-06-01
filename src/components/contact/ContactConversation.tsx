import { useEffect, useRef, useState } from "react";
import { Pencil, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useKeyboardOffset } from "@/hooks/useKeyboardOffset";
import contactHeroImg from "@/assets/contact-hero.jpg";

type StepKey = "name" | "email" | "ceremony" | "date" | "venue";

const STEP_ORDER: StepKey[] = ["name", "email", "ceremony", "date", "venue"];
const REQUIRED: StepKey[] = ["name", "email", "ceremony"];

const LABELS: Record<StepKey, string> = {
  name: "Your name",
  email: "Email",
  ceremony: "Your ceremony",
  date: "Date",
  venue: "Venue",
};

const PLACEHOLDERS: Record<StepKey, string> = {
  name: "First and last",
  email: "you@email.com",
  ceremony: "A few words is plenty.",
  date: "Month, year — or a season",
  venue: "Where it's happening",
};

const DRAFT_KEY = "vow:contact:draft";
const RATE_KEY = "vow:contact:lastSent";
const RATE_MS = 60_000;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface State {
  name: string;
  email: string;
  ceremony: string;
  date: string;
  venue: string;
}

const EMPTY: State = { name: "", email: "", ceremony: "", date: "", venue: "" };

interface Props {
  onSubmitted: () => void;
}

export function ContactConversation({ onSubmitted }: Props) {
  const [state, setState] = useState<State>(EMPTY);
  const [active, setActive] = useState<StepKey>("name");
  const [shake, setShake] = useState<StepKey | null>(null);
  const [emailOk, setEmailOk] = useState(false);
  const [sending, setSending] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const keyboardOffset = useKeyboardOffset();

  // Restore draft
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<State>;
        setState((s) => ({ ...s, ...parsed }));
        // Jump to first empty required step
        const firstEmpty = STEP_ORDER.find((k) => !(parsed as State)?.[k]);
        if (firstEmpty) setActive(firstEmpty);
      }
    } catch {
      /* noop */
    }
  }, []);

  // Persist draft
  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(state));
    } catch {
      /* noop */
    }
  }, [state]);

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
    const v = state[k].trim();
    if (!REQUIRED.includes(k)) return true;
    if (k === "name") return v.length >= 2;
    if (k === "email") return emailRe.test(v);
    if (k === "ceremony") return v.length >= 2;
    return true;
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

  const allRequiredFilled = REQUIRED.every((k) => stepValid(k));

  const submit = async () => {
    if (honeypot) return; // bot
    if (!allRequiredFilled) {
      const firstBad = REQUIRED.find((k) => !stepValid(k));
      if (firstBad) setActive(firstBad);
      return;
    }
    // Rate limit
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
    const message = [
      state.ceremony,
      state.date ? `\n\nDate: ${state.date}` : "",
      state.venue ? `\nVenue: ${state.venue}` : "",
    ].join("");
    const { error } = await supabase.functions.invoke("send-contact-email", {
      body: {
        name: state.name,
        email: state.email,
        message,
        vertical: "weddings",
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
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      /* noop */
    }
    onSubmitted();
  };

  return (
    <div
      className="cv-wrap"
      style={{ paddingBottom: `calc(${keyboardOffset}px + 140px)` }}
    >
      {/* Header strap */}
      <div className="cv-strap">
        <img src={contactHeroImg} alt="" aria-hidden="true" />
        <div className="cv-strap__veil" aria-hidden="true" />
        <div className="cv-strap__inner">
          <span className="cv-strap__eyebrow">Wedding Piano</span>
          <span className="cv-strap__meta">Canmore · Alberta</span>
        </div>
      </div>

      {/* Headline */}
      <div className="cv-head">
        <h1 className="cv-head__h1">What deserves the song?</h1>
        <p className="cv-head__sub">Tell me one thing at a time.</p>
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
          const v = state[k].trim();
          if (!v) return null;
          // Only show summaries for steps that come before the active one
          if (STEP_ORDER.indexOf(k) > STEP_ORDER.indexOf(active)) return null;
          return (
            <button
              key={`s-${k}`}
              type="button"
              onClick={() => setActive(k)}
              className="cv-summary"
              aria-label={`Edit ${LABELS[k]}, ${v}`}
            >
              <span className="cv-summary__label">{LABELS[k]}</span>
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
            {LABELS[active]}
            {!REQUIRED.includes(active) && (
              <span className="cv-active__opt"> (optional)</span>
            )}
          </label>

          {active === "ceremony" ? (
            <textarea
              id={`cv-${active}`}
              ref={(el) => {
                inputRef.current = el;
              }}
              rows={3}
              className="cv-active__input cv-active__textarea"
              placeholder={PLACEHOLDERS[active]}
              value={state[active]}
              onChange={(e) => set(active, e.target.value)}
              autoCapitalize="sentences"
            />
          ) : (
            <input
              id={`cv-${active}`}
              ref={(el) => {
                inputRef.current = el;
              }}
              type={active === "email" ? "email" : "text"}
              inputMode={active === "email" ? "email" : "text"}
              autoComplete={
                active === "name" ? "name" : active === "email" ? "email" : "off"
              }
              autoCapitalize={active === "email" ? "none" : "words"}
              autoCorrect={active === "email" ? "off" : "on"}
              spellCheck={active !== "email"}
              className="cv-active__input"
              placeholder={PLACEHOLDERS[active]}
              value={state[active]}
              onChange={(e) => set(active, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  advance();
                }
              }}
              onBlur={() => {
                if (active === "email" && emailRe.test(state.email)) {
                  setEmailOk(true);
                }
              }}
            />
          )}

          <div className="cv-active__hint">
            {active === "email" && emailOk
              ? "Looks right ✓"
              : active === "email"
                ? "Never shared. Never spammed."
                : active === "ceremony"
                  ? "The feeling, the moment, the song that means everything."
                  : !REQUIRED.includes(active)
                    ? "Skip if you don't know yet."
                    : "\u00a0"}
          </div>

          <div className="cv-active__row">
            <button
              type="button"
              onClick={advance}
              className="cv-next"
              aria-label={
                STEP_ORDER.indexOf(active) === STEP_ORDER.length - 1
                  ? "Done"
                  : "Continue"
              }
            >
              <span>
                {STEP_ORDER.indexOf(active) === STEP_ORDER.length - 1
                  ? "Done"
                  : "Continue"}
              </span>
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>

            {!REQUIRED.includes(active) && !state[active] && (
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
            if (state[k].trim()) return null;
            if (STEP_ORDER.indexOf(k) < STEP_ORDER.indexOf(active)) return null;
            return (
              <button
                key={`u-${k}`}
                type="button"
                onClick={() => setActive(k)}
                className="cv-upcoming__row"
              >
                {LABELS[k]}
                {!REQUIRED.includes(k) && (
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
            {sending ? "Sending…" : "Reserve my date"}
            {!sending && <ArrowRight size={15} strokeWidth={1.5} />}
          </button>
        </div>
      </div>
    </div>
  );
}