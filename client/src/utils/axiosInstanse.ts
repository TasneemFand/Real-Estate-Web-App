import axios from "axios";

const TIME_OUT = 20000;
export const axiosInstance = axios.create({
  timeout: TIME_OUT,
  timeoutErrorMessage: "The request took too long. Please try again",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    try {
      const token = getCookie("TOKEN-AUTH");
      request.headers.Authorization = `Bearer ${token}`;
      return request;
    } catch (error) {
      throw new Error(
        "An error occurred while processing your request. Please try again later."
      );
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getCookie = (cname: string) => {
  const name = cname + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
