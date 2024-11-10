'use client'

import TableView from "@/components/TableView";
import { MdTextSnippet } from "react-icons/md";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Selection, Textarea, useDisclosure } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { handleHiánypótlás, organizerLoadRegistrations } from "@/actions/organizerActions";
import { ToasterContext } from "@/components/ToasterProvider";

const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "Név", uid: "name", sortable: true},
  {name: "Kategória", uid: "category", sortable: true},
  {name: "Programozási környezet", uid: "programming_language", sortable: true},
  {name: "Elfogadava", uid: "approved", sortable: true},
  {name: "Iskola", uid: "school", sortable: true},
  {name: "Csapattagok (évfolyam)", uid: "members"},
  {name: "Felkészítő tanár(ok)", uid: "teachers"},
  {name: "Jelentketés dátuma", uid: "created_at", sortable: true},
];

export default function OrganizerRegistrations() {
  const toaster = useContext(ToasterContext)

  const hianypotlasModal = useDisclosure();
  const [selected, setSelected] = useState<Selection>(new Set([]));

  const [data, setData] = useState<{ [key: string]: string | number; id: string; name: string; }[]>([]);

  useEffect(() => {
    organizerLoadRegistrations()
    .then((data) => setData(data.map((t) => ({
      id: t.id,
      name: t.name,
      category: t.category.name,
      programming_language: t.programming_language.name,
      approved: t.approved ? "Igen" : "Nem",
      school: t.school.name,
      members: t.members.map((m) => `${m.name} (${m.grade})`).join(", "),
      teachers: t.teachers.replace(",", ", "),
      created_at: new Date(t.created_at).toLocaleString('hu'),
    }))), (e) => console.warn(e));
  }, [])

  const handleAction = async (formData: FormData) => {
    const res = await handleHiánypótlás(formData)
    if (res) return toaster.newToast(res.message, "danger", "Sikertelen üzenetküldés", 5000)

      return toaster.newToast("Üzenet sikeresen elküldve", "success", "Sikeres üzenetküldés", 5000)
  }

  return (
    <main className="flex flex-col gap-6 p-2">
      <h1 className="text-3xl font-bold mt-10">Regisztrációk</h1>
      <TableView 
        columns={columns}
        data={data} 
        isLoading={data.length == 0}
        initial_visible={["name", "category", "school", "programming_language"]} 
        actions={[
          {
            name: "Hiánypótlás", 
            description: "Hiánypótlási kérelem küldése a kijelölt csapatoknak", 
            icon: <MdTextSnippet size="1.5rem" />, 
            handler: (s) => {setSelected(s); hianypotlasModal.onOpenChange()}},
        ]}
      />

      <Modal 
        isOpen={hianypotlasModal.isOpen} 
        onOpenChange={hianypotlasModal.onOpenChange}
        placement="auto"
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <form className="contents" action={handleAction}>
              <ModalHeader className="flex flex-col gap-1">
                Új hiánypótlás
              </ModalHeader>

              <ModalBody>
                <input required type="hidden" name="selected" value={JSON.stringify([...selected])} />
                <Textarea required name="message" label="Üzenet" placeholder="Lorem ipsum dolor sit amet..."/>
              </ModalBody>
              <ModalFooter>
                <Button color="default" onPress={onClose}>
                  Mégse
                </Button>
                <Button color="primary" type="submit" onPress={onClose}>
                  Küldés
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </main>
  )
}
