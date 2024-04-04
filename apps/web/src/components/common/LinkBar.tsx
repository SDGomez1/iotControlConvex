"use client";
import type { ActiveLinks } from "types/linkBar";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LinkBar(props: { links: ActiveLinks[] }) {
  const currentUrl = usePathname();
  const linkList = props.links.map((link, index) => {
    let active: boolean = false;
    const segments = currentUrl
      .split("/")
      .filter((segment) => segment.length > 0);

    if (segments.length > 1 && segments[0] === "adminDashboard") {
      link.location === "adminDashboard"
        ? (active = false)
        : (active = segments.includes(link.location));
    }
    if (segments.length === 1 && link.location === "adminDashboard") {
      active = true;
    }

    return (
      <Link
        href={link.url}
        className={`${active ? "border-b-2 border-b-black text-neutral-950" : "text-neutral-500"} flex shrink-0 items-center justify-center pb-2`}
        key={index}
      >
        {link.link}
      </Link>
    );
  });
  return (
    <div className="flex items-center justify-start gap-6 overflow-x-scroll px-6 ">
      {linkList}
    </div>
  );
}
