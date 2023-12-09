import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

type TData = {
  email: string;
  password: string;
};
export const useSignIn = () => {
  const navigate = useNavigate();
  const signIn = async ({ email, password }: TData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return response;
  };

  const mutation = useMutation(signIn, {
    onSuccess: () => navigate("/"),
  });

  const handleSignIn = async ({ email, password }: TData) => {
    await mutation.mutateAsync({
      email,
      password,
    });
  };

  return handleSignIn;
};
