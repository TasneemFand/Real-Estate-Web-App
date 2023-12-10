import axios from "axios";
import { useMutation } from "react-query";

type TData = {
  email: string;
  password: string;
};
export const useSignIn = () => {
  const signIn = async ({ email, password }: TData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return response.data;
  };

  const mutation = useMutation(signIn);

  const handleSignIn = async ({ email, password }: TData) => {
    return await mutation.mutateAsync({
      email,
      password,
    });
  };

  return handleSignIn;
};
