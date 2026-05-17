import { NextResponse } from "next/server";
import { sendInquiryEmail } from "@/lib/server/contactEmail";

type InquiryPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown; // honeypot
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_WINDOW_MS = Number(process.env.INQUIRY_RATE_LIMIT_WINDOW_MS ?? "60000");
const RATE_LIMIT_MAX_REQUESTS = Number(process.env.INQUIRY_RATE_LIMIT_MAX_REQUESTS ?? "3");

type RateLimitEntry = {
  count: number;
  windowStart: number;
};

const globalForRateLimit = globalThis as typeof globalThis & {
  __inquiryRateLimit?: Map<string, RateLimitEntry>;
};

const rateLimitStore = globalForRateLimit.__inquiryRateLimit ?? new Map<string, RateLimitEntry>();
globalForRateLimit.__inquiryRateLimit = rateLimitStore;

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip")?.trim() ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const currentEntry = rateLimitStore.get(ip);

  if (!currentEntry || now - currentEntry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
  } else {
    currentEntry.count += 1;
    rateLimitStore.set(ip, currentEntry);
  }

  // Opportunistic cleanup of stale entries.
  for (const [storedIp, entry] of rateLimitStore.entries()) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
      rateLimitStore.delete(storedIp);
    }
  }

  return (rateLimitStore.get(ip)?.count ?? 0) > RATE_LIMIT_MAX_REQUESTS;
}

function validatePayload(payload: InquiryPayload): {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  website?: string;
} {
  const name = asTrimmedString(payload.name);
  const email = asTrimmedString(payload.email);
  const phone = asTrimmedString(payload.phone);
  const subject = asTrimmedString(payload.subject);
  const message = asTrimmedString(payload.message);
  const website = asTrimmedString(payload.website);

  if (!name || name.length < 2 || name.length > 120) {
    throw new Error("Please enter a valid company / name.");
  }
  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    throw new Error("Please enter a valid email.");
  }
  if (subject && subject.length > 180) {
    throw new Error("Subject is too long.");
  }
  if (phone && (phone.length < 4 || phone.length > 30)) {
    throw new Error("Please enter a valid phone number.");
  }
  if (!message || message.length < 5 || message.length > 5000) {
    throw new Error("Please enter a valid message.");
  }

  return { name, email, phone: phone || undefined, subject: subject || undefined, message, website: website || undefined };
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait and try again." },
        { status: 429 },
      );
    }

    const body = (await request.json()) as InquiryPayload;
    const payload = validatePayload(body);

    if (payload.website) {
      // Silently accept honeypot submissions so bots cannot infer detection.
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    await sendInquiryEmail({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      subject: payload.subject,
      message: payload.message,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    }

    if (error instanceof Error) {
      const isValidationError =
        error.message.startsWith("Please enter") ||
        error.message === "Subject is too long." ||
        error.message === "Please enter a valid phone number.";

      if (isValidationError) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }

    console.error("Inquiry email send failed:", error);
    return NextResponse.json(
      { error: "Unable to send your inquiry right now. Please try again later." },
      { status: 500 },
    );
  }
}

