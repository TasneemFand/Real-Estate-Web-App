import { TCreateProperty } from "@/types/data";
import { axiosInstance } from "@/utils/axiosInstanse";
import { useMutation } from "react-query";

export const useCreateProperty = () => {
  const createProperty = async (values: TCreateProperty) => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API_BASE_URL}/createProperty`,
      {
        ...values,
      }
    );
    return { property: response.data };
  };
  const mutation = useMutation(createProperty);

  const handleCreateProperty = async (values: TCreateProperty) => {
    return await mutation.mutateAsync(values);
  };
  return { ...mutation, handleCreateProperty };
};
