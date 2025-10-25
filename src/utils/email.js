// Import dotenv to read .env file variables (like email, password, etc.)
import { config } from "dotenv";
// Import nodemailer to send emails from Node.js
import nodemailer from "nodemailer";

// Load environment variables from .env file
config();

// ------------------------------
// Create an email transporter (like an email sender setup)
// ------------------------------
const transporter = nodemailer.createTransport({
  // Using Gmail service
  service: 'gmail',
  auth: {
    // Use Google OAuth2 for secure login (no plain password)
    type: "OAuth2",
    user: process.env.EMAIL_USER,           // your Gmail address
    clientId: process.env.GOOGLE_CLIENT_ID, // from Google Cloud Console
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN // keeps you logged in
  }
});

// ------------------------------
// Check if the email setup is working correctly
// ------------------------------
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Error connecting to Email server:", error);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

// ------------------------------
// Function: sendEmail()
// Sends an email with given details
// ------------------------------
const sendEmail = async (to, subject, text, html) => {


  console.log("Sending email to:", to); // 🔍 check the recipient
if (!to) {
throw new Error("Recipient email is undefined");
}
  try {


    // Actually send the email
    const info = await transporter.sendMail({
      from: `"Music player" <${process.env.EMAIL_USER}>`, // sender name and email
      to,       // receiver’s email
      subject,  // email subject
      text,     // plain text version
      html,     // HTML version
    });

    console.log('📨 Message sent: %s', info.messageId);
    console.log('🔗 Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};


export default sendEmail