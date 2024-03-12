import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "styles/components/navbar.module.css";

export default function Navbar() {
  const router = useRouter();
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
            Dispositvos
          </button>
        </Link>
      </div>
      <div className={styles.adminContainer}>
        <Link href={"/"}>
          <button> + Nuevo admin</button>
        </Link>
      </div>
      <div className={styles.profileContainer}>
        <span className={styles.profile}></span>
        <SignOutButton>
          <Link className={styles.cerrarSesion} href={""}>
            <button onClick={() => router.push("/")}>Cerrar Sesion</button>
          </Link>
        </SignOutButton>
      </div>
    </div>
  );
}
