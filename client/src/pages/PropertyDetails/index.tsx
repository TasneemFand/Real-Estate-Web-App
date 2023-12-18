import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PropertyDetails } from "./components/PropertyDetails";
import { useNavigate } from "react-router-dom";

export default function PropertyDetailsPage() {
  const { t } = useTranslation("property");
  const navigate = useNavigate();
  return (
    <div className="flex w-full px-5 py-6 ">
      <div className="w-full flex-col gap-4 rounded-2xl bg-white p-5">
        <div className="flex gap-3">
          <ChevronLeft
            className="h-8 w-8 cursor-pointer text-foreground"
            onClick={() => navigate("/property")}
          />
          <span className="text-2xl font-bold text-foreground">
            {t("details")}
          </span>
        </div>
        <PropertyDetails />
      </div>
    </div>
  );
}
