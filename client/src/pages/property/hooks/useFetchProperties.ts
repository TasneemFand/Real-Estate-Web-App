import { TProperty } from "@/types/data";
import { axiosInstance } from "@/utils/axiosInstanse";
import { useCallback } from "react";
import { useQuery } from "react-query";
import { useQueryKeys } from "./useQueryKeys";

export const useFetchProperties = () => {
  const { page, filters } = useQueryKeys();
  const fetchProperties = useCallback(async (page: number, filters: any) => {
    let searchParams = "";
    if (filters) {
      Object.keys(filters).map((key) => {
        if (filters[key]) {
          searchParams += `&${key}=${filters[key]}`;
        }
      });
    }
    const response = await axiosInstance.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/properties?page=${page}${searchParams}`
    );

    return response.data;
  }, []);

  const { isLoading, data, refetch } = useQuery(
    ["properties", page, filters],
    fetchProperties.bind(undefined, page, filters),
    {
      keepPreviousData: true,
      staleTime: 100000,
    }
  );

  return {
    data: data as unknown as {
      properties: TProperty[];
      totalPages: number;
      page: number;
    },
    isLoading,
    refetch,
  };
};
