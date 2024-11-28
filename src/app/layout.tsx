import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Providers } from "./providers";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Link } from "@nextui-org/react";

export const metadata: Metadata = {
  title: "Dusza VJF",
  description: "A KandOS csapat Dusza versenyoldala",
};

export default function RootLayout({children}: 
Readonly<{children: React.ReactNode;}>) {
  return (
    <SessionProvider>
      <html lang="hu" className="dark">
        <body className="overflow-x-hidden">
          <NextTopLoader
            color="hsl(var(--nextui-primary) / var(--nextui-primary-opacity, 1))"
            initialPosition={0.08}
            crawlSpeed={100}
            height={2}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
            <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />
          <Providers>
            {children}
          </Providers>
          
          <footer className="mt-20 bg-content1 w-full p-6 gap-2 flex items-center text-foreground/70">
            <div className="flex gap-4">
              <Link showAnchorIcon color="foreground" href="https://github.com/varma02/dusza-web-2024">Github</Link>
            </div>
            <div className="mx-auto flex flex-col items-center">
              <h6>Made with ❤️ by the KandOS team.</h6>
              <p>Licensed under the MIT License.</p>
            </div>
            <div>
              <Link color="foreground" href="/organizer">Admin</Link>
            </div>
          </footer>
        </body>
      </html>
    </SessionProvider>
  );
}
