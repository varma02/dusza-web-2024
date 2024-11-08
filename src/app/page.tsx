import { Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react"
import Logo from "@/assets/logo-min.webp"
import { BsCodeSlash, BsCodeSquare, BsGlobe, BsPhoneVibrate } from "react-icons/bs";

export default async function Home() {
  return (
    <article className="flex flex-col items-center gap-6 relative min-h-screen">

      <div className="bg-gradient w-screen h-screen absolute z-0"></div>

      <section className="flex flex-col items-center">
        <Image src={Logo.src} alt="AI generált logo" height="10rem"
        className="mt-10" />
        <h1 className="text-4xl font-semibold text-center opacity-90 mt-10 leading-normal">
          <span className="text-6xl">Dusza Árpád</span> <br /> Országos Programozói Emlékverseny
        </h1>
        <h2 className="text-5xl font-bold text-foreground/80 pt-1">
          2024 - 2025
        </h2>
      </section>
      
      <section className="grid grid-cols-3 gap-6 max-w-screen-2xl">
        <Card className="bg-content1/80 backdrop-blur-xl p-6">
          <CardHeader>
            <BsGlobe size="4rem" />
          </CardHeader>
          <CardBody>
            <h2 className="font-semibold text-2xl">Weblap fejlesztés</h2>
            <p className="text-xl">A weblap fejlesztés kategória lehetőséget biztosít a diákok számára, hogy bemutassák kreativitásukat és technikai tudásukat. A versenyzőknek egy full stack, reszponzív weboldalt kell létrehozniuk, amely megfelel a megadott követelményeknek. A legjobb projektek innovatív megoldásokat, felhasználóbarát felületeket és a legújabb webes technológiákat alkalmazzák.</p>
          </CardBody>
        </Card>
        <Card className="bg-content1/80 backdrop-blur-xl p-6">
          <CardHeader>
            <BsPhoneVibrate size="4rem" className="scale-110" />
          </CardHeader>
          <CardBody>
            <h2 className="font-semibold text-2xl">Mobil fejlesztés</h2>
            <p className="text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam corporis architecto at, ad necessitatibus voluptatem modi ullam eveniet debitis consequatur illum officiis nam, omnis beatae dolore dolor veritatis! Provident, nam consequuntur, voluptates debitis aperiam distinctio repellendus, placeat consectetur possimus atque deleniti eos laudantium corporis architecto at, ad necessitatibus.</p>
          </CardBody>
        </Card>
        <Card className="bg-content1/80 backdrop-blur-xl p-6">
          <CardHeader>
            <BsCodeSquare size="4rem" />
          </CardHeader>
          <CardBody>
            <h2 className="font-semibold text-2xl">Hagyományos programozás</h2>
            <p className="text-xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam consequatur qui rerum? Ad vel perspiciatis atque hic sint cupiditate. Libero nostrum iste dolorem at, assumenda temporibus incidunt cupiditate repellat corporis sit nesciunt beatae delectus dolorum architecto ipsam veritatis ratione ea perspiciatis veniam, excepturi quidem voluptates quasi. Aliquid fuga facere iste vel.</p>
          </CardBody>
        </Card>
      </section>

    </article>
  );
}