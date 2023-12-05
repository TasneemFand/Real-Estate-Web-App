import { sidebarMenu } from "@/data/sideBarMenu";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

export const MobileMenu = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <Menu className="h-4 w-4 text-primary-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="popoverContent w-72">
        {sidebarMenu.map((menu) => (
          <NavLink
            key={menu.title}
            to={menu.path}
            className={({ isActive, isPending }) =>
              isActive
                ? "sideBarLink ActiveLink"
                : isPending
                ? "pending"
                : "sideBarLink hoverLink bg-white text-secondary-foreground"
            }
          >
            {menu.Icon}
            <span className="text-base font-bold">{menu.title}</span>
          </NavLink>
        ))}
      </PopoverContent>
    </Popover>
  );
};
