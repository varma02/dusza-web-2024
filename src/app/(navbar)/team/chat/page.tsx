"use client"

import { handleSendMessage } from "@/actions/organizerActions";
import { loadMessages } from "@/actions/teamActions";
import { Button, Card, CardBody, CardFooter, Textarea } from "@nextui-org/react";
import { Message } from "@prisma/client";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import { MdSend } from "react-icons/md";

export default function ChatPage() {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [messages, setMessages] = useState<Message[]>([])

  const loadData = () => {
    loadMessages()
      .then(data => {
        setUser(data.user)
        setMessages(data.messages);
      })
  }

  useEffect(() => loadData(), [])

  const sendMessage = async (data: FormData) => {
    handleSendMessage(data)
      .then(() => loadData())
  }

  return (
    <main className="mt-10 flex min-h-[90vh]">
      <Card className="w-full">
        <CardBody>
          <ul className="flex flex-col">
            {
              messages.map(message => (
                <li key={crypto.randomUUID()} className={`w-full flex flex-col p-2 gap-2 ${message.author_id === user?.id && "items-end"}`}>
                  <span className="text-md text-foreground-500">
                    {(message as Message & { author: User }).author && (message as Message & { author: User }).author.username || user?.name} - {(new Date(message.created_at)).toLocaleString('hu')}
                  </span>
                  <span className={`text-lg bg-content2 p-2 rounded-lg text-wrap ${message.author_id === user?.id && "bg-primary-100"} max-w-[70%] w-max`}>
                    {message.message}
                  </span>
                </li>
              ))
            }
          </ul>
        </CardBody>
        <CardFooter>
          <form className="w-full flex gap-4" action={sendMessage}>
            <input type="hidden" name="author_id" value={user?.id} />
            <Textarea name="message" minRows={1} maxRows={5} placeholder="Írd ide az üzeneted..." />
            <Button type="submit" isIconOnly><MdSend/></Button>
          </form>
        </CardFooter>
      </Card>
    </main>
  )
}