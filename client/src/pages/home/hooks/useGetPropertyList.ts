import { TProperty } from "@/types/data";
import { axiosInstance } from "@/utils/axiosInstanse";
import { useQuery } from "react-query";

const fetchProperties = async (filter: any) => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_BASE_URL}/propertyList?${filter}=true`
  );
  return response.data;
};

export const useGetPropertyList = (filter: string) => {
  const { data, isLoading } = useQuery(
    ["propertyList", filter],
    () => fetchProperties(filter),
    { suspense: true }
  );
  return { data: data as TProperty[], isLoading };
};
