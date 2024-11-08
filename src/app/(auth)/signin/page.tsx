"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useSearchParams } from "next/navigation"

import { signInSchema } from "@/schemas/signInSchema"
import { handleCredentialsSignIn } from "@/actions/authActions"

import { Card, CardBody, CardHeader, Input, Button } from "@nextui-org/react"

const SignInPage = () => {
  const searchParams = useSearchParams()
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
    <Card className="w-full max-w-lg">
      <CardHeader>
        <h1 className="w-full text-center text-2xl">Bejelentkezés</h1>
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
            onChange={() => setGlobalError(undefined)}
          />
          <Input
            {...register("password")}
            type="password"
            label="Jelszó"
            placeholder="Adja meg jelszavát"
            variant="bordered"
            isInvalid={errors.password !== undefined}
            errorMessage={errors.password?.message}
            onChange={() => setGlobalError(undefined)}
          />
          { globalError && <p className="text-danger">{globalError}</p> }
          <Button
            className="w-full"
            type="submit"
            color="primary"
            isLoading={isSubmitting}
          >Bejelentkezés</Button>
        </form>
      </CardBody>
    </Card>
  )
}

export default SignInPage