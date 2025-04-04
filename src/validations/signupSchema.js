import { object, ref, string } from 'yup';

export const signupSchema = object().shape({
  confirmPassword: string()
    .required("La confirmacion de contraseña es requerida")
    .oneOf([ref("password"), null], "Las contraseñas deben coincidir"),
  password: string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  email: string()
    .required("El email es requerido")
    .email("Email invalido"),
});
