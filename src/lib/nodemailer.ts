import nodemailer from "nodemailer";

const isSmtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

let transporter: any = null;

if (isSmtpConfigured) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    // secure: process.env.SMTP_SECURE === "true",
    secure: parseInt(process.env.SMTP_PORT || "587") === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendEmail({ to, subject, text, html }: { to: string; subject: string; text: string; html?: string }) {
  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || '"Reature Organic" <no-reply@reatureorganic.com>',
        to,
        subject,
        text,
        html: html || text,
      });
      return true;
    } catch (error) {
      console.error("Failed to send email via SMTP:", error);
    }
  }

  // Fallback logger
  console.log("\n==========================================");
  console.log("📨 EMAIL OTP GENERATED (CONSOLE LOG FALLBACK)");
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${text}`);
  console.log("==========================================\n");
  return true;
}
