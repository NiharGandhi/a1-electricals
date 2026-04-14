import "server-only";

import nodemailer, { Transporter } from "nodemailer";

type ContactEmailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromEmail: string;
  toEmail: string;
};

let transporter: Transporter | null = null;

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getEmailConfig(): ContactEmailConfig {
  const host = getRequiredEnv("SMTP_HOST");
  const user = getRequiredEnv("SMTP_USER");
  const pass = getRequiredEnv("SMTP_PASS");
  const fromEmail = getRequiredEnv("CONTACT_FROM_EMAIL");
  const toEmail = getRequiredEnv("CONTACT_TO_EMAIL");

  const portValue = process.env.SMTP_PORT ?? "465";
  const port = Number(portValue);
  if (Number.isNaN(port) || port <= 0) {
    throw new Error("SMTP_PORT must be a valid positive number.");
  }

  const secure = (process.env.SMTP_SECURE ?? "true").toLowerCase() === "true";

  return { host, port, secure, user, pass, fromEmail, toEmail };
}

function getTransporter(config: ContactEmailConfig): Transporter {
  if (transporter) {
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  return transporter;
}

function sanitizeForEmail(value: string): string {
  return value.replace(/[\r\n]/g, " ").trim();
}

export async function sendContactEmail(input: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<void> {
  const config = getEmailConfig();
  const transport = getTransporter(config);

  const safeName = sanitizeForEmail(input.name);
  const safeEmail = sanitizeForEmail(input.email);
  const safeSubject = sanitizeForEmail(input.subject || "Website Contact Query");

  await transport.sendMail({
    from: config.fromEmail,
    to: config.toEmail,
    subject: `[Contact] ${safeSubject}`,
    replyTo: safeEmail,
    text: [
      `Name: ${safeName}`,
      `Email: ${safeEmail}`,
      "",
      "Message:",
      input.message.trim(),
    ].join("\n"),
  });
}

export async function sendCatalogueDownloadEmail(input: {
  name: string;
  email: string;
  catalogueLinks: Array<{ label: string; url: string }>;
}): Promise<void> {
  const config = getEmailConfig();
  const transport = getTransporter(config);

  const safeName = sanitizeForEmail(input.name);
  const safeEmail = sanitizeForEmail(input.email);
  const safeLinks = input.catalogueLinks.map((item) => ({
    label: sanitizeForEmail(item.label),
    url: sanitizeForEmail(item.url),
  }));

  // Internal notification.
  await transport.sendMail({
    from: config.fromEmail,
    to: config.toEmail,
    subject: "[Catalogue Download] New request",
    replyTo: safeEmail,
    text: [
      "New catalogue/datasheet download request:",
      "",
      `Name: ${safeName}`,
      `Email: ${safeEmail}`,
      "",
      "Links sent:",
      ...safeLinks.map((item) => `- ${item.label}: ${item.url}`),
    ].join("\n"),
  });

  // Send catalogue links to requester.
  await transport.sendMail({
    from: config.fromEmail,
    to: safeEmail,
    subject: "Your A-1 Electricals Catalogue Download Links",
    text: [
      `Hello ${safeName},`,
      "",
      "Thank you for your interest in A-1 Electricals.",
      "You can download our catalogue documents here:",
      "",
      ...safeLinks.map((item) => `${item.label}: ${item.url}`),
      "",
      "If you need product-specific support, reply to this email and our team will help you.",
      "",
      "Regards,",
      "A-1 Electricals",
    ].join("\n"),
  });
}
