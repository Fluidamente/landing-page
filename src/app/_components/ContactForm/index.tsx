"use client";
import React, { CSSProperties } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { contactSchema } from "./schema";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendMail } from "@/lib/mail";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  whatsappLink,
} from "@/lib/site";

export type ContactFormProps = yup.InferType<typeof contactSchema>;

const fieldClass =
  "field w-full bg-white/10 px-5 text-body text-white placeholder:text-white/80";

const ContactForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormProps>({
    resolver: yupResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ContactFormProps> = async (data) => {
    setIsLoading(true);
    const result = await sendMail({
      name: data.name,
      email: data.email,
      message: data.message,
    });
    if (result) {
      toast.success("Mensaje enviado", {
        description: "Gracias por tu consulta, te respondo a la brevedad.",
      });
      reset();
    } else {
      toast.error("No pudimos enviar tu mensaje", {
        description:
          "Intentá nuevamente o escribime por WhatsApp al número que figura en esta sección.",
      });
    }
    setIsLoading(false);
  };

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-title"
      className="wrap pb-section"
    >
      <div
        className="coupon relative mx-auto grid grid-cols-1 bg-deep text-white lg:w-[calc(10/12*100%)] lg:grid-cols-[46fr_54fr]"
        data-reveal
      >
        {/* Lado izquierdo del cupón */}
        <div className="flex flex-col justify-between gap-10 p-7 md:p-12">
          <div>
            <h2 id="contacto-title" className="heading max-w-[10ch]">
              Contame qué te pasa
            </h2>
            <p className="mt-5 max-w-[36ch]">
              Dejame tu consulta y te respondo por mail. Si preferís, escribime
              directamente.
            </p>
          </div>
          <ul className="flex flex-col gap-3 font-semibold">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                Instagram {INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
        </div>

        {/* Perforación: muescas en forma de encastre + puntos */}
        <div aria-hidden className="perforation">
          <span className="notch notch-a" />
          <span className="notch notch-b" />
          <span className="dots">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} />
            ))}
          </span>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-2.5 p-7 md:p-12"
        >
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <div>
                <label htmlFor="contact-name" className="visually-hidden">
                  Nombre
                </label>
                <input
                  {...field}
                  id="contact-name"
                  autoComplete="name"
                  placeholder="Tu nombre"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "err-name" : undefined}
                  className={`${fieldClass} h-[54px]`}
                />
                {errors.name && (
                  <p
                    id="err-name"
                    className="mt-1.5 text-small font-semibold text-aqua"
                  >
                    {errors.name.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <div>
                <label htmlFor="contact-email" className="visually-hidden">
                  Email
                </label>
                <input
                  {...field}
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Tu email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "err-email" : undefined}
                  className={`${fieldClass} h-[54px]`}
                />
                {errors.email && (
                  <p
                    id="err-email"
                    className="mt-1.5 text-small font-semibold text-aqua"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="message"
            render={({ field }) => (
              <div>
                <label htmlFor="contact-message" className="visually-hidden">
                  Mensaje
                </label>
                <textarea
                  {...field}
                  id="contact-message"
                  rows={5}
                  placeholder="¿En qué te puedo ayudar?"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "err-message" : undefined}
                  className={`${fieldClass} min-h-[160px] resize-y py-4`}
                />
                {errors.message && (
                  <p
                    id="err-message"
                    className="mt-1.5 text-small font-semibold text-aqua"
                  >
                    {errors.message.message}
                  </p>
                )}
              </div>
            )}
          />
          <button
            type="submit"
            className="btn btn-aqua mt-3 h-[56px] w-full"
            disabled={isLoading}
            aria-busy={isLoading}
            style={{ "--i": 1 } as CSSProperties}
          >
            {isLoading ? "Enviando…" : "Enviar mensaje"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
