import Link from "next/link";
import { useRouter } from "next/navigation";

import { SignOutButton, useSession } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const session = useSession();
  const router = useRouter();

  const userEmail = session.session?.user.username;

  const dropDownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Define a function to handle click events on the page
    const pageClickEvent = (e: MouseEvent) => {
      // Check if the dropDownRef is not null
      if (dropDownRef.current !== null) {
        // If the click event target is not within the dropdown element, close the dropdown
        if (!dropDownRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      }
    };

    // Add the click event listener to the entire document
    document.addEventListener("click", pageClickEvent);

    // Cleanup function to remove the event listener when the component unmounts or isOpen changes
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
      <div className="relative flex items-center justify-end ">
        <span
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-500 p-2 text-sm text-white "
          onClick={() => setIsOpen(!isOpen)}
        >
          {userEmail?.charAt(0).toUpperCase()}
        </span>
        <div
          className={`${
            isOpen ? "flex " : "hidden "
          } absolute top-full z-10 mt-2 min-w-40 animate-openMenu flex-col gap-1 rounded bg-white px-6 py-3  shadow-lg ring-1 ring-black  ring-opacity-5 `}
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
