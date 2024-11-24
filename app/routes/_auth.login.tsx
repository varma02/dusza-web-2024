import { Card, CardBody, CardHeader, Input, Button, Link } from "@nextui-org/react"
import { MdVisibility, MdVisibilityOff, MdArrowBack } from "react-icons/md"
import { useState } from "react"

export default function LoginPage() {
  const [ isPasswordVisible, setIsPasswordVisible ] = useState(false)

  return (
    <Card className="w-full max-w-lg p-2">
      <CardHeader>
        <h1 className="w-full text-center text-2xl font-semibold">Bejelentkezés</h1>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
        >
          <Input
            type="text"
            label="Felhasználónév"
            placeholder="Adja meg felhasználónevét"
            variant="bordered"
          />
          <Input
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
            >Bejelentkezés</Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}