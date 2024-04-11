import Notifications from "components/dashboard/Notifications";
import ThemeSwitch from "components/common/ThemeSwitch";
import { BurguerMenu } from "components/icons/BurgerMenu";
import { InformationCircle } from "components/icons/InformationCircle";
import type { Dispatch, SetStateAction } from "react";

export default function Topbar(props: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <nav className="flex w-full items-center justify-between px-4 py-4 lg:px-0 lg:py-6">
      <div className="flex items-center justify-center gap-4">
        <span onClick={() => props.setIsOpen(true)} className="lg:hidden">
          <BurguerMenu className="size-6 stroke-lightText dark:stroke-darkText" />
        </span>
        <h1 className="text-sm font-bold lg:text-base">Dispositivos</h1>
      </div>
      <div className="flex items-center justify-center gap-4">
        <ThemeSwitch />
        <span>
          <InformationCircle className="size-6 stroke-lightText dark:stroke-darkText" />
        </span>
        <Notifications />
      </div>
    </nav>
  );
}
