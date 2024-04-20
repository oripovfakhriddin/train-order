import { toast } from "react-toastify";

import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

import { ENDPOINT, TOKEN } from "../constants";

const request: AxiosInstance = axios.create({
  baseURL: `${ENDPOINT}`,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${Cookies.get(TOKEN)}`,
  },
});

request.interceptors.response.use(
  async (response) => {
    return response;
  },
  (err) => {
    if (err?.message === "Network Error") {
      toast.error(`${err?.message}`);
    } else {
      toast.error(`${err?.response?.data?.message}`);
    }
    return Promise.reject(err);
  }
);

export default request;
