import Link from "next/link";
import { useRouter } from "next/navigation";

import { SignOutButton, useSession } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const session = useSession();
  const router = useRouter();

  const userEmail = session.session?.user.primaryEmailAddress?.emailAddress;

  const dropDownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      if (dropDownRef.current !== null) {
        if (!dropDownRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener("click", pageClickEvent);
    return () => {
      document.removeEventListener("click", pageClickEvent);
    };
  }, [isOpen]);

  return (
    <div className="flex w-full justify-between px-6 py-4">
      <div className="flex items-center justify-start gap-4">
        <Link href="/" className="text-2xl font-extrabold text-neutral-300">
          LOGO
        </Link>
      </div>
      <div className="relative flex items-center justify-end">
        <span
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-500 p-2 text-sm text-white "
          onClick={() => setIsOpen(!isOpen)}
        >
          {userEmail?.charAt(0).toUpperCase()}
        </span>
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } absolute top-full z-10 flex-col gap-1 rounded bg-white px-6 py-3 drop-shadow-2xl`}
          id="dropDown"
          ref={dropDownRef}
        >
          <p className="text-sm font-medium">{userEmail}</p>
          <span className="text-sm text-neutral-400">Tu</span>
          <SignOutButton>
            <Link
              className=" w-full rounded bg-neutral-900 py-1 text-center text-sm text-white"
              href="/"
            >
              <button onClick={() => router.push("/")}>Cerrar Sesion</button>
            </Link>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}

function DashboardIcon() {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
    >
      <rect
        x="0.5"
        y="0.5"
        width="7.57143"
        height="7.68966"
        rx="2.5"
        stroke="white"
      />
      <rect
        x="0.5"
        y="12.8105"
        width="7.57143"
        height="7.68966"
        rx="2.5"
        stroke="white"
      />
      <rect
        x="11.9285"
        y="0.5"
        width="7.57143"
        height="7.68966"
        rx="2.5"
        stroke="white"
      />
      <rect
        x="11.9285"
        y="12.8105"
        width="7.57143"
        height="7.68966"
        rx="2.5"
        stroke="white"
      />
    </svg>
  );
}

function XSvg() {
  return (
    <svg
      className=" h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function burguerMenu() {
  return (
    <svg
      className="block h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}
