import axios from "axios"
import { removeEmptyValues, showErrorToast } from "./utils/functions";
import { BrandType, HotelFormType, HotelType } from "./types";

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

export const getHotels = (params): Promise<APIResponseType<HotelType[]>> => instance.get("/hotels", { params: removeEmptyValues(params) });

export const getHotel = (id: number | string): Promise<APIResponseType<HotelType>> => instance.get(`/hotels/${id}`);

export const createHotel = (data: HotelFormType): Promise<APIResponseType<HotelType>> => instance.post("/hotels", data, { headers: { "Content-Type": "multipart/form-data" } })

export const updateHotel = ({ id, ...data }: HotelFormType): Promise<APIResponseType<HotelType>> => instance.patch(`/hotels/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } })