"use server";
import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { contactTemplate } from "./templates/contact";

export async function sendMail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  try {
    const testResults = await transport.verify();
  } catch (error) {
    console.error(error);
    return;
  }

  try {
    const html = await compileContactTemplate({ name, email, message });
    const sendEmail = await transport.sendMail({
      from: SMTP_EMAIL,
      to: SMTP_EMAIL,
      subject: `Nuevo mensaje de Formulario Web - ${name}`,
      html: html,
    });
    return sendEmail;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function compileContactTemplate({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const template = handlebars.compile(contactTemplate);
  const htmlBody = template({ name, email, message });
  return htmlBody;
}
