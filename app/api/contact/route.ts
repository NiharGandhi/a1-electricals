import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/server/contactEmail";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? "60000");
const RATE_LIMIT_MAX_REQUESTS = Number(process.env.CONTACT_RATE_LIMIT_MAX_REQUESTS ?? "3");

type RateLimitEntry = {
  count: number;
  windowStart: number;
};

const globalForRateLimit = globalThis as typeof globalThis & {
  __contactRateLimit?: Map<string, RateLimitEntry>;
};

const rateLimitStore = globalForRateLimit.__contactRateLimit ?? new Map<string, RateLimitEntry>();
globalForRateLimit.__contactRateLimit = rateLimitStore;

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validatePayload(payload: ContactPayload): {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
} {
  const name = asTrimmedString(payload.name);
  const email = asTrimmedString(payload.email);
  const subject = asTrimmedString(payload.subject);
  const message = asTrimmedString(payload.message);
  const website = asTrimmedString(payload.website);

  if (!name || name.length < 2 || name.length > 120) {
    throw new Error("Please enter a valid name.");
  }
  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    throw new Error("Please enter a valid email.");
  }
  if (subject.length > 180) {
    throw new Error("Subject is too long.");
  }
  if (!message || message.length < 5 || message.length > 5000) {
    throw new Error("Please enter a valid message.");
  }

  return { name, email, subject, message, website };
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

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute and try again." },
        { status: 429 },
      );
    }

    const body = (await request.json()) as ContactPayload;
    const payload = validatePayload(body);
    if (payload.website) {
      // Silently accept honeypot submissions so bots cannot infer detection.
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    await sendContactEmail(payload);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    }

    if (error instanceof Error) {
      const isValidationError =
        error.message.startsWith("Please enter") || error.message === "Subject is too long.";

      if (isValidationError) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }

    console.error("Contact email send failed:", error);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again later." },
      { status: 500 },
    );
  }
}
