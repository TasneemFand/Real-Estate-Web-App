import { useTranslation } from "react-i18next";
import { PropertyListFilters } from "./PropertyListFilters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PropertyListData } from "@/data/PropertyList";
import { MapPin } from "lucide-react";

export const PropertyList = () => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="flex w-full flex-col rounded-2xl bg-white px-5 py-5">
      <div className="flex flex-auto justify-between">
        <span className="text-lg font-semibold text-foreground">
          {t("PropertyList")}
        </span>
        <PropertyListFilters />
      </div>
      <ScrollArea>
        <div className="flex space-x-4 py-4 ">
          {PropertyListData.map((data) => (
            <div className="flex flex-col gap-2">
              <div className="h-60 w-80 rounded-md bg-slate-500"></div>
              <div className="flex justify-between">
                <span className="text-base font-semibold text-foreground">
                  {data.name}
                </span>
                <div className="rounded-[4px] bg-[#DADEFA] px-1 py-2 font-semibold text-primary">{`$ ${data.price}`}</div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <span className="text-sm text-secondary-foreground">
                  {data.country}
                </span>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
