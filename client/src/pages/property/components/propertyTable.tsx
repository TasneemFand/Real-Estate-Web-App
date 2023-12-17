import { PropertyFilters } from "./PropertyFilters";
import { Paginate } from "./paginate";
import { useFetchProperties } from "../hooks/useFetchProperties";
import MoonLoader from "react-spinners/MoonLoader";
import { PropertyCard } from "./propertyCard";

export const PropertyTable = () => {
  const { data, isLoading } = useFetchProperties();

  return (
    <div className="flex h-screen w-full flex-col rounded-2xl bg-white px-3 py-4">
      <PropertyFilters />
      {isLoading ? (
        <MoonLoader color="#475be8" speedMultiplier={0.5} className="m-auto" />
      ) : (
        <>
          {data.properties.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-2xl font-semibold text-foreground">
                No Property Found
              </p>
            </div>
          ) : null}
          <div className="mt-6 flex w-full flex-wrap  gap-8 overflow-y-scroll py-5">
            {data.properties.map((prop) => (
              <PropertyCard property={prop} />
            ))}
          </div>
          <Paginate totalPages={data.totalPages} />
        </>
      )}
    </div>
  );
};
