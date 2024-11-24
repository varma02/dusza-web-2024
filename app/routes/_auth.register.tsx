import { Card, CardBody, CardHeader, Input, Select, SelectItem, Divider, Button, Link, CardFooter } from "@nextui-org/react"
import { MdArrowBack, MdVisibility, MdVisibilityOff } from "react-icons/md"
import { useState } from "react"

export default function SignUpPage() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <Card className="m-2 p-2 max-w-5xl">
      <form className="contents">
        <CardHeader>
          <h1 className="w-full text-center text-2xl font-semibold">Csapat regisztrálása</h1>
        </CardHeader>
        <CardBody className="lg:grid lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <Input
                className="min-w-32 flex-1"
                type="text"
                label="Felhasználónév"
                placeholder="Adja meg felhasználónevét"
                variant="bordered"
              />
              <Input
                className="min-w-32 flex-1"
                type={isPasswordVisible ? "text" : "password"}
                label="Jelszó"
                placeholder="Adja meg jelszavát"
                variant="bordered"
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
              type="text"
              label="Csapatnév"
              placeholder="Adja meg csapata nevét"
              variant="bordered"
            />
            <Select
              label="Iskola"
              placeholder="Válasszon iskolát"
              variant="faded"
            >
              <SelectItem key="school.id" value="school.id">
                school.name
              </SelectItem>
            </Select>
            <Input
              type="text"
              label="Felkészítő tanár(ok)"
              placeholder="Adja meg tanára(i) nevét"
              description="Több tanár esetén vesszővel válassza el a neveket"
              variant="bordered"
            />
            <Select
              label="Kategória"
              placeholder="Válasszon kategóriát"
              variant="faded"
            >
              <SelectItem key="category.id" value="category.id">
                category.name
              </SelectItem>
            </Select>
            <Select
              label="Programnyelv"
              placeholder="Válasszon programnyelvet"
              variant="faded"
            >
              <SelectItem key="language.id" value="language.id">
                language.name
              </SelectItem>
            </Select>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-4 pb-2">
                <span className="text-sm whitespace-nowrap">Első csapattag</span>
                <Divider className="flex-1" />
              </div>
              <div className="flex flex-wrap gap-4">
                <Input
                  className="min-w-32 flex-1"
                  type="text"
                  label="Név"
                  placeholder="Első csapattag neve"
                  variant="bordered"
                />
                <Input
                  className="max-w-24"
                  type="text"
                  label="Évfolyam"
                  placeholder="Évfolyam"
                  variant="bordered"
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
                  className="min-w-32 flex-1"
                  type="text"
                  label="Név"
                  placeholder="Második csapattag neve"
                  variant="bordered"
                />
                <Input
                  className="max-w-24"
                  type="text"
                  label="Évfolyam"
                  placeholder="Évfolyam"
                  variant="bordered"
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
                  className="min-w-32 flex-1"
                  type="text"
                  label="Név"
                  placeholder="Harmadik csapattag neve"
                  variant="bordered"
                />
                <Input
                  className="max-w-24"
                  type="text"
                  label="Évfolyam"
                  placeholder="Évfolyam"
                  variant="bordered"
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
                  className="min-w-32 flex-1"
                  type="text"
                  label="Név"
                  placeholder="Pót csapattag neve"
                  variant="bordered"
                />
                <Input
                  className="max-w-24"
                  type="text"
                  label="Évfolyam"
                  placeholder="Évfolyam"
                  variant="bordered"
                />
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter>
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
            >Regisztráció</Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}