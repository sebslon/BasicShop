import { createTransport, getTestMessageUrl } from "nodemailer";
import * as SMTPTransport from "nodemailer/lib/smtp-transport";

const nodemailerOptions: SMTPTransport.Options = {
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};

const transport = createTransport(nodemailerOptions);

function makeEmail(text: string): string {
  return `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello!</h2>
      <p>${text}</p>
      <p>Thank you for joining us!</p>
    </div>
  `;
}

export async function sendPasswordResetEmail(resetToken: string, to: string) {
  const info = await transport.sendMail({
    to,
    from: "test@example.com",
    subject: "Reset password token",
    html: makeEmail(`Your password reset token is here: 

      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}" >Click here to reset your password</a>
    `),
  });

  if (process.env.MAIL_USER.includes("ethereal.email")) {
    console.log(`Message Sent - Preview it at ${getTestMessageUrl(info)}`);
  }
}
