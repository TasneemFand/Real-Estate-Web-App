import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SearchInput = () => {
  const { t } = useTranslation("layoutHeader");
  return (
    <div
      id="search input"
      className="flex w-96 items-center gap-2 rounded-sm  bg-background p-3 max-lg:w-[240px]"
    >
      <Search className="h-4 w-4 text-grayIcon" />
      <input
        type="text"
        placeholder={t("searchInput")}
        className=" text-garyColor"
      />
    </div>
  );
};
