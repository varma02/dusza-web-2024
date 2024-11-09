import "next-auth"
import "next-auth/jwt"
import { UserRole } from "@/types"

declare module "next-auth" {
  interface User {
    id: string,
    username: string,
    role: UserRole
  }

  interface Session {
    user: User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    name: string,
    role: UserRole
  }
}