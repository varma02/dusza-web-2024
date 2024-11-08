import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/schemas/signInSchema"
import prisma from "@/lib/db"

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

        // if (compareSync(password, user.password)) return user

        return null
      }
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isSignedIn = !!auth?.user
      const { pathname } = nextUrl
      //const role = auth?.user.role || "user"

      if (pathname.startsWith("/signin") && isSignedIn) {
        return Response.redirect(new URL("/", nextUrl))
      }

      // if (pathname.startsWith("/page2") && role !== "admin") {
      //   return Response.redirect(new URL("/", nextUrl))
      // }

      return !!auth
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string
        token.role = user.role as number
      }

      return token
    },
    session({ session, token }) {
      session.user.id = token.id
      session.user.role = token.role as number
      
      return session
    }
  },
  pages: {
    signIn: "/signin"
  }
})