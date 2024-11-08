import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Link } from "@nextui-org/react"
import Logo from "@/assets/logo-min.webp"
import { BsCodeSquare, BsGlobe, BsPhoneVibrate } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { RiCalendarScheduleFill, RiNextjsFill } from "react-icons/ri";

import PythonIcon from "@/assets/icons/python.svg";
import CsharpIcon from "@/assets/icons/csharp.svg";
import JavaIcon from "@/assets/icons/java.svg";
import UbuntuIcon from "@/assets/icons/ubuntu.svg";
import LaravelIcon from "@/assets/icons/laravel.svg";
import NodejsIcon from "@/assets/icons/nodejs.svg";
import VSCodeIcon from "@/assets/icons/vscode.svg";
import MySqlIcon from "@/assets/icons/mysql.svg";
import ApacheIcon from "@/assets/icons/apache.svg";
import FlutterIcon from "@/assets/icons/flutter.svg";
import PycharmIcon from "@/assets/icons/pycharm.svg";
import ReactIcon from "@/assets/icons/react.svg";

export default async function Home() {
  return (
    <article className="flex flex-col items-center gap-6 relative min-h-screen">

      <div className="cool-bg-gradient w-screen h-screen absolute z-0"></div>

      <section className="flex flex-col items-center max-w-screen-2xl h-screen" id="introduction">
        <Image src={Logo.src} alt="AI generált logo" height="10rem"
        className="mt-10" />
        <h1 className="text-4xl font-semibold text-center opacity-90 mt-10 leading-normal">
          <span className="text-6xl">Dusza Árpád</span> <br /> Országos Programozói Emlékverseny
        </h1>
        <h2 className="text-5xl font-bold text-foreground/80 pt-1">
          2024 - 2025
        </h2>

        <div className="grid grid-cols-3 gap-6 max-w-screen-2xl mt-6">
          <Card className="bg-content1/80 backdrop-blur-xl p-6">
            <CardHeader>
              <BsGlobe size="4rem" />
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
      

      <section className="h-screen max-w-screen-2xl flex flex-col justify-center" id="register-now">
        <h2 className="text-6xl font-semibold text-center">Regisztrálj most!</h2>

        <div className="flex gap-6 mt-10">
          <div className="flex flex-col gap-6">
            <Card className="p-4">
              <p className="text-4xl">
                <FaUsers className="inline mr-2" /> 3 fős csapat
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-4xl">
                <MdSchool className="inline mr-2" /> 8 - 13. évfolyam
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-4xl pr-4">
                <RiCalendarScheduleFill className="inline mr-2" /> 2024. november 10.
              </p>
            </Card>
          </div>

          <Divider orientation="vertical" className="flex-1 h-auto" />

          <div className="grid grid-cols-4 grid-rows-3 gap-6 pr-10">
            <Card className="p-4 w-[4.5rem]"><Image alt="Python logo" src={PythonIcon.src} /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="C sharp logo" src={CsharpIcon.src} /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="Java logo" src={JavaIcon.src} /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="Ubuntu logo" src={UbuntuIcon.src} /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="Laravel logo" src={LaravelIcon.src} /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="Node js logo" src={NodejsIcon.src} /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="VSCode logo" src={VSCodeIcon.src} /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="MySQL logo" src={MySqlIcon.src} /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="Apache logo" src={ApacheIcon.src} /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="Flutter logo" src={FlutterIcon.src} /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="Pycharm logo" src={PycharmIcon.src} /></Card>
            <Card className="p-4 w-[4.5rem]"><Image alt="React logo" src={ReactIcon.src} /></Card>
          </div>
        </div>

        <Button as={Link} href="/signup" className="mt-10 py-8 px-12 text-2xl font-semibold w-max mx-auto" color="primary">Regisztrálok</Button>
        <Link href="/signin" className="text-xl mx-auto mt-6 opacity-70 hover:underline" color="foreground">Már regisztráltam</Link>
      </section>

      <footer className="mt-20 bg-content1 w-screen p-6 flex items-center justify-center text-foreground/70">
        Made with ❤️ by the KandOS team.
      </footer>
    </article>

  );
}