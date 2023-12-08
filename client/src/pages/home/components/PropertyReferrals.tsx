import { Progress } from "@/components/ui/progress";
import { PropertyReferralsData } from "@/data/PropertyReferrals";
import resources from "@/types/resources";
import { useTranslation } from "react-i18next";

type TranslationKeys = keyof typeof resources.dashboard;

export const PropertyReferrals = () => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="flex flex-auto flex-col gap-4 rounded-md bg-white px-5 py-5">
      <span className="text-lg font-semibold text-foreground">
        {t("PropertyReferrals")}
      </span>
      {PropertyReferralsData.map((ref) => (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap justify-between">
            <span className="text-base font-medium text-foreground">
              {t([ref.name as TranslationKeys])}
            </span>
            <span className="text-base font-medium text-foreground">
              {`${ref.value} %`}
            </span>
          </div>
          <Progress
            value={ref.value}
            className={`h-2 [&>*:first-child]:bg-[${ref.color}]`}
          />
        </div>
      ))}
    </div>
  );
};
