import { SignOutButton, useSession } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "styles/components/navbar.module.css";

export default function Navbar(props: { admin: boolean }) {
  const session = useSession();
  const router = useRouter();
  const userEmail = session.session?.user.primaryEmailAddress?.emailAddress;
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      // If the active element exists and is clicked outside of
      if (dropDownRef.current !== null) {
        if (!dropDownRef.current.contains(e.target as Node)) {
          const dropdownMenu = document.getElementById("dropDown");
          dropdownMenu?.classList.remove(`${styles.show}`);

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
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <p>LOGO</p>
        <Link href={"/"}>
          <button>
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
            {props.admin ? "Dispositivos" : "Admins"}
          </button>
        </Link>
      </div>
      {props.admin ? (
        <div className={styles.adminContainer}>
          <Link href={"/"}>
            <button> + Nuevo admin</button>
          </Link>
        </div>
      ) : (
        <></>
      )}

      <div className={styles.profileContainer}>
        <span
          className={styles.profile}
          onClick={() => {
            const dropdownMenu = document.getElementById("dropDown");
            if (dropdownMenu) {
              dropdownMenu.classList.toggle(`${styles.show}`);
              setIsOpen(!isOpen);
            }
          }}
        >
          {userEmail?.charAt(0).toUpperCase()}
        </span>
        <div className={styles.dropDownMenu} id="dropDown" ref={dropDownRef}>
          <p>{userEmail}</p>
          <span>Tu</span>
          <SignOutButton>
            <Link className={styles.cerrarSesion} href="/">
              <button onClick={() => router.push("/")}>Cerrar Sesion</button>
            </Link>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}
