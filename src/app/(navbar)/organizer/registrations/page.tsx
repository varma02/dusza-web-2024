'use client'

import TableView from "@/components/TableView";
import { MdCheckCircle, MdDelete, MdTextSnippet, MdUnpublished } from "react-icons/md";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Selection, Textarea, useDisclosure } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { handleSendMessages, handleTeamApprove, handleTeamDelete, handleTeamDisapprove, organizerLoadRegistrations } from "@/actions/organizerActions";
import { ToasterContext } from "@/components/ToasterProvider";

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

  const { newToast } = useContext(ToasterContext);

  const torlesModal = useDisclosure();
  const hianypotlasModal = useDisclosure();
  const [selected, setSelected] = useState<Selection>(new Set([]));

  const [data, setData] = useState<{ [key: string]: string | number; id: string; name: string; }[]>([]);

  function fetchRegistrations() {
    organizerLoadRegistrations()
    .then((data) => setData(data.map((t) => ({
      id: t.id,
      name: t.name,
      category: t.category.name,
      programming_language: t.programming_language.name,
      approved: t.approved ? t.approved_by_school ? "Igen" : "Iskola válaszára vár" : "Nem",
      approved_by_school: t.approved_by_school ? "Igen" : "Nem",
      school: t.school.name,
      members: t.members.map((m) => `${m.name} (${m.grade})`).join(", "),
      teachers: t.teachers.replace(",", ", "),
      created_at: new Date(t.created_at).toLocaleString('hu'),
    }))), (e) => console.warn(e));
  }

  useEffect(() => {
    fetchRegistrations();
  }, [])

  return (
    <main className="flex flex-col gap-6 p-2">
      <h1 className="text-3xl font-bold mt-10">Regisztrációk</h1>
      <TableView 
        columns={columns}
        data={data} 
        isLoading={data.length == 0}
        initial_visible={["name", "category", "school", "programming_language", "approved"]} 
        actions={[
          {
            name: "Üzenet", 
            description: "Üzenet küldése a kijelölt csapatoknak", 
            icon: <MdTextSnippet size="1.5rem" />, 
            handler: (s) => {setSelected(s); hianypotlasModal.onOpenChange()}
          },
          {
            name: "Elfogadás", 
            description: "A kijelölt regisztrációk elfogadása", 
            icon: <MdCheckCircle size="1.5rem" />, 
            handler: (s) => {
              handleTeamApprove(JSON.stringify([...s]))
              .then(() => newToast("Kijelölt regisztrációk elfogadva", "success", "", 5000),
                () => newToast("Nem sikerült elfogadni a regisztrációkat", "danger", "Hiba történt", 5000)
              ).finally(() => fetchRegistrations());
            }
          },
          {
            name: "Elfogadás visszavonása", 
            description: "A kijelölt regisztrációk elfogadásának visszavonása", 
            icon: <MdUnpublished size="1.5rem" />, 
            handler: (s) => {
              handleTeamDisapprove(JSON.stringify([...s]))
              .then(() => newToast("Elfogadások visszavonva", "success", "", 5000),
                () => newToast("Nem sikerült visszavonniaz elfogdásokat", "danger", "Hiba történt", 5000)
              ).finally(() => fetchRegistrations());
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
            <form className="contents" action={(data:FormData) => {
              handleSendMessages(data)
              .then(() => newToast("Üzenet sikeresen elküldve", "success", "", 5000),
                () => newToast("Nem sikerült elüldeni az üzeneteket", "danger", "Hiba történt", 5000)
              ).finally();
              onClose();
            }}>
              <ModalHeader className="flex flex-col gap-1">
                Üzenet küldése
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
            </form>
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
            <form className="contents" action={(data:FormData) => {
              handleTeamDelete(data)
              .then(() => newToast("Regisztrációk törölve", "success", "", 5000),
                () => newToast("Nem sikerült törölni a regisztrációkat", "danger", "Hiba történt", 5000)
              ).finally(() => fetchRegistrations());
              onClose();
            }}>
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
            </form>
          )}
        </ModalContent>
      </Modal>
    </main>
  )
}
