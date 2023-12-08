import { DashboardPropertiesData } from "@/data/DashboardPropertiesData";
import resources from "@/types/resources";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";

type TranslationKeys = keyof typeof resources.dashboard;

export const PropertyCards = () => {
  const { t } = useTranslation("dashboard");

  return (
    <div id="properties" className="flex flex-wrap gap-6">
      {DashboardPropertiesData.map((property) => (
        <div
          key={property.name}
          className="flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-6"
        >
          <div className="flex w-full flex-col gap-1">
            <span className="text-sm text-secondary-foreground">
              {t([property.name as TranslationKeys])}
            </span>
            <span className="text-2xl font-bold text-foreground">
              {property.value}
            </span>
          </div>
          <ReactApexChart
            options={{
              chart: {
                type: "donut",
              },
              colors: property.colors,
              legend: {
                show: false,
              },
              dataLabels: {
                enabled: false,
              },
            }}
            series={property.series}
            type="donut"
            width={120}
          />
        </div>
      ))}
    </div>
  );
};
