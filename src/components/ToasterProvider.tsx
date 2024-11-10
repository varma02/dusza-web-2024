import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { motion } from "framer-motion";
import { uniqueId } from "lodash";
import { createContext, useState } from "react";
import { MdCheckCircle, MdClose, MdDangerous, MdInfo, MdWarning } from "react-icons/md";


export const ToasterContext = createContext({
  newToast: (message: string, type: "info" | "danger" | "warning" | "success", title?: string, timeout?: number) => {console.log(message, type, title, timeout)},
});

export default function ToasterProvider({ children } : {children: React.ReactNode}) {

  const [toasts, setToasts] = useState<{id: string, message:string, type:string, title?:string, timeout?: number}[]>([]);

  return (
    <>
    <aside className="fixed right-0 bottom-0 p-6 flex flex-col gap-4 z-[100] xl:max-w-[25vw] sm:max-w-[50vw]">
      {toasts.map((toast) => (
        <Card key={toast.id} classNames={{base: "flex-row", header: "w-auto", body: "w-auto", footer: "w-auto"}}>
          <CardHeader className="text-3xl pr-0">
            {toast.type == "success" ? <MdCheckCircle className="text-success" />
            : toast.type == "danger" ? <MdDangerous className="text-danger" /> 
            : toast.type == "warning" ? <MdWarning className="text-warning" />
            : <MdInfo className="text-primary" />}
          </CardHeader>
          <CardBody className="justify-center flex-1">
            <h6 className="text-lg font-bold">{toast.title}</h6>
            <p className="text-lg">{toast.message}</p>
          </CardBody>
          <CardFooter>
            <Button isIconOnly variant="ghost" className="border-none"
            onClick={() => setToasts(toasts.filter((v) => v.id != toast.id ))}>
              <MdClose className="text-xl" />
            </Button>
          </CardFooter>
          {toast.timeout && 
            <motion.div 
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: toast.timeout / 1000 }}
            className="absolute bottom-0 left-0 w-full h-0.5 bg-primary">
            </motion.div>
          }
        </Card>
      ))}
    </aside>
    <ToasterContext.Provider value={{
      newToast: (message, type, title, timeout) => {;
        const tid = uniqueId();
        setToasts((val) => [...val, {id: tid, message, type: type || "info", title, timeout: timeout || 5000}]);
        setTimeout(() => setToasts((val)=>val.filter((v) => v.id != tid )), timeout || 5000);
      }
    }}>
      {children}
    </ToasterContext.Provider>
    </>
  )
}