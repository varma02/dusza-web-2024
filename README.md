# Dusza Web 2024 verseny projekt - KandOS projekt
Mint minden verseny szervezésekor, igy nálunk is fontos a jelentkező csapatok adatainak 
összegyűjtése,  valamint  egyszerű  kezelése.  Jelenleg  ez  jelentkezési  lapok  kitöltésével  és 
emailben való elküldésével van megoldva, amely nem a legideálisabb megoldás. Igy szeretnénk 
egy  mind  a  jelentkezőknek  mind  a  szervezőknek  egy  könnyebb  felületet  létrehozni. A  ti 
feladatotok lesz egy erre alkalmas web vagy mobil alkalmazás elkészítése.

## Futtatás
Ez az útmutató feltételezi, hogy a rendszereden telepítve van a NodeJS, és fut egy MySQL szerver.
  1. `git clone "https://github.com/varma02/dusza-web-2024"`
  2. `cd dusza-web-2024`
  3. `npm install`
  4. `npx auth secret`
  5. Add hozzá a `.env.local` fájlhoz a `DATABASE_URL` és az `AUTH_TRUST_HOST` változókat.
  ```sh
    DATABASE_URL="mysql://username:password@localhost:3306/duszadb"
    AUTH_SECRET="random_generated_string"
    AUTH_TRUST_HOST="localhost"
  ```
  6. `npx prisma migrate reset`
  7. `npx prisma generate`
  8. `npm run build`
  9. `npm run start`

## Funkciók
### Versenyre jelentkező csapatként
#### --> Jelentkezés a versenyre, ezzel felhasználói fiók létrehozása
A főoldalról a **Regisztráció** gomb megnyomásával elérhető a jelentkezési űrlap, ahol a csapatvezető megadhatja a csapat nevét, az iskolát, ahol tanulnak, a csapat tagjainak nevét és évfolyamát, valamint a kategóriát amire jelentkeznek és a programozási környezetet, amit használni fognak a versenyen.

#### --> Belépés a versenyzői felületre
A főoldalról a **Regisztráció** alatti **Már regisztráltam** gomb megnyomásával elérhető a bejelentkezési lap, ahol a csapatvezető megadhatja a felhasználónevét és a jelszavát, amivel regisztrált a versenyre.

#### --> Szervezők által küldött üzenetek megtekintése
A bejelentkezést követően felül a navigációs sávban a **Hiánypótlás** menüpontot választva láthatók a szervezők által küldött üzenetek, amiket a csapatvezetők megtekinthetnek.

#### --> Jelentkezés módosítása
Bejelentkezés után a **Irányítópult** menüpont alatt láthatók a csapat jelenlegi adatai és a **Jelentkezés módosítása** gomb, amivel a csapatvezető módosíthatja a csapat adatait.

### Iskola képviselőjeként
#### --> Belépés az iskolai felületre
A főoldalról a **Regisztráció** alatti **Már regisztráltam** gomb megnyomásával elérhető a bejelentkezési lap, ahol az iskola képviselője megadhatja a felhasználónevét és a jelszavát.

#### --> Iskolai csapatok jelentkezéseinek kezelése
A bejelentkezést követően a **Irányítópult** menüpont alatt láthatók az iskola csapatainak adatai, amiket a képviselő kiválaszthat és a kiválasztottakat elfogadhatja a **Műveletek** menüpont alatti **Elfogadás** opcióval.

### Szervezőként
#### --> Belépés a szervezői felületre
A főoldalról a **Regisztráció** alatti **Már regisztráltam**, vagy az oldal láblécének jobb oldalán lévő **Admin** gomb megnyomásával elérhető a bejelentkezési lap, ahol a szervező megadhatja a felhasználónevét és a jelszavát.

#### --> Verseny kategóriák és programozási környezetek létrehozása, módosítása, törlése
A bejelentkezést követően felül, a navigációs sávban a **Kategóriák** menüpont kiválasztásával láthatók a verseny kategóriái és programozási környezetei, amiket a szervezők módosíthatnak, törölhetnek, vagy újat hozhatnak létre.

#### --> Versenyekre jelentkező csapatok kezelése, törlése
Bejelentkezés után felül a navigációs sávban a **Regisztrációk** menüpont kiválasztásával megtekinthetők a versenyre jelentkezett csapatok, amiket a szervezők módosíthatnak, törölhetnek, vagy újat hozhatnak létre.

