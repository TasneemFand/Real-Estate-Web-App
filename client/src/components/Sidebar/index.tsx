import { sidebarMenu } from "@/data/sideBarMenu";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useTranslation } from "react-i18next";
import resources from "@/types/resources";

type TranslationKeys = keyof typeof resources.layoutSideBar;

export const SideBar = () => {
  const { t } = useTranslation("layoutSideBar");

  return (
    <div className="flex min-h-full w-64 flex-col items-start gap-3 bg-white px-4 py-6 max-sm:hidden">
      <div
        id="logo"
        className="mb-7 flex w-full items-center gap-2 max-sm:hidden"
      >
        <img src={logo} alt="logo" />
        <h1 className="text-2xl font-bold text-primary-foreground">Yariga</h1>
      </div>
      {sidebarMenu.map((menu) => (
        <NavLink
          key={menu.title}
          to={menu.path}
          className={({ isActive, isPending }) =>
            isActive
              ? "sideBarLink ActiveLink"
              : isPending
              ? "pending"
              : "sideBarLink hoverLink bg-white text-secondary-foreground "
          }
        >
          {menu.Icon}
          <span className="text-base font-bold">
            {t([menu.title as unknown as TranslationKeys])}
          </span>
        </NavLink>
      ))}
    </div>
  );
};
