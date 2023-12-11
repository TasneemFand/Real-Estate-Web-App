import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { filters } from "@/data/PropertyListFilters";
import resources from "@/types/resources";
import { useTranslation } from "react-i18next";

type TranslationKeys = keyof typeof resources.dashboard;
type TProps = {
  handleFilter: (value: string) => void;
};
export const PropertyListFilters = ({ handleFilter }: TProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <ToggleGroup
      type="single"
      onValueChange={(value) => handleFilter(value)}
      defaultValue="popular"
      className="flex flex-wrap gap-3"
    >
      {filters.map((filter) => (
        <ToggleGroupItem
          className=" rounded-[6px] px-2 py-2 text-xs font-semibold "
          value={filter[0].toLowerCase() + filter.slice(1)}
          variant={"primary"}
        >
          {t([filter as TranslationKeys])}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
