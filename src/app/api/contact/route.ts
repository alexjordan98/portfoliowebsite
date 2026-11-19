import { NextResponse } from 'next/server';
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

/**
 * Maximum accepted lengths for each submitted field.
 */
const MAX_LENGTHS = {
  name: 100,
  email: 254,
  message: 5000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * A validated contact form submission.
 */
interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  recaptchaToken: string;
}

/**
 * Server-only configuration required to verify and send a contact email.
 */
interface ContactConfig {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  senderEmail: string;
  recipientEmail: string;
  recaptchaSecretKey: string;
}

/**
 * Reads the contact configuration from server-only environment variables.
 *
 * @returns the configuration, or `null` if any variable is missing
 */
function readConfig(): ContactConfig | null {
  const {
    AWS_REGION,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    SES_SENDER_EMAIL,
    SES_RECIPIENT_EMAIL,
    RECAPTCHA_SECRET_KEY,
  } = process.env;

  if (
    !AWS_REGION ||
    !AWS_ACCESS_KEY_ID ||
    !AWS_SECRET_ACCESS_KEY ||
    !SES_SENDER_EMAIL ||
    !SES_RECIPIENT_EMAIL ||
    !RECAPTCHA_SECRET_KEY
  ) {
    return null;
  }

  return {
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    senderEmail: SES_SENDER_EMAIL,
    recipientEmail: SES_RECIPIENT_EMAIL,
    recaptchaSecretKey: RECAPTCHA_SECRET_KEY,
  };
}

/**
 * Checks that a value is a non-blank string no longer than `maxLength`.
 *
 * @param value - the value to check
 * @param maxLength - the maximum allowed length
 * @returns `true` if the value is a valid string field
 */
function isValidField(value: unknown, maxLength: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;
}

/**
 * Validates a parsed request body as a contact submission.
 *
 * @param body - the parsed JSON body
 * @returns the trimmed submission, or `null` if any field is missing, too long, or malformed
 */
function parseSubmission(body: unknown): ContactSubmission | null {
  if (typeof body !== 'object' || body === null) {
    return null;
  }

  const { name, email, message, recaptchaToken } = body as Record<string, unknown>;

  if (
    !isValidField(name, MAX_LENGTHS.name) ||
    !isValidField(email, MAX_LENGTHS.email) ||
    !isValidField(message, MAX_LENGTHS.message) ||
    typeof recaptchaToken !== 'string' ||
    recaptchaToken.length === 0
  ) {
    return null;
  }

  const trimmedEmail = email.trim();
  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    return null;
  }

  return {
    name: name.trim(),
    email: trimmedEmail,
    message: message.trim(),
    recaptchaToken,
  };
}

/**
 * Verifies a reCAPTCHA token with Google.
 *
 * @param token - the token produced by the client-side widget
 * @param secretKey - the reCAPTCHA secret key
 * @returns `true` if Google reports the token as valid
 */
async function verifyRecaptcha(token: string, secretKey: string): Promise<boolean> {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret: secretKey, response: token }),
  });

  if (!response.ok) {
    return false;
  }

  const data: { success?: boolean } = await response.json();
  return data.success === true;
}

/**
 * Escapes a string for safe inclusion in HTML.
 *
 * @param value - the untrusted string
 * @returns the string with HTML special characters replaced by entities
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Builds the HTML body of the notification email from escaped user input.
 *
 * @param submission - the validated submission
 * @returns the HTML email body
 */
function buildHtmlBody({ name, email, message }: ContactSubmission): string {
  return [
    '<h2>New Contact Form Submission</h2>',
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    '<p><strong>Message:</strong></p>',
    `<p>${escapeHtml(message).replace(/\r?\n/g, '<br>')}</p>`,
  ].join('\n');
}

/**
 * Builds the plain-text body of the notification email.
 *
 * @param submission - the validated submission
 * @returns the plain-text email body
 */
function buildTextBody({ name, email, message }: ContactSubmission): string {
  return `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
}

/**
 * Sends the notification email through the Amazon SES v2 HTTPS API.
 *
 * @param submission - the validated submission
 * @param config - the contact configuration
 * @throws Error if SES rejects the request
 */
async function sendEmail(submission: ContactSubmission, config: ContactConfig): Promise<void> {
  const client = new SESv2Client({
    region: config.region,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });

  await client.send(
    new SendEmailCommand({
      FromEmailAddress: config.senderEmail,
      Destination: { ToAddresses: [config.recipientEmail] },
      ReplyToAddresses: [submission.email],
      Content: {
        Simple: {
          Subject: {
            Data: `New Contact Form Submission from ${submission.name.replace(/[\r\n]+/g, ' ')}`,
            Charset: 'UTF-8',
          },
          Body: {
            Text: { Data: buildTextBody(submission), Charset: 'UTF-8' },
            Html: { Data: buildHtmlBody(submission), Charset: 'UTF-8' },
          },
        },
      },
    }),
  );
}

/**
 * Handles contact form submissions.
 *
 * @remarks
 * Expects a JSON body of `{ name, email, message, recaptchaToken }`. Validates the
 * fields, verifies the reCAPTCHA token, and emails the submission via Amazon SES.
 * Responds with `{ message }` on success, or `{ error }` with status 400 for invalid
 * input or a failed reCAPTCHA and 500 for configuration or delivery failures.
 *
 * @param request - the incoming request
 * @returns a JSON response describing the outcome
 */
export async function POST(request: Request): Promise<NextResponse> {
  const config = readConfig();
  if (!config) {
    console.error('Contact form is not configured: missing AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, SES_SENDER_EMAIL, SES_RECIPIENT_EMAIL, or RECAPTCHA_SECRET_KEY');
    return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const submission = parseSubmission(body);
  if (!submission) {
    return NextResponse.json(
      { error: 'Name, a valid email, and a message are required and must be within length limits' },
      { status: 400 },
    );
  }

  try {
    if (!(await verifyRecaptcha(submission.recaptchaToken, config.recaptchaSecretKey))) {
      return NextResponse.json({ error: 'Invalid reCAPTCHA' }, { status: 400 });
    }

    await sendEmail(submission, config);
    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 500 });
  }
}
