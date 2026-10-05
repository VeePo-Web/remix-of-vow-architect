import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const contactFunction = readFileSync("supabase/functions/send-contact-email/index.ts", "utf8");

describe("contact inquiry delivery", () => {
  it("routes every inquiry to Parker's requested inbox", () => {
    expect(contactFunction).toContain("const TO_EMAIL = 'parker@veepo.ca'");
    expect(contactFunction).toContain("to: [TO_EMAIL]");
  });

  it.each(["name", "email", "message", "vertical", "date", "venue"])(
    "includes the %s field in the email handling path",
    (field) => expect(contactFunction).toContain(field),
  );
});