import axios from "axios"
import { showErrorToast } from "./utils/functions";
import { BrandType, HotelType } from "./types";

const instance = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.response.use(
   (response) => response.data,
   (error) => {
      showErrorToast(error.response.data.error, {
         closeButton: true,
      });
      throw new Error(error.response.data.error);
   }
);

type APIResponseType<T> = {
   message: string,
   data: T
}

export const getBrands = (): Promise<APIResponseType<BrandType[]>> => instance.get("/brands");

export const getHotels = (params): Promise<APIResponseType<HotelType[]>> => instance.get("/hotels", { params });