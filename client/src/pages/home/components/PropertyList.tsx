import { useTranslation } from "react-i18next";
import { PropertyListFilters } from "./PropertyListFilters";

export const PropertyList = () => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-white px-5 py-5">
      <div className="flex flex-auto justify-between">
        <span className="text-lg font-semibold text-foreground">
          {t("PropertyList")}
        </span>
        <PropertyListFilters />
      </div>
    </div>
  );
};
