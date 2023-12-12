import { useState } from "react";
import { PropertyFilters } from "./PropertyFilters";
import { Paginate } from "./paginate";
import { useFetchProperties } from "../hooks/useFetchProperties";
import MoonLoader from "react-spinners/MoonLoader";

export const PropertyTable = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    location: "",
    Status: "",
    type: "",
  });
  const { data, isLoading } = useFetchProperties(page, filters);
  return (
    <div className="flex h-screen w-full flex-col rounded-2xl bg-white px-3 py-4">
      <PropertyFilters handleFilters={setFilters} />
      {isLoading ? (
        <MoonLoader color="#475be8" speedMultiplier={0.5} className="m-auto" />
      ) : (
        <>
          <Paginate
            page={page}
            handlePage={setPage}
            totalPages={data.totalPages}
          />
        </>
      )}
    </div>
  );
};
