import DeviceList from "components/dashboard/DeviceList";
import { Plus } from "components/icons/Plus";
import Link from "next/link";

export default function AdminPage() {
  return (
    <section className="flex h-full auto-rows-max grid-cols-2 flex-col justify-items-center gap-4 overflow-y-scroll px-5 pb-20 lg:grid 2xl:grid-cols-3 2xl:pb-32">
      <DeviceList isAdmin={true} />
      <Link
        href={"/admin/newDevice"}
        className="dark:border-darkTex flex w-full shrink-0 flex-col items-center justify-center gap-2 rounded border border-lightText p-4 lg:h-40  2xl:h-44 2xl:w-500px"
      >
        <Plus className="size-10 stroke-lightText 2xl:size-16 dark:stroke-darkText" />
        <p className="text-sm text-lightText 2xl:text-base dark:text-darkText">
          Añadir dispositivo
        </p>
      </Link>
    </section>
  );
}
