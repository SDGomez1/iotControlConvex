import Link from "next/link";
import { useState } from "react";
import { BurguerMenu } from "components/icons/BurgerMenu";
import { XMark } from "components/icons/XMark";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  if (isOpen) {
    return (
      <div
        className={`${isOpen ? "flex" : "hidden"} fixed h-screen w-screen flex-col bg-white`}
      >
        <div className="flex w-full justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-extrabold text-neutral-300">
            LOGO
          </Link>
          <div
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <XMark className="size-6" />
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-3 px-6">
          <button
            className="w-full rounded border py-2 text-sm"
            onClick={() => router.push("")}
          >
            Iniciar Sesion
          </button>
          <button
            className="w-full rounded bg-neutral-900 py-2 text-sm text-white "
            onClick={() => router.push("")}
          >
            Registrarse
          </button>
          <Link href={""} className="w-full border-b py-2 text-left">
            Docs
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <nav className="flex w-full justify-between px-6 py-4 lg:px-36">
        <Link href="/" className="text-2xl font-extrabold text-neutral-300">
          LOGO
        </Link>
        <div
          className="lg:hidden"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <BurguerMenu className="size-6" />
        </div>
        <div className="hidden w-auto items-center justify-center gap-4 lg:flex">
          <Link href={""} className="p-2 text-left text-sm text-neutral-500">
            Docs
          </Link>
          <button
            className="rounded border p-2 text-sm"
            onClick={() => router.push("/logIn")}
          >
            Iniciar Sesion
          </button>
          <button
            className=" rounded bg-neutral-900 p-2 text-sm text-white"
            onClick={() => router.push("/signUp")}
          >
            Registrarse
          </button>
        </div>
      </nav>
    );
  }
}
