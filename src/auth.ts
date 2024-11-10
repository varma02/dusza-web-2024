import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/schemas/signInSchema"
import bcrypt from "bcryptjs"
import prisma from "@/lib/db"
import { UserRole } from "@/types"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { type: "text", label: "Felhasználónév" },
        password: { type: "password", label: "Jelszó" }
      },
      async authorize(credentials) {
        const parsedCredentials = signInSchema.safeParse(credentials)

        if (!parsedCredentials.success) return null
        const { username, password } = parsedCredentials.data

        const user = await prisma.user.findUnique({ where: { username } })
        if (!user) return null

        const comparedPassword = await bcrypt.compare(password, user.password)
        if (comparedPassword) return user

        return null
      }
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isSignedIn = !!auth?.user
      const { pathname } = nextUrl
      const role = auth?.user.role || UserRole.TeamMember

      if (pathname.startsWith("/signin") && isSignedIn) {
        return Response.redirect(new URL("/", nextUrl))
      }

      if (pathname.startsWith("/organizer") && isSignedIn && role !== UserRole.Organizer) {
        return Response.redirect(new URL("/", nextUrl))
      }

      return !!auth
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string
        token.name = user.username as string
        token.role = user.role as number
      }

      return token
    },
    session({ session, token }) {
      session.user.id = token.id
      session.user.name = token.name
      session.user.role = token.role as number
      
      return session
    }
  },
  pages: {
    signIn: "/signin"
  }
})