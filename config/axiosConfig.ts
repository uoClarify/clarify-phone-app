import axios, { AxiosInstance } from "axios";

let axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8081/api",
  headers: {
    common: {
      "X-API-KEY": "",
    },
  },
});

export const updateAxiosDefaultHeaders = (headers: Record<string, string>) => {
  axiosInstance.defaults.headers.common = {
    ...axiosInstance.defaults.headers.common,
    ...headers,
  };
};

export const updateAxiosDefaultURL = (url: string) => {
  axiosInstance.defaults.baseURL = url;
};

export default axiosInstance;
