// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// const GMAIL_USER = process.env.GMAIL_USER;
// const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

// export const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD,
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });
import {Resend} from "resend";
import dotenv from "dotenv";
dotenv.config();

export const resend = new Resend(process.env.RESEND_API_KEY);
export const FROM = process.env.EMAIL_FROM || "Umar <umar@novaoutlook.com>";

