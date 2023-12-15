import { useTranslation } from "react-i18next";

import { StatusFilter, TypeFilter } from "@/data/PropertyToolbarFilters";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Search } from "lucide-react";
import { useRef, useState } from "react";
import { SelectCompo } from "./Select";
import { useQueryKeys } from "../hooks/useQueryKeys";

export const PropertyFilters = () => {
  const { t } = useTranslation("property");
  const inputRef = useRef<HTMLInputElement>(null);
  const [countryRegion, setCountryRegion] = useState({
    country: "",
    region: "",
  });
  const { onFiltersChange } = useQueryKeys();

  return (
    <div className="flex flex-wrap gap-3">
      <div
        id="search input"
        className="flex w-56 items-center gap-2 rounded-sm bg-background p-2 text-foreground placeholder:text-foreground"
      >
        <Search
          className="h-4 w-4 cursor-pointer text-grayIcon"
          onClick={() =>
            onFiltersChange((old) => ({
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
      <SelectCompo
        defaultValue="AnyStatus"
        onValueChange={(value) =>
          onFiltersChange((old) => ({
            ...old,
            Status: value,
          }))
        }
        placeholder="Any Status"
        items={StatusFilter}
        form={false}
      />
      <SelectCompo
        defaultValue="AnyType"
        onValueChange={(value) =>
          onFiltersChange((old) => ({
            ...old,
            type: value,
          }))
        }
        placeholder="Any Type"
        items={TypeFilter}
        form={false}
      />
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
