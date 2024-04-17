"use client";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import logo from "img/Logo.png";
import Link from "next/link";
import { ArrowLong } from "components/icons/ArrowLong";
import heroImage from "img/HeroImage.png";

export default function LogIn() {
  return (
    <main className="lg flex h-screen w-full flex-col justify-center  px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-0">
      <div className=" flex w-full flex-col lg:items-center">
        <div className="flex flex-col gap-4 lg:w-500px">
          <span className="mb-8 flex flex-col items-center justify-center">
            <Image
              src={logo}
              alt="Logo"
              className="h-10 w-12 lg:h-14 lg:w-16"
            />
            <p className="ml-2 text-xl font-medium lg:text-4xl ">Conection</p>
          </span>
          <h1 className="mb-4 text-center text-3xl font-medium lg:text-4xl">
            Iniciar sesión
          </h1>
          <SignIn
            afterSignInUrl="/selectTeam"
            appearance={{
              elements: {
                rootBox: "w-full",
                formButtonPrimary: "bg-accent",
                headerSubtitle: "hidden",
                header: "hidden",
                card: "shadow-none bg-transparent p-0 m-0 w-full ",
                headerTitle: "hidden",
                footer: "hidden",
                formFieldInput:
                  "border-lightText dark:border-darkText rounded-sm bg-transparent dark:text-white",
                formFieldLabel: "text-black dark:text-white lg:text-base",
                identityPreviewText: "dark:text-black",
                identityPreview: "dark:bg-neutral-400 bg-neutral-100",
              },
            }}
          />
          <span className=" flex items-center gap-2">
            <p className="text-xs font-medium text-lightText lg:text-sm dark:text-darkText">
              ¿No tienes cuenta?
            </p>
            <Link
              href="/signUp"
              className="text-xs font-medium text-accent lg:text-sm"
            >
              Registrate
            </Link>
          </span>

          <span className="border  border-lightText/30 dark:border-darkText/30" />
          <Link
            href="/"
            className=" flex w-full items-center justify-center gap-2 rounded border border-lightText bg-transparent py-2 text-center text-xs text-lightText lg:text-sm dark:border-darkText dark:text-darkText"
          >
            <ArrowLong className="size-4 lg:size-5" />
            Volver
          </Link>
        </div>
      </div>
      <div className="hidden lg:flex">
        <Image src={heroImage} alt="" className="h-screen" />
      </div>
    </main>
  );
}
