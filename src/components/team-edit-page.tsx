'use client';

import { dateFormatter } from '@/lib/utils';
import {
  Category,
  ProgrammingLanguage,
  Team,
  TeamMember,
} from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { teamEditSchema } from '@/schemas/teamEditSchema';
import { handleTeamEdit } from '@/actions/editActions';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  User,
  Chip,
  CardFooter,
  Modal,
  ModalContent,
  useDisclosure,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { MdEdit } from 'react-icons/md';
import { useRouter } from 'next/navigation';

export const TeamEditPage = ({
  team,
  teamMembers,
  categories,
  programmingLanguages,
}: {
  team: Team | null;
  teamMembers: TeamMember[];
  categories: Category[];
  programmingLanguages: ProgrammingLanguage[];
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [globalError, setGlobalError] = useState<string>();

  const category = categories.find(
    (category) => category.id === team?.category_id
  );
  const programmingLanguage = programmingLanguages.find(
    (language) => language.id === team?.programming_language_id
  );

  const fixMembers = teamMembers.filter(
    (member) => !member.substitute
  );
  const subMember = teamMembers.find((member) => member.substitute);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<z.infer<typeof teamEditSchema>>({
    resolver: zodResolver(teamEditSchema),
    defaultValues: {
      member_1_name: fixMembers.at(0)?.name,
      member_1_grade: String(fixMembers.at(0)?.grade),
      member_2_name: fixMembers.at(1)?.name,
      member_2_grade: String(fixMembers.at(1)?.grade),
      member_3_name: fixMembers.at(2)?.name,
      member_3_grade: String(fixMembers.at(2)?.grade),
      member_sub_name: subMember?.name,
      member_sub_grade: String(subMember?.grade || ''),
      teachers: team?.teachers.replace(',', ', '),
      category: category?.id,
      programming_language: programmingLanguage?.id,
    },
  });

  let onclose = () => {};

  const onSubmit = async (values: z.infer<typeof teamEditSchema>) => {
    const res = await handleTeamEdit({
      id: team?.id,
      teamMembers: [...fixMembers, subMember],
      values,
    });
    if (res) return setGlobalError(res.message);

    onclose();
    reset();
    router.refresh();
  };

  return (
    <main className="grid place-items-center flex-1 p-4">
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
                      isInvalid={
                        errors.member_sub_grade !== undefined
                      }
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
                  isInvalid={errors.teachers !== undefined}
                  errorMessage={errors.teachers?.message}
                />
                <Select
                  {...register('category')}
                  label="Kategória"
                  placeholder="Válasszon kategóriát"
                  variant="faded"
                  isInvalid={errors.category !== undefined}
                  errorMessage={errors.category?.message}
                >
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  {...register('programming_language')}
                  label="Programnyelv"
                  placeholder="Válasszon programnyelvet"
                  variant="faded"
                  isInvalid={
                    errors.programming_language !== undefined
                  }
                  errorMessage={errors.programming_language?.message}
                >
                  {programmingLanguages?.map((language) => (
                    <SelectItem key={language.id} value={language.id}>
                      {language.name}
                    </SelectItem>
                  ))}
                </Select>
                {globalError && (
                  <p className="text-center text-danger">
                    {globalError}
                  </p>
                )}
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

      <Card className="w-full max-w-xl p-2">
        <CardHeader className="flex justify-between items-center gap-4">
          <h2 className="w-full text-xl text-center font-semibold">
            {team?.name} csapat adatai
          </h2>
        </CardHeader>
        <CardBody className="flex flex-wrap gap-8">
          <div className="min-w-max flex-1">
            <div className="flex items-center gap-4 pb-2">
              <span className="text-sm whitespace-nowrap text-foreground-500">
                Csapattagok
              </span>
              <Divider className="flex-1" />
            </div>
            <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member) => (
                <ul key={member.id}>
                  <User
                    name={
                      member.substitute
                        ? `${member.name} | Pót`
                        : member.name
                    }
                    description={`${member.grade}. osztályos diák`}
                    avatarProps={{
                      name: member.name.charAt(0).toUpperCase(),
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
          {category && programmingLanguage ? (
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
                  <i>{programmingLanguage.name}</i>
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
    </main>
  );
};
