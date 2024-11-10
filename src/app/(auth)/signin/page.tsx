"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Suspense, useContext, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { signInSchema } from "@/schemas/signInSchema"
import { handleCredentialsSignIn } from "@/actions/authActions"

import { Card, CardBody, CardHeader, Input, Button, Spinner, Link } from "@nextui-org/react"
import { MdVisibility, MdVisibilityOff, MdArrowBack } from "react-icons/md"
import { ToasterContext } from "@/components/ToasterProvider"

const SignInPage = () => {
  const toaster = useContext(ToasterContext)

  const router = useRouter()
  const searchParams = useSearchParams()
  const [ isPasswordVisible, setIsPasswordVisible ] = useState(false)

  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    const res = await handleCredentialsSignIn(values)
    if (res) toaster.newToast(res.message, "danger", "Sikertelen bejelentkezés", 5000)
    
    router.push(searchParams.get("callbackUrl") || "/")
  }

  return (
    <Card className="w-full max-w-lg p-2">
      <CardHeader>
        <h1 className="w-full text-center text-2xl font-semibold">Bejelentkezés</h1>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            {...register("username")}
            type="text"
            label="Felhasználónév"
            placeholder="Adja meg felhasználónevét"
            variant="bordered"
            isInvalid={errors.username !== undefined}
            errorMessage={errors.username?.message}
          />
          <Input
            {...register("password")}
            type={isPasswordVisible ? "text" : "password"}
            label="Jelszó"
            placeholder="Adja meg jelszavát"
            variant="bordered"
            isInvalid={errors.password !== undefined}
            errorMessage={errors.password?.message}
            endContent={
              <button className="focus:outline-none" type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} aria-label="toggle password visibility">
              {isPasswordVisible ? (
                <MdVisibilityOff className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <MdVisibility className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
            }
          />
          <div className="flex gap-2 mt-4">
            <Button
              as={Link}
              href="/"
              isIconOnly
              type="submit"
            >
              <MdArrowBack />
            </Button>
            <Button
              className="w-full"
              type="submit"
              color="primary"
              isLoading={isSubmitting}
            >Bejelentkezés</Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}

export default function SignIn() {
  return (
    <Suspense fallback={<Spinner />}>
      <SignInPage />
    </Suspense>
  )
}