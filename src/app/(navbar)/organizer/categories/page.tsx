'use client'

import { handleCategoryDelete, handleCategoryUpdate, handleProgrammingLanguageDelete, handleProgrammingLanguageUpdate, organizerLoadCategories } from "@/actions/organizerActions";
import { Button, Card, DatePicker, DateValue, Input, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Selection, Spinner, useDisclosure } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { MdAdd, MdChevronRight, MdDelete, MdSave, MdTextSnippet } from "react-icons/md";
import { fromDate } from "@internationalized/date";
import { ToasterContext } from "@/components/ToasterProvider";

export default function CategoriesPage() {

  const [categories, setCategories] = useState<ReturnType<typeof organizerLoadCategories> extends Promise<infer R> ? R : never | null>([]);

  const [selectedCategory, setSelectedCategory] = useState<Selection>(new Set(['new_category']));
  const [selectedProgrammingLanguage, setSelectedProgrammingLanguage] = useState<Selection>(new Set(['new_programming_language']));

  const [categoryDate, setCategoryDate] = useState<DateValue>();
  const [categoryName, setCategoryName] = useState<string>();
  const [programmingLanguageName, setProgrammingLanguageName] = useState<string>();
  
  const confirmModal = useDisclosure();

  const { newToast } = useContext(ToasterContext);

  useEffect(() => {
    const selected = categories.find((v) => new Set(selectedCategory).has(v.id));
    setCategoryName(selected?.name || "");
    setCategoryDate(fromDate(selected?.valid_until || new Date(), "Europe/Budapest"));
  }, [selectedCategory, categories])

  useEffect(() => {
    const selected = categories.find((v) => new Set(selectedCategory).has(v.id))?.programmingLanguages.find((v) => new Set(selectedProgrammingLanguage).has(v.id));
    setProgrammingLanguageName(selected?.name || "");
  }, [selectedCategory, selectedProgrammingLanguage, categories])

  function fetchCategories() {
    organizerLoadCategories()
    .then((data) => setCategories(data), (e) => console.warn(e));
  }
  useEffect(() => fetchCategories(), [])

  return (
    <main className="flex lg:flex-row flex-col gap-6 p-2">
      <div className="flex flex-col flex-1 gap-6 lg:min-h-[50vh]">
        <h1 className="text-3xl font-bold mt-10">Kategóriák</h1>
        <Card className="p-2 flex-1">
          {categories.length ? (
          <Listbox 
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedCategory}
              onSelectionChange={setSelectedCategory}
              emptyContent="Nincs adat"
            >
              {[...categories.map((cat) => (
                <ListboxItem 
                  classNames={{ base: "data-[selected=true]:bg-content2", title: "text-lg", description: "text-md"}}
                  selectedIcon={(props) => <MdChevronRight className={props.isSelected ? "block" : "hidden"} />} 
                  key={cat.id} description={`Határidő: ${cat.valid_until.toLocaleString('hu')}`}>
                    {cat.name}
                </ListboxItem>
              )),
              <ListboxItem 
                classNames={{ base: "data-[selected=true]:bg-content2", title: "text-lg", description: "text-md"}}
                selectedIcon={(props) => <MdChevronRight className={props.isSelected ? "block" : "hidden"} />} 
                key="new_category" startContent={<MdAdd size="1.2rem" />}>
                  Új kategória
              </ListboxItem>
              ]}
          </Listbox>
          ) : <Spinner />}
        </Card>
        <form className="flex gap-4 items-end lg:flex-row flex-col" action={(formData: FormData) => {
          handleCategoryUpdate(formData)
          .then(() => newToast("Sikeres mentés", "success", "", 5000), 
          () => newToast("Nem sikerült menteni a kategóriát", "danger", "Hiba történt", 5000))
          .finally(() => fetchCategories());
        }}>
          <input type="hidden" name="id" value={[...selectedCategory][0]} />
          <Input 
            isRequired 
            value={categoryName}
            onValueChange={setCategoryName}
            name="name" 
            className="flex-1" 
            startContent={<MdTextSnippet />} 
            label="Kategória neve" 
            labelPlacement="outside" 
            placeholder="Lorem ipsum dolor..." />
          <DatePicker 
            isRequired 
            hideTimeZone  
            value={categoryDate}
            onChange={setCategoryDate}
            name="valid_until" 
            classNames={{base: "w-auto lg:w-auto w-full"}} 
            label="Határidő" 
            labelPlacement="outside" />
          <div className="flex lg:flex-none flex-1 gap-4">
            <Button 
              type="submit"
              className="text-lg" 
              color="primary" 
              startContent={<MdSave />}>
                Mentés
            </Button>
            <Button onPress={confirmModal.onOpen}
              className="text-lg w-auto aspect-square bg-content2 hover:bg-danger" 
              isIconOnly 
              color="danger">
                <MdDelete />
            </Button>
          </div>
        </form>
      </div>

      <div className="flex flex-col flex-1 gap-6 lg:min-h-[50vh]">
        <h1 className="text-3xl font-bold mt-10">Programozási környezetek</h1>
        <Card className="p-2 flex-1">
          {categories.length ? (
          <Listbox 
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedProgrammingLanguage}
              onSelectionChange={setSelectedProgrammingLanguage}
              emptyContent="Nincs adat"
            >
              {[...(categories.find((v) => new Set(selectedCategory).has(v.id)) || {programmingLanguages:[]}).programmingLanguages.map((pl) => (
                <ListboxItem classNames={{ base: "data-[selected=true]:bg-content2", title: "text-lg"}} key={pl.id}>
                  {pl.name}
                </ListboxItem>
              )),
                <ListboxItem classNames={{ base: "data-[selected=true]:bg-content2", title: "text-lg"}} key="new_programming_language"
                startContent={<MdAdd size="1.2rem" />}>
                  Új programozási környezet
                </ListboxItem>
              ]}
          </Listbox>
          ) : <Spinner />}
        </Card>
        <form className="flex gap-4 items-end lg:flex-row flex-col" action={(formData: FormData) => {
          handleProgrammingLanguageUpdate(formData)
          .then(() => newToast("Sikeres mentés", "success", "", 5000), 
          () => newToast("Nem sikerült menteni a programozási környezetet", "danger", "Hiba történt", 5000))
          .finally(() => fetchCategories());
        }}>
          <input type="hidden" name="category_id" value={[...selectedCategory][0]} />
          <input type="hidden" name="id" value={[...selectedProgrammingLanguage][0]} />
          <Input 
            isRequired 
            value={programmingLanguageName}
            onValueChange={setProgrammingLanguageName}
            name="name"
            className="flex-1" 
            startContent={<MdTextSnippet />} 
            label="Programozási környezet neve" 
            labelPlacement="outside" 
            placeholder="Lorem ipsum dolor..." />
          <div className="flex lg:flex-none flex-1 gap-4">
            <Button 
              type="submit"
              className="text-lg" 
              color="primary" 
              startContent={<MdSave />}>
                Mentés
            </Button>
            <Button  onPress={() => {
                    handleProgrammingLanguageDelete([...selectedProgrammingLanguage][0].toString())
                    .then(() => newToast("Sikeres törlés", "success", "", 5000), 
                    () => newToast("Nem sikerült törölni a programozási környezetet", "danger", "Hiba történt", 5000))
                    .finally(() => fetchCategories());
                  }}
              className="text-lg w-auto aspect-square bg-content2 hover:bg-danger" 
              isIconOnly 
              color="danger">
                <MdDelete />
            </Button>
          </div>
        </form>
      </div>

      <Modal isOpen={confirmModal.isOpen} onOpenChange={confirmModal.onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Biztosan törölni szeretnéd?</ModalHeader>
              <ModalBody>
                <p> A kategória törlésével az összes hozzá tartozó programozási környezet is törlődik. </p>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>
                  Mégse
                </Button>
                <Button color="danger" onPress={() => {
                  handleCategoryDelete([...selectedCategory][0].toString())
                  .then(() => newToast("Sikeres törlés", "success", "", 5000), 
                  () => newToast("Nem sikerült törölni a kategóriát", "danger", "Hiba történt", 5000))
                  .finally(() => fetchCategories());
                  onClose();
                }}>
                  Törlés
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}