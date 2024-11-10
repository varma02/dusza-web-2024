"use client"

import { useContext, useEffect, useState } from "react"
import { organizerLoadSchools, handleAddSchool, handleDelSchool } from "@/actions/schoolActions"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { newSchoolSchema } from "@/schemas/newSchoolSchema"

import { ToasterContext } from "@/components/ToasterProvider"
import TableView from "@/components/TableView"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Button, Selection } from "@nextui-org/react"
import { MdVisibility, MdVisibilityOff, MdSchool, MdDelete } from "react-icons/md"

const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "Név", uid: "name", sortable: true},
  {name: "Cím", uid: "address", sortable: true},
  {name: "Kapcsolattartó neve", uid: "contact_name", sortable: true},
  {name: "Kapcsolattartó email címe", uid: "contact_email", sortable: true}
]

const SchoolsPage = () => {
  const toaster = useContext(ToasterContext)
  const [ data, setData ] = useState<{[key: string]: string | number; id: string; name: string;}[]>([])
  const [ selected, setSelected ] = useState<Selection>(new Set([]))

  const addSchoolModal = useDisclosure()
  const delSchoolModal = useDisclosure()

  const [ isPasswordVisible, setIsPasswordVisible ] = useState(false)
  
  const loadSchools = () => {
    organizerLoadSchools()
      .then(data => setData(data))
  }

  useEffect(() => loadSchools(), [])

  const { register, handleSubmit, formState: { isSubmitting, errors }, reset } = useForm<z.infer<typeof newSchoolSchema>>({
    resolver: zodResolver(newSchoolSchema),
    defaultValues: {
      username: "",
      password: "",
      address: "",
      contact_name: "",
      contact_email: ""
    }
  })

  let onclose = () => {}

  const onAddSubmit = async (values: z.infer<typeof newSchoolSchema>) => {
    const res = await handleAddSchool(values)
    if (res) return toaster.newToast(res.message, "danger", "Sikertelen hozzáadás", 5000)

    toaster.newToast("Iskola sikeresen hozzáadva!", "success", "Sikeres hozzáadás", 5000)
    loadSchools()
    onclose()
    reset()
  }

  const onDelSubmit = async () => {
    let ids: string[] = []

    if (selected !== "all" && selected.size === 0) return

    if (selected === "all") ids = data.map(data => data.id)
    else selected.forEach(id => ids.push(id as string))

    const res = await handleDelSchool(ids)
    if (res) return toaster.newToast(res.message, "danger", "Sikertelen törlés", 5000)
    
    toaster.newToast("Iskolák sikeresen törlésre kerültek", "success", "Sikeres törlés", 5000)
    setSelected(new Set([]))
    loadSchools()
  }

  return (
    <main className="flex flex-col gap-6 p-2">
      <h1 className="text-3xl font-bold mt-10">Iskolák</h1>
      <TableView 
        columns={columns}
        data={data} 
        isLoading={data.length == 0}
        initial_visible={["name", "address", "contact_name", "contact_email"]}
        actions={[
          {
            name: "Hozzáadás", 
            description: "Új iskola létrehozása", 
            icon: <MdSchool size="1.5rem" />, 
            handler: () => addSchoolModal.onOpenChange(),
          },
          {
            danger: true,
            name: "Törlés",
            description: "Kijelölt iskolák törlése",
            icon: <MdDelete size="1.5rem" />,
            handler: (s) => {
              setSelected(s)
              if (s === "all" || s.size > 0) delSchoolModal.onOpenChange()
            },
          }
        ]}
      />

      <Modal
        className="w-full max-w-lg p-2"
        isOpen={addSchoolModal.isOpen}
        onOpenChange={addSchoolModal.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onAddSubmit)}
            >
              <ModalHeader>
                <h2 className="w-full text-center text-2xl font-semibold">Iskola hozzáadása</h2>
              </ModalHeader>
              <ModalBody>
                <Input
                  {...register("username")}
                  className="min-w-32 flex-1"
                  type="text"
                  label="Felhasználónév"
                  placeholder="Adjon meg egy felhasználónevét"
                  variant="bordered"
                  isInvalid={errors.username !== undefined}
                  errorMessage={errors.username?.message}
                />
                <Input
                  {...register("password")}
                  className="min-w-32 flex-1"
                  type={isPasswordVisible ? "text" : "password"}
                  label="Jelszó"
                  placeholder="Adjon meg egy jelszót"
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
                <Input
                  {...register("name")}
                  type="text"
                  label="Név"
                  placeholder="Adja meg az iskola nevét"
                  variant="bordered"
                  isInvalid={errors.name !== undefined}
                  errorMessage={errors.name?.message}
                />
                <Input
                  {...register("address")}
                  type="text"
                  label="Cím"
                  placeholder="Adja meg az iskola címét"
                  variant="bordered"
                  isInvalid={errors.address !== undefined}
                  errorMessage={errors.address?.message}
                />
                <Input
                  {...register("contact_name")}
                  type="text"
                  label="Kapcsolattartó név"
                  placeholder="Adja meg a kapcsolattartó nevét"
                  variant="bordered"
                  isInvalid={errors.contact_name !== undefined}
                  errorMessage={errors.contact_name?.message}
                />
                <Input
                  {...register("contact_email")}
                  type="email"
                  label="Kapcsolattartó email"
                  placeholder="Adja meg a kapcsolattartó email címét"
                  variant="bordered"
                  isInvalid={errors.contact_email !== undefined}
                  errorMessage={errors.contact_email?.message}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => { onClose(); reset() }}
                >
                  Mégse
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  isLoading={isSubmitting}
                  onPress={() => { onclose = onClose; reset() }}
                >
                  Hozzáad
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>

      <Modal
        className="w-full max-w-lg p-2"
        isOpen={delSchoolModal.isOpen}
        onOpenChange={delSchoolModal.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form action={onDelSubmit}>            
              <ModalHeader>
                <h2 className="text-2xl font-semibold">Biztosan törölni szeretnéd?</h2>
              </ModalHeader>
              <ModalBody>
                <p>Ez a folyamat nem visszafordítható, az összes kijelölt iskola végleg törlésre kerül.</p>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>
                  Mégse
                </Button>
                <Button
                  type="submit"
                  color="danger"
                  onPress={onClose}
                >
                  Törlés
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </main>
  )
}

export default SchoolsPage