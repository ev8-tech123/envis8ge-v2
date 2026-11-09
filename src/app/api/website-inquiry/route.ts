import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

/**
 * Website Development page (/websites) inquiry form.
 *
 * Notification only: emails the submission to the recipient below via
 * Resend. Unlike /api/contact it does NOT save a Resend contact, add to
 * a segment, or fire any automation/newsletter event (requested
 * 2026-11-09). Recipient confirmed by the site owner on 2026-11-09.
 */
const RECIPIENTS = ["shawn@envis8ge.com"];
const FROM = "Envis8ge Website <from@envis8ge.com>";
const RESEND_EMAILS_URL = "https://api.resend.com/emails";

const FIELDS = [
  "name",
  "email",
  "phone",
  "company",
  "goal",
  "message",
] as const;
type Field = (typeof FIELDS)[number];
type Payload = Record<Field, string>;

const GOALS = [
  "Digital Agency Services",
  "Workshop & Training",
  "Website Development",
  "Others",
];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH: Record<Field, number> = {
  name: 200,
  email: 320,
  phone: 50,
  company: 200,
  goal: 100,
  message: 5000,
};

function parsePayload(body: unknown): Payload | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  const out = {} as Payload;
  for (const key of FIELDS) {
    const value = b[key];
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    if (!trimmed || trimmed.length > MAX_LENGTH[key]) return null;
    out[key] = trimmed;
  }
  if (!EMAIL_PATTERN.test(out.email) || !GOALS.includes(out.goal)) return null;
  return out;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const data = parsePayload(body);
  if (!data) {
    return NextResponse.json(
      { error: "Please fill in all required fields with valid values." },
      { status: 400 }
    );
  }

  const apiKey = getCloudflareContext().env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Resend is not configured: missing RESEND_API_KEY.");
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(RESEND_EMAILS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: RECIPIENTS,
        reply_to: data.email,
        subject: `New website enquiry: ${data.name}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Contact number: ${data.phone}`,
          `Company: ${data.company}`,
          `Goal: ${data.goal}`,
          `Message: ${data.message}`,
          "",
          "Sent from the inquiry form at https://envis8ge.com/websites",
        ].join("\n"),
      }),
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(`Resend responded ${response.status}: ${detail}`);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Website inquiry notification failed:", error);
    return NextResponse.json(
      {
        error: "Something went wrong sending your message. Please try again.",
      },
      { status: 502 }
    );
  }
}
