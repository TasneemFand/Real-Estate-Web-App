import { TProperty } from "@/types/data";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

type TProps = {
  property: TProperty;
};
export const PropertyCard = ({ property }: TProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-1 cursor-pointer items-center gap-4"
      onClick={() => navigate(`${property._id}`, { state: property })}
    >
      <div
        className={`h-full w-72 flex-[0.5] bg-contain bg-no-repeat`}
        style={{ backgroundImage: `url(${property.photo})` }}
      />
      <div className="flex flex-1 flex-col items-start gap-3">
        <p className="whitespace-nowrap text-base font-semibold text-foreground hover:underline">
          {property.name}
        </p>
        <div className="flex items-center gap-2">
          <MapPin className="h-3 w-3 dark:text-secondary-foreground" />
          <span className="text-sm text-secondary-foreground">
            {`${property.location.country}, ${property.location.city}`}
          </span>
        </div>
        <div className="rounded-[4px] bg-[#DADEFA] px-1 py-2 font-semibold text-primary">{`$ ${property.price}`}</div>
      </div>
    </div>
  );
};
