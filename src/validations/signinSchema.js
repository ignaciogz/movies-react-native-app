import { object, string } from 'yup';

export const signinSchema = object().shape({
  password: string()
    .required("La contraseña es requerida"),
  email: string()
    .required("El email es requerido")
    .email("Email invalido"),
});
