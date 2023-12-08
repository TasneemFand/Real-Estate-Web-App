import {
  TotalRevenueOptions,
  TotalRevenueSeries,
} from "@/data/RevenueChartConfig";
import { ArrowUpCircle } from "lucide-react";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";

export const Revenue = () => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="flex-auto rounded-2xl bg-white px-5 py-5">
      <div className="mb-3 flex flex-col gap-5">
        <span className="text-lg font-semibold text-foreground">
          {t("TotalRevenue")}
        </span>
        <div className="flex flex-wrap gap-5">
          <span className="text-2xl font-bold text-foreground">$236,535</span>
          <div className="flex gap-2">
            <ArrowUpCircle className="h-5 w-5 text-primary" />
            <div className="flex flex-col">
              <span className="text-sm text-primary">0,8%</span>
              <span className="text-xs text-secondary-foreground">
                Than last Month
              </span>
            </div>
          </div>
        </div>
      </div>
      <ReactApexChart
        series={TotalRevenueSeries}
        type="bar"
        height={310}
        options={TotalRevenueOptions}
      />
    </div>
  );
};
