"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"

import { signInSchema } from "@/schemas/signInSchema"
import { handleCredentialsSignIn } from "@/actions/authActions"

import { Card, CardBody, CardHeader, Input, Button, Spinner } from "@nextui-org/react"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"

const SignInPage = () => {
  const searchParams = useSearchParams()
  const [ isPasswordVisible, setIsPasswordVisible ] = useState(false)
  const [ globalError, setGlobalError ] = useState<string>()

  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      const res = await handleCredentialsSignIn(values, searchParams.get("callbackUrl") || undefined)
      if (res) setGlobalError(res.message)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      if (!globalError) setGlobalError("Váratlan hiba történt")
    }
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
          { globalError && <p className="text-center text-danger">{globalError}</p> }
          <Button
            className="w-full mt-4"
            type="submit"
            color="primary"
            isLoading={isSubmitting}
          >Bejelentkezés</Button>
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