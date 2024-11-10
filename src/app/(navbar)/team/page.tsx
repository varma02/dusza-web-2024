"use client"

import { useContext, useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { teamEditSchema } from "@/schemas/teamEditSchema"
import { handleTeamEdit, loadTeams } from "@/actions/teamActions"
import { ToasterContext } from "@/components/ToasterProvider"
import { Category, ProgrammingLanguage, Team, TeamMember } from "@prisma/client"

import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure, User } from "@nextui-org/react"
import { dateFormatter } from "@/lib/utils"
import { MdCheckCircle, MdEdit, MdHourglassBottom } from "react-icons/md"

const TeamPage = () => {
  const toaster = useContext(ToasterContext)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [ team, setTeam ] = useState<Team | null>()
  const [ teamMembers, setTeamMembers ] = useState<(TeamMember | undefined)[]>([])
  const [ categories, setCategories ] = useState<Category[]>([])
  const [ category, setCategory ] = useState<Category>()
  const [ progLangs, setProgLangs ] = useState<ProgrammingLanguage[]>([])
  const [ progLang, setProgLang ] = useState<ProgrammingLanguage>()
  
  const setData = () => {
    loadTeams()
      .then(data => {
        setTeam(data.team)
        setTeamMembers(data.teamMembers)
        setCategories(data.categories)
        setCategory(data.category)
        setProgLangs(data.progLangs)
        setProgLang(data.progLang)
      })
  }

  useEffect(() => setData(), [])

  const { register, handleSubmit, formState: { isSubmitting, errors }, reset, } = useForm<z.infer<typeof teamEditSchema>>({resolver: zodResolver(teamEditSchema)});

  let onclose = () => {}

  const onSubmit = async (values: z.infer<typeof teamEditSchema>) => {
    const res = await handleTeamEdit({
      id: team?.id,
      teamMembers,
      values,
    });
    if (res) return toaster.newToast(res.message, "danger", "Sikertelen szerkesztés", 5000)

    toaster.newToast("A csapat adatai módosultak", "success", "Sikeres szerkesztés", 5000)
    setData()
    onclose();
    reset();
  }

  return (
    <main className="grid place-items-center flex-1 p-4">
      <Card className="w-full max-w-xl p-2">
        <CardHeader className="flex justify-between items-center gap-4">
          <h2 className="w-full text-xl text-center font-semibold">
            {team?.name} csapat adatai
          </h2>
        </CardHeader>
        <CardBody className="flex flex-wrap gap-8">
          <div className="flex-1 min-w-max">
            <div className="flex items-center gap-4 pb-2">
              <span className="text-sm whitespace-nowrap text-foreground-500">
                Jelentkezés állapota
              </span>
              <Divider className="flex-1" />
            </div>
            <div className="flex gap-4">
              {team?.approved_by_school ? (
                <Chip
                  startContent={<MdCheckCircle />}
                  variant="flat"
                  color="success"
                  className="px-2"
                >
                  Az iskola elfogadta
                </Chip>
              ) : (
                <Chip
                  startContent={<MdHourglassBottom />}
                  variant="flat"
                  color="warning"
                  className="px-2"
                >
                  Az iskola még nem fogadta el
                </Chip>
              )}
              {team?.approved ? (
                <Chip
                  startContent={<MdCheckCircle />}
                  variant="flat"
                  color="success"
                  className="px-2"
                >
                  A szervezők elfogadták
                </Chip>
              ) : (
                <Chip
                  startContent={<MdHourglassBottom />}
                  variant="flat"
                  color="warning"
                  className="px-2"
                >
                  A szervezők még nem fogadták el
                </Chip>
              )}
            </div>
          </div>
          <div className="min-w-max flex-1">
            <div className="flex items-center gap-4 pb-2">
              <span className="text-sm whitespace-nowrap text-foreground-500">
                Csapattagok
              </span>
              <Divider className="flex-1" />
            </div>
            <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member) => (
                <ul key={member?.id}>
                  <User
                    name={
                      member?.substitute
                        ? `${member?.name} | Pót`
                        : member?.name
                    }
                    description={`${member?.grade}. osztályos diák`}
                    avatarProps={{
                      name: member?.name.charAt(0).toUpperCase(),
                    }}
                  />
                </ul>
              ))}
            </li>
          </div>
          <div className="min-w-[minmax(max,100%)] flex-1">
            <div className="flex items-center gap-4 pb-2">
              <span className="text-sm whitespace-nowrap text-foreground-500">
                Felkészítők
              </span>
              <Divider className="flex-1" />
            </div>
            <li className="flex flex-wrap gap-2">
              {team &&
                team.teachers.split(',').map((teacher) => (
                  <ul key={teacher}>
                    <Chip className="break-words">{teacher}</Chip>
                  </ul>
                ))}
            </li>
          </div>
          {category && progLang ? (
            <div className="min-w-[minmax(max,100%)] flex-1">
              <div className="flex items-center gap-4 pb-2">
                <span className="text-sm whitespace-nowrap text-foreground-500">
                  Kategória
                </span>
                <Divider className="flex-1" />
              </div>
              <li className="flex flex-col gap-4 md:gap-0">
                <ul className="flex flex-col md:flex-row justify-between gap-0 md:gap-4">
                  <span>Megnevezés:</span>
                  <i>{category.name}</i>
                </ul>
                <ul className="flex flex-col md:flex-row justify-between gap-0 md:gap-4">
                  <span>Programnyelv:</span>
                  <i>{progLang.name}</i>
                </ul>
                <ul className="flex flex-col md:flex-row justify-between gap-0 md:gap-4">
                  <span>Jelentkezés kezdete:</span>
                  <i>
                    {dateFormatter.format(
                      new Date(category.valid_from)
                    )}
                  </i>
                </ul>
                <ul className="flex flex-col md:flex-row justify-between gap-0 md:gap-4">
                  <span>Jelentkezés vége:</span>
                  <i>
                    {dateFormatter.format(
                      new Date(category.valid_until)
                    )}
                  </i>
                </ul>
              </li>
            </div>
          ) : null}
        </CardBody>
        <CardFooter>
          <Button
            className="ml-auto"
            variant="flat"
            color="primary"
            onPress={onOpen}
          >
            <MdEdit />
            Adatok szerkesztése
          </Button>
        </CardFooter>
      </Card>

      <Modal
        className="w-full max-w-lg p-2"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <ModalHeader>
                <h2 className="w-full text-center text-2xl font-semibold">
                  Csapat szerkesztése
                </h2>
              </ModalHeader>
              <ModalBody>
                <div>
                  <div className="flex items-center gap-4 pb-2">
                    <span className="text-sm whitespace-nowrap">
                      Első csapattag
                    </span>
                    <Divider className="flex-1" />
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Input
                      {...register('member_1_name')}
                      className="min-w-32 flex-1"
                      type="text"
                      label="Név"
                      placeholder="Első csapattag neve"
                      variant="bordered"
                      defaultValue={teamMembers.at(0)?.name}
                      isInvalid={errors.member_1_name !== undefined}
                      errorMessage={errors.member_1_name?.message}
                    />
                    <Input
                      {...register('member_1_grade')}
                      className="max-w-24"
                      type="text"
                      label="Évfolyam"
                      placeholder="Csapattag évfolyama"
                      variant="bordered"
                      defaultValue={String(teamMembers.at(0)?.grade || "")}
                      isInvalid={errors.member_1_grade !== undefined}
                      errorMessage={errors.member_1_grade?.message}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-4 pb-2">
                    <span className="text-sm whitespace-nowrap">
                      Második csapattag
                    </span>
                    <Divider className="flex-1" />
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Input
                      {...register('member_2_name')}
                      className="min-w-32 flex-1"
                      type="text"
                      label="Név"
                      placeholder="Második csapattag neve"
                      variant="bordered"
                      defaultValue={teamMembers.at(1)?.name}
                      isInvalid={errors.member_2_name !== undefined}
                      errorMessage={errors.member_2_name?.message}
                    />
                    <Input
                      {...register('member_2_grade')}
                      className="max-w-24"
                      type="text"
                      label="Évfolyam"
                      placeholder="Évfolyam"
                      variant="bordered"
                      defaultValue={String(teamMembers.at(1)?.grade || "")}
                      isInvalid={errors.member_2_grade !== undefined}
                      errorMessage={errors.member_2_grade?.message}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-4 pb-2">
                    <span className="text-sm whitespace-nowrap">
                      Harmadik csapattag
                    </span>
                    <Divider className="flex-1" />
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Input
                      {...register('member_3_name')}
                      className="min-w-32 flex-1"
                      type="text"
                      label="Név"
                      placeholder="Harmadik csapattag neve"
                      variant="bordered"
                      defaultValue={teamMembers.at(2)?.name}
                      isInvalid={errors.member_3_name !== undefined}
                      errorMessage={errors.member_3_name?.message}
                    />
                    <Input
                      {...register('member_3_grade')}
                      className="max-w-24"
                      type="text"
                      label="Évfolyam"
                      placeholder="Évfolyam"
                      variant="bordered"
                      defaultValue={String(teamMembers.at(2)?.grade || "")}
                      isInvalid={errors.member_3_grade !== undefined}
                      errorMessage={errors.member_3_grade?.message}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-4 pb-2">
                    <span className="text-sm whitespace-nowrap">
                      Pót csapattag
                    </span>
                    <Divider className="flex-1" />
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Input
                      {...register('member_sub_name')}
                      className="min-w-32 flex-1"
                      type="text"
                      label="Név"
                      placeholder="Pót csapattag neve"
                      defaultValue={teamMembers.at(3)?.name}
                      isInvalid={errors.member_sub_name !== undefined}
                      errorMessage={errors.member_sub_name?.message}
                      variant="bordered"
                    />
                    <Input
                      {...register('member_sub_grade')}
                      className="max-w-24"
                      type="text"
                      label="Évfolyam"
                      placeholder="Évfolyam"
                      defaultValue={String(teamMembers.at(3)?.grade || "")}
                      isInvalid={errors.member_sub_grade !== undefined}
                      errorMessage={errors.member_sub_grade?.message}
                      variant="bordered"
                    />
                  </div>
                </div>
                <Input
                  {...register('teachers')}
                  type="text"
                  label="Felkészítő tanár(ok)"
                  placeholder="Adja meg tanára(i) nevét"
                  description="Több tanár esetén vesszővel válassza el a neveket"
                  variant="bordered"
                  defaultValue={team?.teachers.replaceAll(",", ", ")}
                  isInvalid={errors.teachers !== undefined}
                  errorMessage={errors.teachers?.message}
                />
                {
                  category &&
                  <Select
                    {...register('category')}
                    label="Kategória"
                    placeholder="Válasszon kategóriát"
                    variant="faded"
                    defaultSelectedKeys={[ category.id ]}
                    isInvalid={errors.category !== undefined}
                    errorMessage={errors.category?.message}
                  >
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </Select>
                }
                {
                  progLang &&
                  <Select
                    {...register('programming_language')}
                    label="Programnyelv"
                    placeholder="Válasszon programnyelvet"
                    variant="faded"
                    defaultSelectedKeys={[ progLang.id ]}
                    isInvalid={errors.programming_language !== undefined}
                    errorMessage={errors.programming_language?.message}
                  >
                    {progLangs.map((language) => (
                      <SelectItem key={language.id} value={language.id}>
                        {language.name}
                      </SelectItem>
                    ))}
                  </Select>
                }
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Mégse
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  isLoading={isSubmitting}
                  onPress={() => (onclose = onClose)}
                >
                  Mentés
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </main>
  )
}

export default TeamPage