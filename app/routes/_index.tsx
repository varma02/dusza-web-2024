import { Image, Card, CardHeader, Button, CardBody, CardFooter, Divider, Link } from '@nextui-org/react'
import { BsPhoneVibrate, BsCodeSquare } from 'react-icons/bs';
import { MdCalendarMonth, MdGroups, MdLanguage, MdSchool } from 'react-icons/md';

export default function Index() {
  return (
    <article className="flex flex-col items-center gap-6 relative min-h-screen">

      <div className="cool-bg-gradient w-screen h-screen absolute z-0"></div>

      <section className="flex flex-col items-center max-w-screen-2xl min-h-screen" id="introduction">
        <Image src="logo-min.webp" alt="AI generált logo" height="10rem"
        className="mt-10" />
        <h1 className="text-4xl font-semibold text-center opacity-90 mt-10 leading-normal">
          <span className="text-6xl">Dusza Árpád</span> <br /> Országos Programozói Emlékverseny
        </h1>
        <h2 className="text-5xl font-bold text-foreground/40 pt-1 z-10">
          2024 - 2025
        </h2>

        <div className="lg:grid lg:grid-cols-3 flex flex-col gap-6 max-w-screen-2xl mt-6">
          <Card className="bg-content1/80 backdrop-blur-xl p-6">
            <CardHeader>
              <MdLanguage size="4rem" />
            </CardHeader>
            <CardBody>
              <h2 className="font-semibold text-2xl">Weblap fejlesztés</h2>
              <p className="text-xl">A weblap fejlesztés kategória lehetőséget biztosít a diákok számára, hogy bemutassák kreativitásukat és technikai tudásukat. A versenyzőknek egy full stack, reszponzív weboldalt kell létrehozniuk, amely megfelel a megadott követelményeknek. A legjobb projektek innovatív megoldásokat, felhasználóbarát felületeket és a legújabb webes technológiákat alkalmazzák.</p>
            </CardBody>
            <CardFooter>
              <Button as={Link} href="#register-now" className="text-xl py-6 px-10">Érdekel</Button>
            </CardFooter>
          </Card>
          <Card className="bg-content1/80 backdrop-blur-xl p-6">
            <CardHeader>
              <BsPhoneVibrate size="4rem" className="scale-110" />
            </CardHeader>
            <CardBody>
              <h2 className="font-semibold text-2xl">Mobil fejlesztés</h2>
              <p className="text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam corporis architecto at, ad necessitatibus voluptatem modi ullam eveniet debitis consequatur illum officiis nam, omnis beatae dolore dolor veritatis! Provident, nam consequuntur, voluptates debitis aperiam distinctio repellendus, placeat consectetur possimus atque deleniti eos laudantium corporis architecto at, ad necessitatibus.</p>
            </CardBody>
            <CardFooter>
              <Button as={Link} href="#register-now" className="text-xl py-6 px-10">Érdekel</Button>
            </CardFooter>
          </Card>
          <Card className="bg-content1/80 backdrop-blur-xl p-6">
            <CardHeader>
              <BsCodeSquare size="4rem" />
            </CardHeader>
            <CardBody>
              <h2 className="font-semibold text-2xl">Hagyományos programozás</h2>
              <p className="text-xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam consequatur qui rerum? Ad vel perspiciatis atque hic sint cupiditate. Libero nostrum iste dolorem at, assumenda temporibus incidunt cupiditate repellat corporis sit nesciunt beatae delectus dolorum architecto ipsam veritatis ratione ea perspiciatis veniam, excepturi quidem voluptates quasi. Aliquid fuga facere iste vel.</p>
            </CardBody>
            <CardFooter>
              <Button as={Link} href="#register-now" className="text-xl py-6 px-10">Érdekel</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      

      <section className="min-h-screen max-w-screen-2xl flex flex-col justify-center" id="register-now">
        <h2 className="text-6xl font-semibold text-center">Regisztrálj most!</h2>

        <div className="flex lg:flex-row flex-col items-center gap-6 mt-10">
          <div className="flex flex-col gap-6 p-4">
            <Card className="p-4">
              <p className="text-4xl">
                <MdGroups className="inline mr-2" /> 3 fős csapat
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-4xl">
                <MdSchool className="inline mr-2" /> 8 - 13. évfolyam
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-4xl pr-4">
                <MdCalendarMonth className="inline mr-2" /> 2024. november 10.
              </p>
            </Card>
          </div>

          <Divider orientation="vertical" className="flex-1 h-auto lg:block hidden" />
          <Divider className="flex-1 h-auto lg:hidden" />

          <div className="grid grid-cols-4 grid-rows-3 gap-6 lg:pr-10">
            <Card className="p-4 w-[4.5rem]"><Image alt="Python logo" src="" /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="C sharp logo" src="" /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="Java logo" src="" /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="Ubuntu logo" src="" /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="Laravel logo" src="" /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="Node js logo" src="" /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="VSCode logo" src="" /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="MySQL logo" src="" /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="Apache logo" src="" /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="Flutter logo" src="" /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="Pycharm logo" src="" /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="React logo" src="" /></Card>
          </div>
        </div>

        <Button as={Link} href="/signup" className="mt-10 py-8 px-12 text-2xl font-semibold w-max mx-auto" color="primary">Regisztrálok</Button>
        <Link href="/signin" className="text-xl mx-auto mt-6 opacity-70 hover:underline" color="foreground">Már regisztráltam</Link>
      </section>
    </article>
  );
}