import { BellDot } from "lucide-react";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { NotificationItem } from "./notificationItem";

export const NotificationBar = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <BellDot className="h-6 w-6 text-garyColor" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-2 w-96 rounded-md px-5 py-7 shadow-card max-xs:w-56">
        <NotificationItem />
      </PopoverContent>
    </Popover>
  );
};
