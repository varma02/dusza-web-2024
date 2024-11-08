export { auth as middleware } from "@/auth"

export const config = {
  matcher: [ "/((?!api|_next/static|signup|_next/image|.*\\.png$).+)" ]
}