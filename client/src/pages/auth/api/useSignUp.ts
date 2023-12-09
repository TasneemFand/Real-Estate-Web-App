import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

type TSignUpData = {
  email: string;
  password: string;
  username: string;
};
export const useSignUp = () => {
  const navigate = useNavigate();
  const signUp = async ({ email, password, username }: TSignUpData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
      {
        email,
        username,
        password,
      }
    );
    return response.data;
  };

  const mutation = useMutation(signUp, {
    onSuccess: () => navigate("/login"),
  });

  const handleSignUp = async ({ email, password, username }: TSignUpData) => {
    await mutation.mutateAsync({
      email,
      password,
      username,
    });
  };

  return handleSignUp;
};
