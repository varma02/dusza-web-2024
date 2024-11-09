import { ReactNode } from "react"

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen grid place-items-center p-4">
      {children}
    </main>
  )
}

export default AuthLayout