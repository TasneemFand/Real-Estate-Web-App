import { useTranslation } from "react-i18next";
import { PropertyTable } from "./components/propertyTable";

export default function PropertyPage() {
  const { t } = useTranslation("property");
  return (
    <div className="flex h-full w-full flex-col flex-wrap items-start gap-4  px-5 py-6">
      <div className="flex w-full justify-between">
        <span className="text- mb-4 text-2xl font-bold text-foreground">
          {t("PropertyList")}
        </span>
        <span>{t("AddProperty")}</span>
      </div>
      <PropertyTable />
    </div>
  );
}
