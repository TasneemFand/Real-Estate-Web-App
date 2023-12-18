import { Search } from "lucide-react";
import { SearchInput } from "./components/SearchInput";
import { NotificationBar } from "./components/notificationBar";
import { Profile } from "./components/profile";
import { MobileMenu } from "./components/mobileMenu";
import { LanguageSelector } from "./components/languageSelector";

export const Header = () => {
  return (
    <header className="h-16 w-full bg-white px-5 max-xs:px-2">
      <nav className="flex items-center justify-between px-5 py-4 max-lg:px-0">
        <div id="mobile menu" className="hidden max-sm:flex">
          <MobileMenu />
        </div>
        <div className="max-xs:hidden">
          <SearchInput />
        </div>
        <div id="search mobile" className="hidden gap-1 max-xs:flex">
          <Search className="h-4 w-4 text-grayIcon" />
          <input
            type="text"
            placeholder="Search.."
            className=" text-garyColor"
          />
        </div>
        <div id="profile" className="flex items-center gap-5">
          <NotificationBar />
          <Profile />
          <LanguageSelector />
        </div>
      </nav>
    </header>
  );
};
