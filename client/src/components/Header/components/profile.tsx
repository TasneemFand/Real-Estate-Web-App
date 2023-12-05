import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import profileImg from "../../../assets/Profileimage.png";
import { CircleUserRound, LogOut, Settings, ToggleRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Profile = () => {
  const { t } = useTranslation("layoutHeader");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex gap-3">
          <img src={profileImg} alt="profile img" />
          <div id="user" className="flex flex-col items-start max-md:hidden">
            <span className="text-sm font-semibold text-primary-foreground">
              Hawkins Maru
            </span>
            <span className="text-sm text-secondary-foreground">
              Company Manager
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="popoverContent w-48">
        <Button className="flex items-center gap-2 rounded-[5px] p-2 text-secondary-foreground hover:text-primary">
          <CircleUserRound className="h-4 w-4" />
          <span className="text-sm font-medium">
            {t("settingsEditProfile")}
          </span>
        </Button>
        <Button className="flex items-center gap-2 rounded-[5px] p-2 text-secondary-foreground hover:text-primary">
          <Settings className="h-4 w-4" />

          <span className="text-sm font-medium">{t("settings")}</span>
        </Button>
        <Button className="flex items-center gap-2 rounded-[5px] p-2 text-secondary-foreground hover:text-primary">
          <LogOut className="h-4 w-4" />

          <span className="text-sm font-medium">{t("logout")}</span>
        </Button>
        <Button className="flex items-center gap-2 rounded-[5px] p-2 text-secondary-foreground hover:text-primary">
          <ToggleRight className="h-4 w-4" />

          <span className="text-sm font-medium">{t("darkMode")}</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
