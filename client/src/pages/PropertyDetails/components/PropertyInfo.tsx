import { TProperty } from "@/types/data";
import { MapPin } from "lucide-react";
import { useLocation } from "react-router-dom";

export const PropertyInfo = () => {
  const location = useLocation();
  const property = (location.state as TProperty) || undefined;
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        <img src={property.photo} />
        <div className="flex flex-col gap-2 self-center max-[1240px]:flex-row">
          <div
            className="h-32 w-56 bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(${property.photo})` }}
          ></div>
          <div
            className="flex h-32 w-56 items-center justify-center bg-background bg-contain bg-no-repeat"
            style={{
              backgroundImage: `url(${property.photo})`,
              boxShadow: "inset 0 0 0 2000px rgb(69 69 69 / 30%)",
            }}
          >
            <span className="text-2xl text-foreground">+ 10</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <p className="text-base font-semibold text-foreground">
            {property.type}
          </p>
          <p>rating</p>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-lg font-semibold text-foreground">
              {property.name}
            </p>
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 dark:text-secondary-foreground" />
              <span className="text-sm text-secondary-foreground">
                {`${property.location.country}, ${property.location.city}`}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 ">
            <span className="text-base font-semibold text-foreground ">
              Price
            </span>
            <div className="rounded-[4px] bg-[#DADEFA] px-1 py-2 font-semibold text-primary">{`$ ${property.price}`}</div>
          </div>
        </div>
        <span className="text-base font-semibold text-foreground">
          Facillity
        </span>
        <div className="flex flex-wrap gap-6">
          {Object.keys(property.facility)?.map((key) => {
            if (typeof property.facility[key] === "boolean") {
              return <p className="text-base text-foreground ">{key}</p>;
            } else if (typeof property.facility[key] === "number") {
              return (
                <p className="text-base text-foreground ">
                  {property.facility[key]} {key}
                </p>
              );
            }
          })}
        </div>
        <span className="text-base font-semibold text-foreground">
          Description
        </span>
        <div className="flex flex-wrap">
          <p className="text-base text-foreground">{property.description}</p>
        </div>
      </div>
    </div>
  );
};
