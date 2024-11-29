import { Button, Card, CardBody, CardFooter, Textarea } from "@nextui-org/react";
import { MdSend } from "react-icons/md";

export default function ChatPage() {
  return (
    <main className="mt-10 flex min-h-[90vh]">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl mb-2">Csevegések</h1>
        <Button className="text-xl h-auto p-4 rounded-r-none justify-start pr-10" variant="light">
          <span className="w-14 h-14 flex justify-center items-center rounded-full bg-content2">Pa</span>
          Palacsinta
        </Button>
        <Button className="text-xl h-auto p-4 rounded-r-none justify-start pr-10">
          <span className="w-14 h-14 flex justify-center items-center rounded-full bg-content2">Ka</span>
          KandOS
        </Button>
        <Button className="text-xl h-auto p-4 rounded-r-none justify-start pr-10" variant="light">
          <span className="w-14 h-14 flex justify-center items-center rounded-full bg-content2">Cs</span>
          Csipet csapat
        </Button>
        <Button className="text-xl h-auto p-4 rounded-r-none justify-start pr-10" variant="light">
          <span className="w-14 h-14 flex justify-center items-center rounded-full bg-content2">Nu</span>
          Null pointer exception
        </Button>
      </div>

      <Card className="w-full">
        <CardBody>
          <ul className="flex flex-col">
            <li className="w-full flex flex-col p-2 gap-2">
              <span className="text-md text-foreground-500">
                KandOS - {(new Date("2020-09-10T11:21:30")).toLocaleString('hu')}
              </span>
              <span className="text-lg bg-content2 p-2 rounded-lg text-wrap max-w-[70%] w-max">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus repudiandae fuga magni velit omnis voluptates quasi dolores corrupti voluptatem, quidem mollitia sed consectetur dicta harum, ab dolorum voluptate, nam vero expedita labore voluptatum consequatur! Eum ut facilis iste deserunt, nemo esse rem! Necessitatibus soluta esse at dolore quo amet sequi.
              </span>
            </li>
            <li className="w-full flex flex-col p-2 gap-2 items-end">
              <span className="text-md text-foreground-500">
                webmester - {(new Date("2024-09-10T11:21:30")).toLocaleString('hu')}
              </span>
              <span className="text-lg p-2 rounded-lg text-wrap bg-primary-100 max-w-[70%] w-max">
                wdym?
              </span>
            </li>
            <li className="w-full flex flex-col p-2 gap-2">
              <span className="text-md text-foreground-500">
                KandOS - {(new Date("2024-09-10T11:23:14")).toLocaleString('hu')}
              </span>
              <span className="text-lg bg-content2 p-2 rounded-lg text-wrap max-w-[70%] w-max">
                Valami nem jó he&apos;
              </span>
            </li>
            <li className="w-full flex flex-col p-2 gap-2 items-end">
              <span className="text-md text-foreground-500">
                webmester - {(new Date("2035-09-10T10:53:04")).toLocaleString('hu')}
              </span>
              <span className="text-lg p-2 rounded-lg text-wrap bg-primary-100 max-w-[70%] w-max">
                Bing chilling
              </span>
            </li>
          </ul>
        </CardBody>
        <CardFooter className="flex-row gap-4">
          <Textarea minRows={1} maxRows={5} placeholder="Írd ide az üzeneted..." />
          <Button isIconOnly><MdSend/></Button>
        </CardFooter>
      </Card>
    </main>
  )
}