"use server";
import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { contactTemplate } from "./templates/contact";
import { ebookEmailTemplate } from "./templates/ebook-email";

function createTransport() {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

export async function sendMail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const { SMTP_EMAIL } = process.env;
  const transport = createTransport();
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

export async function sendEbookByEmail({
  to,
  attachment,
  filename,
}: {
  to: string;
  attachment: Buffer;
  filename: string;
}): Promise<{ success: boolean }> {
  const { SMTP_EMAIL } = process.env;
  const transport = createTransport();

  try {
    await transport.verify();
  } catch (error) {
    console.error(error);
    return { success: false };
  }

  try {
    const template = handlebars.compile(ebookEmailTemplate);
    const html = template({});

    await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject: 'Tu Ebook "El camino consciente del duelo"',
      html,
      attachments: [
        {
          filename,
          content: attachment,
          contentType: "application/pdf",
        },
      ],
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
