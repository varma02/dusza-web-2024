import TableView from "~/components/TableView";
import { MdCheckCircle, MdDelete, MdTextSnippet, MdUnpublished } from "react-icons/md";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Selection, Textarea, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { useToaster } from "~/components/ToastProvider";
import { Form } from "@remix-run/react";

const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "Elfogadava", uid: "approved", sortable: true},
  {name: "Iskola elfogadta", uid: "approved_by_school", sortable: true},
  {name: "Név", uid: "name", sortable: true},
  {name: "Kategória", uid: "category", sortable: true},
  {name: "Programozási környezet", uid: "programming_language", sortable: true},
  {name: "Iskola", uid: "school", sortable: true},
  {name: "Csapattagok (évfolyam)", uid: "members"},
  {name: "Felkészítő tanár(ok)", uid: "teachers"},
  {name: "Jelentketés dátuma", uid: "created_at", sortable: true},
];

export default function OrganizerRegistrations() {

  const { newToast } = useToaster();

  const torlesModal = useDisclosure();
  const hianypotlasModal = useDisclosure();
  const [selected, setSelected] = useState<Selection>(new Set([]));

  const data = [
    {id: "123", name: "name", category: "category", school: "school", programming_language: "programming_language", approved: "approved"},
  ]

  return (
    <main className="flex flex-col gap-6 p-2 xl:max-w-screen-2xl min-h-screen xl:mx-auto">
      <h1 className="text-3xl font-bold mt-10">Regisztrációk</h1>
      <TableView 
        columns={columns}
        data={data} 
        isLoading={data.length == 0}
        initial_visible={["name", "category", "school", "programming_language", "approved"]} 
        actions={[
          {
            name: "Hiánypótlás", 
            description: "Hiánypótlási kérelem küldése a kijelölt csapatoknak", 
            icon: <MdTextSnippet size="1.5rem" />, 
            handler: (s) => {setSelected(s); hianypotlasModal.onOpenChange()}
          },
          {
            name: "Elfogadás", 
            description: "A kijelölt regisztrációk elfogadása", 
            icon: <MdCheckCircle size="1.5rem" />, 
            handler: () => {
              newToast("warning", "Elfogadás", "TODO");
            }
          },
          {
            name: "Elfogadás visszavonása", 
            description: "A kijelölt regisztrációk elfogadásának visszavonása", 
            icon: <MdUnpublished size="1.5rem" />, 
            handler: () => {
              newToast("warning", "Elfogadás visszavonása", "TODO");
            }
          },
          {
            danger: true,
            name: "Törlés", 
            description: "A kijelölt regisztrációk törlése", 
            icon: <MdDelete size="1.5rem" />, 
            handler: (s) => {setSelected(s); torlesModal.onOpenChange()}
          },
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
            <Form className="contents" onSubmit={()=>newToast("warning", "Hiánypótlás", "TODO")}>
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
                <Button color="primary" type="submit">
                  Küldés
                </Button>
              </ModalFooter>
            </Form>
          )}
        </ModalContent>
      </Modal>

      <Modal 
        isOpen={torlesModal.isOpen} 
        onOpenChange={torlesModal.onOpenChange}
        placement="auto"
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <Form className="contents" onSubmit={()=>newToast("warning", "Törlés", "TODO")}>
              <ModalHeader className="flex flex-col gap-1">
                Biztosan törölni szeretnéd?
              </ModalHeader>
              <ModalBody>
                <input required type="hidden" name="selected" value={JSON.stringify([...selected])} />
              </ModalBody>
              <ModalFooter>
                <Button color="default" onPress={onClose}>
                  Mégse
                </Button>
                <Button color="primary" type="submit">
                  Küldés
                </Button>
              </ModalFooter>
            </Form>
          )}
        </ModalContent>
      </Modal>
    </main>
  )
}