"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { signUpSchema } from "@/schemas/signUpSchema"

import { Card, CardBody, CardHeader, Input, Select, SelectItem, Button } from "@nextui-org/react"
import { handleSignUp } from "@/actions/authActions"
import { useState } from "react"

interface SelectProps {
  id: string,
  name: string
}

export const SignUpCard = ({
  schools,
  categories,
  programmingLanguages
}: {
  schools: SelectProps[],
  categories: SelectProps[],
  programmingLanguages: SelectProps[]
}) => {
  const [ globalError, setGlobalError ] = useState<string>()

  const { register, handleSubmit, formState: { isSubmitting, errors }, reset } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      school: "",
      member_1_name: "",
      member_1_grade: "9",
      member_2_name: "",
      member_2_grade: "9",
      member_3_name: "",
      member_3_grade: "9",
      teachers: "",
      category: "",
      programming_language: "",
    }
  })

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    const res = await handleSignUp(values)
    if (res) return setGlobalError(res.message)

    alert("Sikeres regisztráció")
    reset()
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <h1 className="w-full text-center text-2xl font-semibold">Csapat regisztrálása</h1>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            {...register("name")}
            type="text"
            label="Csapatnév"
            placeholder="Adja meg csapata nevét"
            variant="bordered"
            isInvalid={errors.name !== undefined}
            errorMessage={errors.name?.message}
          />
          <Select
            {...register("school")}
            label="Iskola"
            placeholder="Válasszon iskolát"
            isInvalid={errors.school !== undefined}
            errorMessage={errors.school?.message}
          >
            {schools?.map(school => (
              <SelectItem key={school.id} value={school.id}>
                {school.name}
              </SelectItem>
            ))}
          </Select>
          <div className="flex gap-4">
            <Input
              {...register("member_1_name")}
              type="text"
              label="Csapattag neve"
              placeholder="Első csapattag neve"
              variant="bordered"
              isInvalid={errors.member_1_name !== undefined}
              errorMessage={errors.member_1_name?.message}
            />
            <Input
              {...register("member_1_grade")}
              type="text"
              label="Csapattag évfolyama"
              placeholder="Első csapattag évfolyama"
              variant="bordered"
              isInvalid={errors.member_1_grade !== undefined}
              errorMessage={errors.member_1_grade?.message}
            />
          </div>
          <div className="flex gap-4">
            <Input
              {...register("member_2_name")}
              type="text"
              label="Csapattag neve"
              placeholder="Második csapattag neve"
              variant="bordered"
              isInvalid={errors.member_2_name !== undefined}
              errorMessage={errors.member_2_name?.message}
            />
            <Input
              {...register("member_2_grade")}
              type="text"
              label="Csapattag évfolyama"
              placeholder="Második csapattag évfolyama"
              variant="bordered"
              isInvalid={errors.member_2_grade !== undefined}
              errorMessage={errors.member_2_grade?.message}
            />
          </div>
          <div className="flex gap-4">
            <Input
              {...register("member_3_name")}
              type="text"
              label="Csapattag neve"
              placeholder="Harmadik csapattag neve"
              variant="bordered"
              isInvalid={errors.member_3_name !== undefined}
              errorMessage={errors.member_3_name?.message}
            />
            <Input
              {...register("member_3_grade")}
              type="text"
              label="Csapattag évfolyama"
              placeholder="Harmadik csapattag évfolyama"
              variant="bordered"
              isInvalid={errors.member_3_grade !== undefined}
              errorMessage={errors.member_3_grade?.message}
            />
          </div>
          <div className="flex gap-4">
            <Input
              {...register("member_sub_name")}
              type="text"
              label="Csapattag neve"
              placeholder="Pót csapattag neve"
              isInvalid={errors.member_sub_name !== undefined}
              errorMessage={errors.member_sub_name?.message}
              variant="bordered"
            />
            <Input
              {...register("member_sub_grade")}
              type="text"
              label="Csapattag évfolyama"
              placeholder="Pót csapattag évfolyama"
              isInvalid={errors.member_sub_grade !== undefined}
              errorMessage={errors.member_sub_grade?.message}
              variant="bordered"
            />
          </div>
          <Input
            {...register("teachers")}
            type="text"
            label="Felkészítő tanár(ok)"
            placeholder="Adja meg tanára(i) nevét"
            description="Több tanár esetén vesszővel válassza el a neveket"
            variant="bordered"
            isInvalid={errors.name !== undefined}
            errorMessage={errors.name?.message}
          />
          <Select
            {...register("category")}
            label="Kategória"
            placeholder="Válasszon kategóriát"
            isInvalid={errors.category !== undefined}
            errorMessage={errors.category?.message}
          >
            {categories?.map(category => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </Select>
          <Select
            {...register("programming_language")}
            label="Programnyelv"
            placeholder="Válasszon programnyelvet"
            isInvalid={errors.programming_language !== undefined}
            errorMessage={errors.programming_language?.message}
          >
            {programmingLanguages?.map(language => (
              <SelectItem key={language.id} value={language.id}>
                {language.name}
              </SelectItem>
            ))}
          </Select>
          { globalError && <p className="text-center text-danger">{globalError}</p> }
          <Button
            className="w-full"
            type="submit"
            color="primary"
            isLoading={isSubmitting}
          >Regisztráció</Button>
        </form>
      </CardBody>
    </Card>
  )
}