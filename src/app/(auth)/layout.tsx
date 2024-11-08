import { ReactNode } from "react"

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-screen grid place-items-center">
      {children}
    </main>
  )
}

export default AuthLayout