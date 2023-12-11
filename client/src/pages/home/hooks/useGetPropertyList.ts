import { TProperty } from "@/types/data";
import { axiosInstance } from "@/utils/axiosInstanse";
import { useQuery } from "react-query";

const fetchProperties = async ({ queryKey }: { queryKey: any }) => {
  const [_key, { filter }] = queryKey;
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_BASE_URL}/propertyList?${filter}=true`
  );
  return response.data;
};

export const useGetPropertyList = (filter: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["propertyList", { filter }],
    queryFn: fetchProperties,
    suspense: true,
  });
  return { data: data as TProperty[], isLoading };
};
