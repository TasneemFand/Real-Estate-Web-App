import { useTranslation } from "react-i18next";
import { PropertyCards } from "./components/propertyCards";
import { Revenue } from "./components/Revenue";
import { PropertyReferrals } from "./components/PropertyReferrals";
import { PropertyList } from "./components/PropertyList";
export default function Home() {
  const { t } = useTranslation("layoutSideBar");
  return (
    <div className="flex h-full w-full flex-col flex-wrap items-start gap-4  px-5 py-6">
      <span className="text- mb-4 text-2xl font-bold text-foreground">
        {t("Dashboard")}
      </span>
      <PropertyCards />
      <div className="flex w-full flex-wrap gap-3">
        <Revenue />
        <PropertyReferrals />
      </div>
      <PropertyList />
    </div>
  );
}
