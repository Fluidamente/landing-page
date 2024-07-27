"use client";
import React from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { toast } from "sonner";
import { contactSchema } from "./schema";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendMail } from "@/lib/mail";

export type ContactFormProps = yup.InferType<typeof contactSchema>;

const ContactForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<ContactFormProps>({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ContactFormProps> = async (data) => {
    setIsLoading(true);
    const args = {
      name: data.name,
      email: data.email,
      message: data.message,
    };
    await sendMail(args);
    toast.success("Mensaje enviado", {
      description: "Gracias por tu consulta, te responderemos a la brevedad",
    });
    setIsLoading(false);
  };

  return (
    <section
      className="flex w-full flex-col items-center justify-center py-5"
      id="contact_form"
    >
      <div className="flex w-full flex-col items-center justify-center gap-5 bg-primary px-5 py-3 lg:flex-row">
        <p className="font-raleway text-2xl text-white">
          Y si te gustaría dejar tu consulta:
        </p>
        <Link
          href="https://wa.me/5493756417801?text=Buenas%20tardes%20Lic.%20Lepori%2C%20me%20interesa%20concertar%20una%20sesi%C3%B3n."
          target="_blank"
          className="ml-5 font-raleway text-2xl text-white"
        >
          +54 9 15 2547893
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-5 p-5 font-raleway"
      >
        <div className="grid w-full grid-cols-3 justify-items-center gap-5">
          <label className="col-span-1 justify-self-end text-xl">Nombre:</label>
          <Controller
            control={control}
            name={"name"}
            render={({ field }) => (
              <Input
                {...field}
                className="col-span-2 w-full max-w-xs font-raleway"
              />
            )}
          />
        </div>
        {errors.name && (
          <p className="pl-3 text-sm text-red-500">{errors.name.message}</p>
        )}
        <div className="grid w-full grid-cols-3 justify-items-center gap-5">
          <label className="col-span-1 justify-self-end text-xl">Email:</label>
          <Controller
            control={control}
            name={"email"}
            render={({ field }) => (
              <Input {...field} className="col-span-2 w-full max-w-xs" />
            )}
          />
        </div>
        {errors.email && (
          <p className="pl-3 text-sm text-red-500">{errors.email.message}</p>
        )}
        <div className="grid w-full grid-cols-3 justify-items-center gap-5">
          <label className="col-span-1 justify-self-end text-xl">
            Mensaje:
          </label>
          <Controller
            control={control}
            name={"message"}
            render={({ field }) => (
              <Textarea {...field} className="col-span-2 w-full max-w-xs" />
            )}
          />
        </div>
        {errors.message && (
          <p className="pl-3 text-sm text-red-500">{errors.message.message}</p>
        )}
        <Button
          className={`mt-8 w-[250px] p-6 font-poppins text-xl ${isValid ? "bg-primary" : "bg-gray-400"}`}
          variant="solid"
          color="primary"
          style={{
            filter: "drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.50))",
          }}
          type="submit"
          disabled={!isValid}
        >
          Enviar
        </Button>
      </form>
    </section>
  );
};

export default ContactForm;
