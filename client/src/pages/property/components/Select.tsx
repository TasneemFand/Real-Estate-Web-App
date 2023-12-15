import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TSelectProps } from "@/types";
import resources from "@/types/resources";
import { useTranslation } from "react-i18next";

type TranslationKeys = keyof typeof resources.property;

export const SelectCompo = ({
  onValueChange,
  defaultValue,
  placeholder,
  items,
  form,
}: TSelectProps) => {
  const { t } = useTranslation("property");
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      {form ? (
        <FormControl>
          <SelectTrigger className="w-full rounded-sm bg-background text-foreground placeholder:text-foreground">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
      ) : (
        <SelectTrigger className="w-40 rounded-sm bg-background text-foreground placeholder:text-foreground">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      )}
      <SelectContent>
        <SelectGroup>
          {items.map((select) => (
            <SelectItem
              value={select.value}
              className="text-secondary-foreground"
            >
              {t([select.displayedValue as TranslationKeys])}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
