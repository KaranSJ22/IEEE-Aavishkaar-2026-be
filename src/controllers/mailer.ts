import nodemailer from 'nodemailer';
import { RegistrationType } from '../schemas/registration.schema';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const getRetroHtml = (data: RegistrationType) => {
  // Map through team members to create the list items
  const membersHtml = data.teamMembers && data.teamMembers.length > 0
    ? data.teamMembers.map(m => `
        <div style="border-left: 4px solid #000000; padding-left: 10px; margin-bottom: 8px;">
          <span style="font-weight: 900; display: block;">${m.name.toUpperCase()}</span>
          <span style="font-size: 12px; color: #431407;">${m.usn || 'N/A'}</span>
        </div>
      `).join('')
    : '<p style="font-style: italic;">No additional members logged.</p>';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <style>
    @media (prefers-color-scheme: dark) {
      .body-wrap { background-color: #1a0f0a !important; }
      .container { background-color: #f97316 !important; border-color: #ffffff !important; }
      .header { background-color: #ffffff !important; color: #f97316 !important; }
      .content, .footer, .member-title { color: #ffffff !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FFF7ED;">
  <div class="body-wrap" style="background-color: #FFF7ED; padding: 30px; font-family: 'Courier New', Courier, monospace;">
    <div class="container" style="max-width: 550px; margin: 0 auto; background-color: #FB923C; border: 6px solid #431407; box-shadow: 14px 14px 0px #431407; padding: 30px;">
      
      <div class="header" style="background-color: #431407; color: #FFFFFF; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">
        REGISTRATION LOGGED
      </div>

      <div class="content" style="color: #000000; line-height: 1.6; margin-top: 25px;">
        <p style="font-size: 20px; margin-bottom: 10px; font-weight: 900;">HOLA, ${data.leadName.toUpperCase()}!</p>
        <p style="font-weight: bold;">Transmission received. Squad status: <span style="background-color: #000; color: #fff; padding: 2px 5px;">LOCKED</span></p>
        
        <div style="background-color: #000000; color: #FB923C; padding: 12px; margin: 20px 0; font-weight: 900; text-align: center; border: 2px solid #FFFFFF; font-size: 18px;">
          TEAM: ${data.teamName.toUpperCase()}
        </div>

        <div style="margin-top: 25px;">
          <p class="member-title" style="font-weight: 900; text-decoration: underline; margin-bottom: 15px; text-transform: uppercase;">The Crew List:</p>
          ${membersHtml}
        </div>

        <p style="font-weight: bold; margin-top: 30px; border-top: 2px dashed #431407; padding-top: 15px;">
          Stay tuned for the next signal. Keep your gear ready.
        </p>
      </div>
    </div>
    
    <div class="footer" style="text-align: center; margin-top: 30px; font-size: 12px; color: #431407; font-weight: bold; letter-spacing: 1px;">
      // 2026 TECHFEST RITB //
    </div>
  </div>
</body>
</html>`;
};

export const sendWelcomeEmail = async (data: RegistrationType) => {
  try {
    const info = await transporter.sendMail({
      from: `"Retro HQ" <${process.env.SMTP_USER}>`,
      to: data.leadEmail,
      subject: `[CONFIRMED] ${data.teamName} is in! 🍊`,
      html: getRetroHtml(data),
    });
    console.log("✅ Mail sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Mailer Error:", error);
    return null;
  }
};