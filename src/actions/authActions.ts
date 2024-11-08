"use server"

import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"

export const handleCredentialsSignIn = async (
  {
    username,
    password
  } : { 
    username: string,
    password: string
  },
  callbackUrl?: string
) => {
  try {
    console.log(callbackUrl, "!!!!")
    await signIn("credentials", { username, password, redirectTo: callbackUrl })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Helytelen adatok kerültek megadásra"
          }
        default:
          return {
            message: "Váratlan hiba történt"
          }
      }
    }

    throw error
  }
}

export const handleSignOut = async () => {
  await signOut()
}