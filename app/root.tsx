import { Links, Meta, Outlet, Scripts, ScrollRestoration, useHref, useNavigate } from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";

import "./tailwind.css";
import { NextUIProvider } from "@nextui-org/react";
import MyNavbar from "./components/MyNavbar";
import MyFooter from "./components/MyFooter";
import ToastProvider from "./components/ToastProvider";
import TopLoader from "./components/TopLoader";

export const links: LinksFunction = () => [
  { 
    rel: "preconnect", 
    href: "https://fonts.googleapis.com" 
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Dusza VJF" },
    { name: "description", content: "A KandOS csapat munkája a Dusza Árpád Programozói Emlékverseny 2024-es webfejlesztés kategóriájára" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <html lang="hu" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NextUIProvider navigate={navigate} useHref={useHref}>
          <ToastProvider>
            <TopLoader />
            <MyNavbar />
            {children}
            <MyFooter />

            <ScrollRestoration />
            <Scripts />
          </ToastProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
