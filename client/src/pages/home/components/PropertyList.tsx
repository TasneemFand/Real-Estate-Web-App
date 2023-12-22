import { useTranslation } from "react-i18next";
import { PropertyListFilters } from "./PropertyListFilters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useGetPropertyList } from "../hooks/useGetPropertyList";
import MoonLoader from "react-spinners/MoonLoader";
import { MapPin } from "lucide-react";

export const PropertyList = () => {
  const { t } = useTranslation("dashboard");
  const [filter, setFilter] = useState("popular");

  const { data: propertyList, isLoading } = useGetPropertyList(filter);
  return (
    <div className="flex w-full max-w-[1220px] flex-col rounded-2xl bg-white px-5 py-5 ">
      <div className="flex flex-auto justify-between">
        <span className="text-lg font-semibold text-foreground">
          {t("PropertyList")}
        </span>
        <PropertyListFilters
          handleFilter={(filter: string) => setFilter(filter)}
        />
      </div>
      <ScrollArea>
        <div className="flex space-x-4 py-4 ">
          {isLoading ? (
            <MoonLoader
              color="#475be8"
              speedMultiplier={0.5}
              className="m-auto"
            />
          ) : (
            <>
              {propertyList.length === 0 ? (
                <div className="m-auto flex h-full items-center justify-center">
                  <p className="text-2xl font-semibold text-foreground">
                    No Property Found
                  </p>
                </div>
              ) : (
                propertyList.map((data) => (
                  <div className="flex flex-col gap-2">
                    {/* <div className="h-60 w-80 rounded-md ">
                      <img src={data.photo} alt="property image" />
                    </div> */}
                    <div
                      className={`h-60 w-72 bg-contain bg-no-repeat`}
                      style={{ backgroundImage: `url(${data.photo})` }}
                    />
                    <div className="flex justify-between">
                      <span className="text-base font-semibold text-foreground">
                        {data.name}
                      </span>
                      <div className="rounded-[4px] bg-[#DADEFA] px-1 py-2 font-semibold text-primary">{`$ ${data.price}`}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 dark:text-secondary-foreground" />
                      <span className="text-sm text-secondary-foreground">
                        {`${data.location.country}, ${data.location.city}`}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
