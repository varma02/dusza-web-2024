import prisma from "@/lib/db"
import { auth } from "@/auth"
import { Card, CardHeader, CardBody } from "@nextui-org/react"

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
      <CardHeader className="flex items-center">
          <h2 className="w-full text-xl text-center font-semibold">Üzenetek</h2>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 flex-1">
          {
            notifications.length > 0 ? (
              notifications.map(notification => (
                <li
                  className="flex flex-col p-2"
                  key={notification.id}
                >
                  <span className="text-md text-foreground-500">
                    Szervezők - {notification.created_at.toLocaleString('hu')}
                  </span>
                  <span className="text-lg bg-content2 p-2 rounded-lg max-w-max text-wrap">
                    {notification.message}
                  </span>
                </li>
              ))
            ) : (
              <div className="flex-1 grid place-items-center">
                <p className="text-foreground-400">Jelenleg nincsenek bejövő üzenetek</p>
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