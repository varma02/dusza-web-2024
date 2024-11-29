'use client'

import { handleCategoryDelete, handleCategoryUpdate, handleProgrammingLanguageDelete, handleProgrammingLanguageUpdate, organizerLoadCategories } from "@/actions/organizerActions";
import { Button, Card, DatePicker, DateValue, Divider, Input, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Selection, Spinner, Textarea, useDisclosure } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { MdAdd, MdChevronRight, MdClose, MdDelete, MdDescription, MdSave, MdTextSnippet } from "react-icons/md";
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
    <main className="flex flex-wrap gap-6 p-2">
      <h1 className="text-3xl font-bold mt-10 w-full">Kategóriák</h1>
      <div className="flex flex-col gap-6 lg:min-h-[80vh] w-1/3">
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
          <input type="hidden" name="valid_until" value={categoryDate?.toString()} />
          <input type="hidden" name="name" value={categoryName} />
          <Button onPress={confirmModal.onOpen}
            className="text-lg w-auto aspect-square bg-content2 hover:bg-danger" 
            isIconOnly 
            color="danger">
              <MdDelete />
          </Button>
          <Button 
            type="submit"
            className="text-lg flex-1" 
            color="primary" 
            startContent={<MdSave />}>
              Mentés
          </Button>
        </form>
      </div>

      <div className="flex flex-col flex-1 gap-6">
        <div className="flex gap-4 items-center">
          <h3 className="text-xl font-bold">Kategória</h3>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-wrap gap-4">
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
        </div>

        <div className="flex gap-4 items-center">
          <h3 className="text-xl font-bold text-nowrap">Programozási környezetek</h3>
          <Divider className="flex-1" />
        </div>
        <Card className="p-2 min-h-52">
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
      
        <div className="flex gap-4 items-center">
          <h3 className="text-xl font-bold">Feladat</h3>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-4">
          <Textarea required name="description" 
          labelPlacement="outside" maxRows={10}
          label="Feladat szövege (Markdown formázás)"
          placeholder="Lorem ipsum dolor sit amet..."/>
          <label htmlFor="attachments" className="text-small -mb-2">Csatolmányok</label>
          <div className="flex flex-wrap gap-4">
            <Card className="p-2 pl-4 flex-row items-center gap-2">
              <MdDescription />
              Attachment1.pdf
              <Button color="danger" variant="light" isIconOnly><MdClose/></Button>
            </Card>
            <Card className="p-2 pl-4 flex-row items-center gap-2">
              <MdDescription />
              Attachment2.txt
              <Button color="danger" variant="light" isIconOnly><MdClose/></Button>
            </Card>
            <Card className="p-2 pl-4 flex-row items-center gap-2">
              <MdDescription />
              Attachment3.jpeg
              <Button color="danger" variant="light" isIconOnly><MdClose/></Button>
            </Card>
            <div className="relative flex gap-2 p-4 items-center justify-center border-2 border-dashed border-zinc-600 hover:border-primary transition-colors rounded-lg">
              <MdAdd /> Fájl hozzáadása
              <input type="file" name="attachments" id="attachments" placeholder="Csatolmányok hozzáadása"
              className="opacity-0 absolute z-50 top-0 left-0 w-full h-full cursor-pointer" />
            </div>
          </div>
        </div>
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