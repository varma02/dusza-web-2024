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
  - Jelentkezés a versenyre, ezzel felhasználói fiók létrehozása
  - Belépés a versenyzői felületre
  - Szervezők által küldött üzenetek megtekintése
  - Jelentkezés módosítása
### Iskola képviselőjeként
  - Belépés az iskolai felületre
  - Iskolai csapatok jelentkezéseinek kezelése
### Szervezőként
  - Belépés a szervezői felületre
  - Verseny kategóriák és programozási környezetek létrehozása, módosítása, törlése
  - Versenyekre jelentkező csapatok kezelése, törlése
  - Iskolák létrehozása, kezelése, törlése
  - Üzenetek küldése a versenyzőknek
  - Statisztikák megtekintése
  - Adatok exportálása csv fájlba
