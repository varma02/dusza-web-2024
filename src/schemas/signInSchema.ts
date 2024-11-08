import { object, string } from "zod"

export const signInSchema = object({
  username: string().min(1, "Felhasználónév megadása kötelező"),
  password: string().min(1, "Jelszó megadása kötelező")
})