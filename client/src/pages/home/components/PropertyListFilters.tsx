import { Button } from "@/components/ui/button";
import { filters } from "@/data/PropertyListFilters";
import resources from "@/types/resources";
import { useTranslation } from "react-i18next";

type TranslationKeys = keyof typeof resources.dashboard;

export const PropertyListFilters = () => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <Button className=" hoverLink rounded-[6px] bg-hoverColor px-2 py-2 text-xs font-semibold text-secondary-foreground">
          {" "}
          {t([filter as TranslationKeys])}
        </Button>
      ))}
    </div>
  );
};
