import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusFilter, TypeFilter } from "@/data/PropertyToolbarFilters";
import resources from "@/types/resources";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";

type TranslationKeys = keyof typeof resources.property;
type TProps = {
  handleFilters: Dispatch<
    SetStateAction<{
      location: string;
      Status: string;
      type: string;
    }>
  >;
};
export const PropertyFilters = ({ handleFilters }: TProps) => {
  const { t } = useTranslation("property");
  const inputRef = useRef<HTMLInputElement>(null);
  const [countryRegion, setCountryRegion] = useState({
    country: "",
    region: "",
  });
  return (
    <div className="flex flex-wrap gap-3">
      <div
        id="search input"
        className="flex w-56 items-center gap-2 rounded-sm bg-background p-2 text-foreground placeholder:text-foreground"
      >
        <Search
          className="h-4 w-4 cursor-pointer text-grayIcon"
          onClick={() =>
            handleFilters((old) => ({
              ...old,
              location: inputRef.current?.value || "",
            }))
          }
        />
        <input
          type="text"
          ref={inputRef}
          placeholder={t("SearchByAddress")}
          className=" text-sm text-foreground placeholder:text-foreground"
        />
      </div>
      <Select
        onValueChange={(value) =>
          handleFilters((old) => ({
            ...old,
            Status: value,
          }))
        }
      >
        <SelectTrigger className="w-40 rounded-sm bg-background text-foreground placeholder:text-foreground">
          <SelectValue placeholder="Any Status" />
        </SelectTrigger>
        <SelectContent defaultValue="AnyStatus">
          <SelectGroup>
            {StatusFilter.map((select) => (
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
      <Select
        onValueChange={(value) =>
          handleFilters((old) => ({
            ...old,
            type: value,
          }))
        }
      >
        <SelectTrigger className="w-40 rounded-sm bg-background text-foreground placeholder:text-foreground">
          <SelectValue placeholder="Any Type" />
        </SelectTrigger>
        <SelectContent defaultValue="AnyType">
          <SelectGroup>
            {TypeFilter.map((select) => (
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
      <CountryDropdown
        value={countryRegion.country}
        classes="selectCountry"
        defaultOptionLabel={t("AllCountries")}
        onChange={(val) => {
          setCountryRegion((old) => ({ ...old, country: val }));
        }}
        priorityOptions={["CA", "US", "GB"]}
      />
      <RegionDropdown
        value={countryRegion.region}
        onChange={(val) => setCountryRegion((old) => ({ ...old, region: val }))}
        classes="selectCountry"
        blankOptionLabel="No country selected"
        defaultOptionLabel="Select region"
        country={countryRegion.country}
      />
    </div>
  );
};
