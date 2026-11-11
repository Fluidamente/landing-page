import * as yup from "yup";
const contactSchema = yup.object().shape({
  name: yup.string().trim().required("Contame tu nombre"),
  email: yup
    .string()
    .trim()
    .email("Revisá el email, parece incompleto")
    .required("Necesito un email para responderte"),
  message: yup.string().trim().required("Escribí tu consulta"),
});

export { contactSchema };
