import { TProperty } from "@/types/data";
import { MapPin } from "lucide-react";

type TProps = {
  property: TProperty;
};
export const PropertyCard = ({ property }: TProps) => {
  return (
    <div className="flex flex-1 items-center gap-4">
      <div className="flex-2 w-72">
        <img src={property.photo} alt="property image" className="rounded-sm" />
      </div>
      <div className="flex flex-1 flex-col items-start gap-3">
        <p className="text-base font-semibold text-foreground">
          {property.name}
        </p>
        <div className="flex items-center gap-2">
          <MapPin className="h-3 w-3" />
          <span className="text-sm text-secondary-foreground">
            {`${property.location.country}, ${property.location.city}`}
          </span>
        </div>
        <div className="rounded-[4px] bg-[#DADEFA] px-1 py-2 font-semibold text-primary">{`$ ${property.price}`}</div>
      </div>
    </div>
  );
};
