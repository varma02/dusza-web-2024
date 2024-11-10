import { object, string } from "zod"

export const newSchoolSchema = object({
  username: string().min(1, "Felhasználónév megadása kötelező"),
  password: string().min(1, "Jelszó megadása kötelező"),
  name: string().min(1, "Iskola nevének megadása kötelező"),
  address: string().min(1, "Iskola címének megadása kötelező"),
  contact_name: string().min(1, "Kapcsolattartó nevének megadása kötelező"),
  contact_email: string().email("Helytelen email cím formátum").min(1, "Kapcsolattartó email címének megadása kötelező"),
})