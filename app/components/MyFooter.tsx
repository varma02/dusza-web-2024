import { Link } from "@nextui-org/react";

export default function MyFooter() {
  return (
    <footer className="mt-20 bg-content1 w-screen p-6 gap-2 flex items-center text-foreground/70">
      <div className="flex gap-4">
        <Link showAnchorIcon color="foreground" href="https://github.com/varma02/dusza-web-2024">Github</Link>
      </div>
      <div className="mx-auto flex flex-col items-center">
        <h6>Made with ❤️ by the KandOS team.</h6>
        <p>Licensed under the MIT License.</p>
      </div>
      <div>
        
      </div>
    </footer>
  )
}
