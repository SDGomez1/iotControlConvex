"use client";

import type { Dispatch, SetStateAction } from "react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import logo from "img/Logo.png";
import { BurguerMenu } from "components/icons/BurgerMenu";
import { XMark } from "components/icons/XMark";
import MobileThemeSwitch from "components/common/MobileThemeSwitch";
import ThemeSwitch from "components/common/ThemeSwitch";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="flex w-full items-center justify-between px-4 py-3 lg:px-20 lg:py-4">
      <div className="flex items-center justify-center gap-4">
        <span
          onClick={() => router.push("/")}
          className="flex items-center justify-center"
        >
          <Image src={logo} alt="Logo" className="h-7 w-9 lg:h-10 lg:w-12" />
          <p className="ml-2 text-xs font-bold lg:text-base">Conection</p>
        </span>
        <Link
          href="/"
          className="text-lightText hidden text-sm lg:block dark:text-darkText"
        >
          Documentación
        </Link>
      </div>
      <div className="flex items-center justify-center gap-4">
        <span
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <BurguerMenu className="stroke-lightText size-7 lg:hidden dark:stroke-darkText" />
        </span>

        <ThemeSwitch />

        <button
          className="hidden text-sm font-bold lg:block dark:border-darkText"
          onClick={() => router.push("/logIn")}
        >
          Inicia sesión
        </button>

        <button
          className="hidden w-40 rounded bg-accent py-2 text-sm text-white lg:block"
          onClick={() => router.push("/signUp")}
        >
          Crea una cuenta
        </button>
      </div>
      {isOpen ? <MobileMenu setOpen={setIsOpen} router={router} /> : <></>}
    </nav>
  );
}

function MobileMenu(props: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  router: AppRouterInstance;
}) {
  return (
    <div className="fixed right-0 top-0 z-10 flex h-screen w-screen flex-col gap-4 bg-white px-4 py-3 dark:bg-dark">
      <span onClick={() => props.setOpen(false)} className="self-end">
        <XMark className="stroke-lightText size-7 dark:stroke-darkText" />
      </span>
      <button
        className="border-lightText w-full rounded border py-2 text-sm dark:border-darkText"
        onClick={() => props.router.push("/logIn")}
      >
        Inicia sesión
      </button>
      <button
        className="w-full rounded bg-accent py-2 text-sm text-white"
        onClick={() => props.router.push("/signUp")}
      >
        Crea una cuenta
      </button>
      <span className="border-lightText/30 border dark:border-darkText/30" />
      <a className="text-lightText text-sm dark:text-darkText">Documentación</a>
      <MobileThemeSwitch />
    </div>
  );
}
