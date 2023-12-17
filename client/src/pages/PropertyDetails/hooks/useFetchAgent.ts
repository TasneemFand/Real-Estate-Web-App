import { TProperty } from "@/types/data";
import { axiosInstance } from "@/utils/axiosInstanse";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

const fetchAgent = async (agent: string) => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_BASE_URL}/agentOfProperty/${agent}`
  );
  return response.data;
};
export const useFetchAgent = () => {
  const location = useLocation();
  const property = (location.state as TProperty) || undefined;

  const { data, isLoading } = useQuery(
    ["agentOfProperty", property._id, property.agent],
    () => fetchAgent(property.agent)
  );

  return {
    data: data,
    isLoading,
  };
};
