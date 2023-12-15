import { useTranslation } from "react-i18next";
import { PropertyTable } from "./components/propertyTable";
import { Link, Outlet } from "react-router-dom";
import { useQueryKeys } from "./hooks/useQueryKeys";

export default function PropertyPage() {
  const { t } = useTranslation("property");
  const { page } = useQueryKeys();

  return (
    <div className="flex h-full w-full flex-col flex-wrap items-start gap-4  px-5 py-6">
      <div className="flex w-full justify-between">
        <span className="text- mb-4 text-2xl font-bold text-foreground">
          {t("PropertyList")}
        </span>
        <Link
          className="rounded-md bg-primary p-4 text-sm text-white"
          to={"create"}
          state={page}
        >
          {t("AddProperty")}
        </Link>
      </div>
      <PropertyTable />
      <Outlet />
    </div>
  );
}