#### --> Iskolák létrehozása, kezelése, törlése
A bejelentkezést követően felül a navigációs sávban a **Iskolák** menüpont kiválasztásával megtekinthetők az iskolák, amiket törölhetnek, vagy újat hozhatnak létre.

#### --> Üzenetek küldése a versenyzőknek
A bejelentkezést követően felül a navigációs sávban a **Regisztrációk** menüpont kiválasztásával láthatók a regisztrált csapatok, kiválasztva őket a **Műveletek** menüpont alatti **Hiánypótlás** opcióval lehet üzenetet küldeni nekik. **Az üzenetküldés automatikusan kikapcsolja a csapat elfogadását.**

#### --> Statisztikák megtekintése
A bejelentkezést követően felül a navigációs sávban az **Irányítópult** menüpont kiválasztásával láthatók a statisztikák.

#### --> Adatok exportálása csv fájlba
Bejelentkezés után a **Irányítópult** menüpont alatt a **Adatok exportálása** kártyán kiválaszthatók az exportálás paraméterei majd az **Exportálás** gombot megnyomva letölthető az exportált fájl.

## Bemutató adatok
### Szervezők:
 - Felhasználónév: `webmester`, Jelszó: `1234`
 - Felhasználónév: `john.doe`, Jelszó: `1234`

### Iskolák:
  - **Kecskeméti SZC Kandó Kálmán Technikum**  
      Felhasználónév: `juhasz.imre`,
      Jelszó: 1234
  - **Nagykőrösi Református Gimnázium**  
      Felhasználónév: `kk.timea`,
      Jelszó: 1234
  - **Kecskeméti Bólyai János Gimnázium**  
      Felhasználónév: `harnos.istvan`,
      Jelszó: 1234
  - **Kecskeméti Kodály Zoltán Ének Zenei Általános Iskola és Gimnázium**  
      Felhasználónév: `kodaly.zoltan`,
      Jelszó: 1234

### Csapatvezetők
  - Felhasználónév: `kandos`, Jelszó: `1234` 
  - Felhasználónév: `techies`, Jelszó: `1234`
  - Felhasználónév: `codemasters`, Jelszó: `1234`
  - Felhasználónév: `kovacs.tamas`, Jelszó: `1234` 

## Felhasznált technológiák
### Front-end
  - React, Next.js  
    A Next egy front-end meta-keretrendszer React-hez, amely lehetővé teszi a statikus és dinamikus weboldalak készítését. A Next.js segítségével a React alkalmazások készítése egyszerűbb, és jobb SEO-t biztosítanak.
  - NextUI, TailwindCSS  
    A NextUI egy React komponenskönyvtár, amivel gyorsan és egyszerűen készíthetünk szép és modern kinézetű weboldalakat.
  - zod  
    A zod egy TypeScript kompatibilis sémavalidátor, amivel egyszerűen tudjuk ellenőrizni a beérkező adatokat.
  - recharts  
    A recharts egy React kompatibilis diagramkönyvtár, amivel könnyen tudunk diagramokat készíteni.

### Back-end
  - Node.js, npm  
    A Node.js egy JavaScript runtime, amivel a szerveroldali alkalmazásokat tudjuk készíteni. Az npm egy csomagkezelő, amivel a Node.js alkalmazásounkhoz tudunk csomagokat telepíteni.
  - Prisma  
    A Prisma egy modern adatbázis ORM, amivel könnyen tudjuk kezelni az adatbázist és lekérni illetve módosítani az adatokat.
  - next-auth  
    A next-auth egy autentikációs könyvtár, amivel egyszerűen tudunk autentikációt kezelni a Next.js alkalmazásunkban.

## Továbbfejlesztés ötletek
  - A főoldal szerkeszthetővé tétele a szervezők számára.
  - A versenyre jelentkező csapatoknál minden tagnak legyen felhasználói fiókja.
  - A hiánypótlás helyett két irányú üzenetküldési lehetőség.
  - Verseny feladat kiadása a felületen keresztül.
  - A csapatok munkáinak feltöltése és értékelése a felületen keresztül.
  - Email értesítés rendszer a határidőkről, üzenetekről és feladatokról.