import prisma from "@/lib/db"
import { auth } from "@/auth"
import { Card, CardHeader, CardBody } from "@nextui-org/react"
import { dateFormatter } from "@/lib/utils"

const NotificationsPage = async () => {
  const session = await auth()

  const team = await prisma.team.findUnique({
    where: { user_id: session?.user.id }
  })

  const notifications = await prisma.notifications.findMany({
    where: { team_id: team?.id }
  })

  return (
    <main className="grid place-items-center flex-1 p-4">
      <Card className="w-full max-w-xl min-h-80 p-2">
      <CardHeader className="flex justify-between items-center gap-4">
          <h2 className="w-full text-xl text-center font-semibold">Üzenetek</h2>
        </CardHeader>
        <CardBody className="flex flex-col">
          {
            notifications.length > 0 ? (
              notifications.map(notification => (
                <li
                  className="flex justify-between p-2 last-of-type:border-none border-b border-foreground-200"
                  key={notification.id}
                >
                  <span className="text-lg">
                    {notification.message}
                  </span>
                  <span className="text-md text-foreground-500">
                    {dateFormatter.format(notification.created_at)}
                  </span>
                </li>
              ))
            ) : (
              <div className="flex-1 grid place-items-center">
                <p className="text-foreground-400">Jelenleg nincs egyetlen bejövő üzenet sem</p>
              </div>
            )
          }
          <ul>
          </ul>
        </CardBody>
      </Card>
    </main>
  )
}

export default NotificationsPage