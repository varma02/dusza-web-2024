"use client"

import "@/assets/github-markdown.css"

import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react"
import { MdDescription, MdFileDownload, MdUploadFile, MdClose } from "react-icons/md"

import { ChangeEvent, useEffect, useState } from "react"
import Markdown from "react-markdown"
import { loadTask } from "@/actions/teamActions"
import { Category } from "@prisma/client"

const TaskPage = () => {
  const [ task, setTask ] = useState<Category | null>()
  const [ files, setFiles ] = useState<File[]>([])

  useEffect(() => {
    loadTask()
      .then(data => setTask(data))
  }, [])

  const attachments = [ "test-file.txt" ]

  const addFile = (event: ChangeEvent) => {
    const files = (event.target as HTMLInputElement).files
    if (!files) return

    setFiles(prevFiles => [ ...prevFiles, ...files ])
  }

  const removeFile = (file: File) => {
    const index = files.indexOf(file)

    setFiles(prevFiles => {
      prevFiles.splice(index, 1)
      return [ ...prevFiles ]
    })
  }

  return (
    <main className="h-full flex flex-col gap-6 p-2">
      <Card className="border-0 shadow-none bg-transparent">
        <CardBody>
          <Markdown className={"react-markdown"}>{task?.task}</Markdown>
        </CardBody>
        <CardFooter className="flex flex-col items-baseline gap-4">
          {
            attachments.length > 0 &&
            <ul className="flex gap-2">
              {attachments.map(attachment => (
                <li key={attachment}>
                  <Card>
                    <CardHeader className="flex gap-2">
                      <MdDescription />
                      <span>{attachment}</span>
                      <Button
                        size="sm"
                        variant="light"
                        isIconOnly
                      >
                        <MdFileDownload />
                      </Button>
                    </CardHeader>
                  </Card>
                </li>
              ))}
            </ul>
          }
        </CardFooter>
      </Card>
      <Card className="mt-10">
        <form>
          <CardBody>
            {
              files.length === 0 &&
              <div className="relative w-full h-full grid place-items-center border-2 border-dashed border-zinc-600 hover:border-primary p-4 rounded-md group">
                <MdUploadFile className="text-zinc-600 group-hover:text-primary" size={28} />
                <input
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  type="file"
                  multiple={true}
                  onChange={addFile}
                />
              </div>
            }
            <ul className="flex flex-wrap gap-2">
              {files.map(file => (
                <li key={file.name} className="flex-1">
                  <Card>
                    <CardHeader className="flex justify-between gap-2">
                      <span key={file.name}>{file.name}</span>
                      <Button
                        className="rounded-full"
                        size="sm"
                        variant="flat"
                        isIconOnly
                        onClick={() => removeFile(file)}
                      >
                        <MdClose />
                      </Button>
                    </CardHeader>
                  </Card>
                </li>
              ))}
            </ul>
          </CardBody>
          <CardFooter className="flex justify-between gap-2">
            <div className="flex gap-2">
              <Button
                color="danger"
                isDisabled={files.length === 0}
                onClick={() => setFiles([])}
              >
                Összes törlése
              </Button>
              <Button
                className="relative"
                variant="bordered"
                color="primary"
                isDisabled={files.length === 0}
              >
                Fájl hozzáadása
                <input
                  className="z-10 absolute left-0 top-0 w-full h-full opacity-0"
                  type="file"
                  onChange={addFile}
                />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <span>Határidő: {new Date(task?.valid_until || 0).toLocaleString("hu-HU")}</span>
              <Button
                type="submit"
                color="primary"
                isDisabled={files.length === 0}
              >
                Leadás
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}

export default TaskPage