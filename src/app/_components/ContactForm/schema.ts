import * as yup from "yup";
const contactSchema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  email: yup.string().email().required("El email es requerido"),
  message: yup.string().required("La mensaje es requerido"),
});

export { contactSchema };
