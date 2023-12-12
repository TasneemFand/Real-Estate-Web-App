import { TProperty } from "@/types/data";
import { axiosInstance } from "@/utils/axiosInstanse";
import { useQuery } from "react-query";

export const useFetchProperties = (
  page: number,
  filters: {
    location: string;
    Status: string;
    type: string;
  }
) => {
  const fetchProperties = async (page: number, filters: any) => {
    let searchParams = "";
    Object.keys(filters).map((key) => {
      if (filters[key]) {
        searchParams += `&${key}=${filters[key]}`;
      }
    });
    const response = await axiosInstance.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/properties?page=${page}${searchParams}`
    );
    return response.data;
  };

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(
      ["properties", page, filters],
      () => fetchProperties(page, filters),
      {
        keepPreviousData: true,
      }
    );

  return {
    data: data as unknown as {
      properties: TProperty[];
      totalPages: number;
    },
    isLoading,
  };
};
