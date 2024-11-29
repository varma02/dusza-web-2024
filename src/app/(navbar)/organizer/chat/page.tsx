"use client"

import { handleSendMessage, organizerLoadMessages } from "@/actions/organizerActions";
import { Button, Card, CardBody, CardFooter, Textarea } from "@nextui-org/react";
import { Message, Team } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MdSend } from "react-icons/md";

export default function ChatPage() {
  const { data: session } = useSession()
  const [teams, setTeams] = useState<Team[]>([])
  const [currentTeam, setCurrentTeam] = useState<Team>();

  const [messages, setMessages] = useState<Message[]>([])

  const loadData = () => {
    organizerLoadMessages()
      .then(data => {
        setTeams(data.teams);
        setMessages(data.messages);
      })
  }

  useEffect(() => loadData(), [currentTeam])

  const sendMessage = async (data: FormData) => {
    handleSendMessage(data)
      .then(() => loadData())
  }

  return (
    <main className="mt-10 flex min-h-[90vh]">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl mb-2">Csevegések</h1>
        {
          teams.map(team => (
            <Button key={team.id} className="text-xl h-auto p-4 rounded-r-none justify-start pr-10" variant={currentTeam?.id === team.id ? "solid" : "light"} onClick={() => setCurrentTeam(team)}>
              <span className="w-14 h-14 flex justify-center items-center rounded-full bg-content2">{team.name.slice(0, 2)}</span>
              {team.name}
            </Button>
          ))
        }
      </div>

      <Card className="w-full">
        <CardBody>
          <ul className="flex flex-col">
            {
              currentTeam &&
              messages.map(message => (
                (message.author_id === currentTeam.user_id || message.recipient_id === currentTeam.user_id) &&
                <li key={crypto.randomUUID()} className={`w-full flex flex-col p-2 gap-2 ${message.author_id === session?.user.id && "items-end"}`}>
                  <span className="text-md text-foreground-500">
                    {message.author_id === currentTeam.user_id ? currentTeam.name : session?.user.name} - {(new Date(message.created_at)).toLocaleString('hu')}
                  </span>
                  <span className={`text-lg bg-content2 p-2 rounded-lg text-wrap ${message.author_id === session?.user.id && "bg-primary-100"} max-w-[70%] w-max`}>
                    {message.message}
                  </span>
                </li>
              ))
            }
          </ul>
        </CardBody>
        <CardFooter>
          <form className="w-full flex gap-4" action={sendMessage}>
            <input type="hidden" name="author_id" value={session?.user.id} />
            <input type="hidden" name="recipient_id" value={currentTeam?.user_id} />
            <Textarea name="message" minRows={1} maxRows={5} placeholder="Írd ide az üzeneted..." />
            <Button type="submit" isIconOnly><MdSend/></Button>
          </form>
        </CardFooter>
      </Card>
    </main>
  )
}