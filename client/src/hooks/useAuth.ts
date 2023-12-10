import { getCookie } from "@/utils/axiosInstanse";

export const useAuth = () => {
  const token = getCookie("TOKEN-AUTH");
  const user = getCookie("user");
  if (token && user) {
    return user === token;
  }
  return null;
};
