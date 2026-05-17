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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildContactAcknowledgementHtml(name: string): string {
  const safeName = escapeHtml(name);

  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>A-1 Electricals | Message Received</title>
  </head>
  <body style="margin: 0; padding: 0; background: #FAFAF8; font-family: 'Plus Jakarta Sans', Arial, sans-serif; color: #111111;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="padding: 26px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; background: #ffffff; border: 1px solid #E0DDD6; border-radius: 14px; overflow: hidden;">
            <tr>
              <td style="padding: 0; background: #111111;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding: 22px 28px 20px;">
                      <p style="margin: 0 0 10px; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700; color: #D97320;">
                        A-1 Electricals
                      </p>
                      <h1 style="margin: 0; font-size: 27px; line-height: 1.1; letter-spacing: -0.02em; color: #ffffff; font-weight: 800;">
                        Message Received.
                      </h1>
                      <p style="margin: 10px 0 0; font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.72);">
                        Power cable accessories. Built to standard.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="height: 3px; background: #D97320; font-size: 0; line-height: 0;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 24px 28px 6px;">
                <p style="margin: 0 0 14px; font-size: 15px; line-height: 1.8; color: #111111;">
                  Hi <strong>${safeName}</strong>,
                </p>
                <p style="margin: 0 0 14px; font-size: 15px; line-height: 1.8; color: #4A4845;">
                  Thank you for contacting us. We have received your inquiry and our team will respond shortly.
                </p>
                <p style="margin: 0 0 18px; font-size: 15px; line-height: 1.8; color: #4A4845;">
                  For urgent requirements, feel free to call us directly for faster support.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 28px 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background: #F3F2EE; border: 1px solid #E0DDD6; border-radius: 12px;">
                  <tr>
                    <td style="padding: 16px;">
                      <p style="margin: 0 0 7px; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #D97320;">
                        Support Note
                      </p>
                      <p style="margin: 0; font-size: 13px; line-height: 1.7; color: #4A4845;">
                        This is an automated acknowledgment from A-1 Electricals.<br />
                        Please avoid sharing sensitive account or payment details by email.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 28px 22px;">
                <p style="margin: 0; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #74726C; font-weight: 700;">
                  A-1 Electricals &middot; Rajkot, Gujarat, India
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

function buildInternalContactNotificationText(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  const submittedAt = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

  return [
    "A-1 ELECTRICALS - NEW CONTACT INQUIRY",
    "=====================================",
    "",
    `Submitted At: ${submittedAt} (IST)`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Subject: ${input.subject}`,
    "",
    "MESSAGE",
    "-------",
    input.message,
    "",
    "QUICK ACTION",
    "------------",
    `Reply to sender: mailto:${input.email}?subject=Re:%20${encodeURIComponent(input.subject)}`,
  ].join("\n");
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
  const safeMessage = input.message.trim();

  await transport.sendMail({
    from: config.fromEmail,
    to: config.toEmail,
    subject: `[Contact] ${safeSubject}`,
    replyTo: safeEmail,
    text: buildInternalContactNotificationText({
      name: safeName,
      email: safeEmail,
      subject: safeSubject,
      message: safeMessage,
    }),
  });

  // Send confirmation mail back to the sender.
  await transport.sendMail({
    from: config.fromEmail,
    to: safeEmail,
    subject: "We received your message - A-1 Electricals",
    text: [
      `Hi ${safeName},`,
      "",
      "Thank you for contacting A-1 Electricals.",
      "We have received your message and our team will get back to you shortly.",
      "",
      "Regards,",
      "A-1 Electricals",
    ].join("\n"),
    html: buildContactAcknowledgementHtml(safeName),
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

export async function sendInquiryEmail(input: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<void> {
  const config = getEmailConfig();
  const transport = getTransporter(config);

  const safeName = sanitizeForEmail(input.name);
  const safeEmail = sanitizeForEmail(input.email);
  const safeSubject = sanitizeForEmail(input.subject || "Website Inquiry");
  const safeMessage = input.message.trim();
  const safePhone = input.phone ? sanitizeForEmail(input.phone) : "";

  const messageWithPhone = safePhone ? `${safeMessage}\n\nPhone: ${safePhone}` : safeMessage;

  // Internal notification to A-1 Electricals.
  await transport.sendMail({
    from: config.fromEmail,
    to: config.toEmail,
    subject: `[Inquiry] ${safeSubject}`,
    replyTo: safeEmail,
    text: buildInternalContactNotificationText({
      name: safeName,
      email: safeEmail,
      subject: safeSubject,
      message: messageWithPhone,
    }),
  });

  // Confirmation mail back to the sender.
  await transport.sendMail({
    from: config.fromEmail,
    to: safeEmail,
    subject: "We received your inquiry - A-1 Electricals",
    text: [
      `Hi ${safeName},`,
      "",
      "Thank you for contacting A-1 Electricals.",
      "We have received your inquiry and our team will get back to you shortly.",
      "",
      "Regards,",
      "A-1 Electricals",
    ].join("\n"),
    html: buildContactAcknowledgementHtml(safeName),
  });
}
