import { object, string } from "zod"

export const changePasswordSchema = object({
  password: string().min(1, "Jelenlegi jelszó megadása kötelező"),
  newPassword: string().min(1, "Új jelszó megadása kötelező"),
  confirmPassword: string().min(1, "Új jelszó megerősítése kötelező")
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "A két jelszó nem egyezik",
  path: [ "confirmPassword" ]
})