import { NextResponse } from "next/server";
import { sendCatalogueDownloadEmail } from "@/lib/server/contactEmail";

type CataloguePayload = {
  name?: unknown;
  email?: unknown;
  website?: unknown;
  formStartedAt?: unknown;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_FORM_FILL_MS = 1500;
const RATE_LIMIT_WINDOW_MS = Number(process.env.CATALOGUE_RATE_LIMIT_WINDOW_MS ?? "60000");
const RATE_LIMIT_MAX_REQUESTS = Number(process.env.CATALOGUE_RATE_LIMIT_MAX_REQUESTS ?? "5");

const DOWNLOAD_FILES = [
  {
    label: "A1Electricals Grid Solution Catalogue",
    path: "/catalogue/A1Electricals Grid Solution Catalogue.pdf",
  },
  {
    label: "A1Electricals Brochure",
    path: "/catalogue/A1Electricals Brochure.pdf",
  },
] as const;

type RateLimitEntry = {
  count: number;
  windowStart: number;
};

const globalForRateLimit = globalThis as typeof globalThis & {
  __catalogueRateLimit?: Map<string, RateLimitEntry>;
};

const rateLimitStore = globalForRateLimit.__catalogueRateLimit ?? new Map<string, RateLimitEntry>();
globalForRateLimit.__catalogueRateLimit = rateLimitStore;

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

  for (const [storedIp, entry] of rateLimitStore.entries()) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
      rateLimitStore.delete(storedIp);
    }
  }

  return (rateLimitStore.get(ip)?.count ?? 0) > RATE_LIMIT_MAX_REQUESTS;
}

function validatePayload(payload: CataloguePayload): {
  name: string;
  email: string;
  website: string;
  formStartedAt: number;
} {
  const name = asTrimmedString(payload.name);
  const email = asTrimmedString(payload.email);
  const website = asTrimmedString(payload.website);
  const formStartedAt = Number(payload.formStartedAt);

  if (!name || name.length < 2 || name.length > 120) {
    throw new Error("Please enter a valid name.");
  }
  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    throw new Error("Please enter a valid email.");
  }
  if (!Number.isFinite(formStartedAt) || formStartedAt <= 0) {
    throw new Error("Invalid request.");
  }

  return {
    name,
    email,
    website,
    formStartedAt,
  };
}

function getSiteBaseUrl(request: Request): string {
  const configuredUrl = process.env.SITE_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredUrl) {
    return configuredUrl.replace(/\/+$/, "");
  }

  const host = request.headers.get("host");
  if (!host) return "https://a1-electricals-test.vercel.app";
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
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

    const body = (await request.json()) as CataloguePayload;
    const payload = validatePayload(body);

    if (payload.website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const elapsedMs = Date.now() - payload.formStartedAt;
    if (elapsedMs < MIN_FORM_FILL_MS) {
      return NextResponse.json({ error: "Human verification failed." }, { status: 400 });
    }

    const baseUrl = getSiteBaseUrl(request);
    const catalogueLinks = DOWNLOAD_FILES.map((item) => ({
      label: item.label,
      url: `${baseUrl}${encodeURI(item.path)}`,
    }));

    await sendCatalogueDownloadEmail({
      name: payload.name,
      email: payload.email,
      catalogueLinks,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    }

    if (error instanceof Error) {
      const isValidationError =
        error.message.startsWith("Please enter") ||
        error.message.startsWith("Human verification") ||
        error.message === "Invalid request.";

      if (isValidationError) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }

    console.error("Catalogue download request failed:", error);
    return NextResponse.json(
      { error: "Unable to process your request right now. Please try again later." },
      { status: 500 },
    );
  }
}
