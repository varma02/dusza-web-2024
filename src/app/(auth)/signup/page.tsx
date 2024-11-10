"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useEffect, useState } from "react"
import { signUpSchema } from "@/schemas/signUpSchema"
import { getSignUpProps, handleSignUp } from "@/actions/authActions"

import { Card, CardBody, CardHeader, Input, Select, SelectItem, Divider, Button, Link } from "@nextui-org/react"
import { MdArrowBack, MdVisibility, MdVisibilityOff } from "react-icons/md"
import { ToasterContext } from "@/components/ToasterProvider"

interface SelectProps {
  id: string,
  name: string
}

const SignUpPage = () => {
  const [ schools, setSchools ] = useState<SelectProps[]>([])
  const [ categories, setCategories ] = useState<SelectProps[]>([])
  const [ programmingLanguages, setProgrammingLanguages ] = useState<SelectProps[]>([])

  const [ globalError, setGlobalError ] = useState<string>()
  const toaster = useContext(ToasterContext)

  const [ isPasswordVisible, setIsPasswordVisible ] = useState(false)

  useEffect(() => {
    getSignUpProps()
      .then(({ schools, categories, programmingLanguages }) => {
        setSchools(schools)
        setCategories(categories)
        setProgrammingLanguages(programmingLanguages)
      })
  }, [])

  const { register, handleSubmit, formState: { isSubmitting, errors }, reset } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      school: "",
      member_1_name: "",
      member_1_grade: "8",
      member_2_name: "",
      member_2_grade: "8",
      member_3_name: "",
      member_3_grade: "8",
      teachers: "",
      category: "",
      programming_language: "",
    }
  })

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    const res = await handleSignUp(values)
    if (res) return setGlobalError(res.message)

    toaster.newToast("Csapat sikeresen regisztrálva!", "success", "Regisztrálva", 5000)
    reset()
  }

  return (
    <Card className="w-full max-w-lg p-2">
      <CardHeader>
        <h1 className="w-full text-center text-2xl font-semibold">Csapat regisztrálása</h1>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap gap-4">
            <Input
              {...register("username")}
              className="min-w-32 flex-1"
              type="text"
              label="Felhasználónév"
              placeholder="Adja meg felhasználónevét"
              variant="bordered"
              isInvalid={errors.username !== undefined}
              errorMessage={errors.username?.message}
            />
            <Input
              {...register("password")}
              className="min-w-32 flex-1"
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
          </div>
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
            variant="faded"
            isInvalid={errors.school !== undefined}
            errorMessage={errors.school?.message}
          >
            {schools.map(school => (
              <SelectItem key={school.id} value={school.id}>
                {school.name}
              </SelectItem>
            ))}
          </Select>
          <div>
            <div className="flex items-center gap-4 pb-2">
              <span className="text-sm whitespace-nowrap">Első csapattag</span>
              <Divider className="flex-1" />
            </div>
            <div className="flex flex-wrap gap-4">
              <Input
                {...register("member_1_name")}
                className="min-w-32 flex-1"
                type="text"
                label="Név"
                placeholder="Első csapattag neve"
                variant="bordered"
                isInvalid={errors.member_1_name !== undefined}
                errorMessage={errors.member_1_name?.message}
              />
              <Input
                {...register("member_1_grade")}
                className="max-w-24"
                type="text"
                label="Évfolyam"
                placeholder="Csapattag évfolyama"
                variant="bordered"
                isInvalid={errors.member_1_grade !== undefined}
                errorMessage={errors.member_1_grade?.message}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 pb-2">
              <span className="text-sm whitespace-nowrap">Második csapattag</span>
              <Divider className="flex-1" />
            </div>
            <div className="flex flex-wrap gap-4">
              <Input
                {...register("member_2_name")}
                className="min-w-32 flex-1"
                type="text"
                label="Név"
                placeholder="Második csapattag neve"
                variant="bordered"
                isInvalid={errors.member_2_name !== undefined}
                errorMessage={errors.member_2_name?.message}
              />
              <Input
                {...register("member_2_grade")}
                className="max-w-24"
                type="text"
                label="Évfolyam"
                placeholder="Évfolyam"
                variant="bordered"
                isInvalid={errors.member_2_grade !== undefined}
                errorMessage={errors.member_2_grade?.message}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 pb-2">
              <span className="text-sm whitespace-nowrap">Harmadik csapattag</span>
              <Divider className="flex-1" />
            </div>
            <div className="flex flex-wrap gap-4">
              <Input
                {...register("member_3_name")}
                className="min-w-32 flex-1"
                type="text"
                label="Név"
                placeholder="Harmadik csapattag neve"
                variant="bordered"
                isInvalid={errors.member_3_name !== undefined}
                errorMessage={errors.member_3_name?.message}
              />
              <Input
                {...register("member_3_grade")}
                className="max-w-24"
                type="text"
                label="Évfolyam"
                placeholder="Évfolyam"
                variant="bordered"
                isInvalid={errors.member_3_grade !== undefined}
                errorMessage={errors.member_3_grade?.message}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 pb-2">
                <span className="text-sm whitespace-nowrap">Pót csapattag</span>
                <Divider className="flex-1" />
            </div>
            <div className="flex flex-wrap gap-4">
              <Input
                {...register("member_sub_name")}
                className="min-w-32 flex-1"
                type="text"
                label="Név"
                placeholder="Pót csapattag neve"
                isInvalid={errors.member_sub_name !== undefined}
                errorMessage={errors.member_sub_name?.message}
                variant="bordered"
              />
              <Input
                {...register("member_sub_grade")}
                className="max-w-24"
                type="text"
                label="Évfolyam"
                placeholder="Évfolyam"
                isInvalid={errors.member_sub_grade !== undefined}
                errorMessage={errors.member_sub_grade?.message}
                variant="bordered"
              />
            </div>
          </div>
          <Input
            {...register("teachers")}
            type="text"
            label="Felkészítő tanár(ok)"
            placeholder="Adja meg tanára(i) nevét"
            description="Több tanár esetén vesszővel válassza el a neveket"
            variant="bordered"
            isInvalid={errors.teachers !== undefined}
            errorMessage={errors.teachers?.message}
          />
          <Select
            {...register("category")}
            label="Kategória"
            placeholder="Válasszon kategóriát"
            variant="faded"
            isInvalid={errors.category !== undefined}
            errorMessage={errors.category?.message}
          >
            {categories.map(category => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </Select>
          <Select
            {...register("programming_language")}
            label="Programnyelv"
            placeholder="Válasszon programnyelvet"
            variant="faded"
            isInvalid={errors.programming_language !== undefined}
            errorMessage={errors.programming_language?.message}
          >
            {programmingLanguages.map(language => (
              <SelectItem key={language.id} value={language.id}>
                {language.name}
              </SelectItem>
            ))}
          </Select>
          { globalError && <p className="text-center text-danger">{globalError}</p> }
          <div className="flex-1 flex gap-4 mt-4">
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
            >Regisztráció</Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}

export default SignUpPage