import { Image } from "react-grid-gallery";
import * as Yup from "yup"

export type HotelType = {
   id: number;
   name: string;
   address: string;
   city: string;
   country: string;
   rating: number;
   longitude: number;
   latitude: number;
   features: string[];
   images: Image[];
   brands: BrandType[],
   createdAt: string,
   updatedAt: string,
};

export type BrandType = {
   id: number;
   name: string;
   createdAt: string,
   updatedAt: string,
}

export const hotelFormValidationSchema = Yup.object().shape({
   id: Yup.number(),
   name: Yup.string().required("Hotel name is required"),
   address: Yup.string().required("Hotel address is required"),
   city: Yup.string().required("Hotel city is required"),
   country: Yup.string().required("Hotel country is required"),
   rating: Yup.number().max(5, "Maximum rating is 5").min(0, "Minimum rating is 0").required("Hotel rating is required"),
   latitude: Yup.number().required("Hotel latitude is required").typeError("Hotel address could not be gotten from map"),
   longitude: Yup.number().required("Hotel longitude is required").typeError("Hotel address could not be gotten from map"),
   features: Yup.array()
      .of(Yup.string().required())
      .min(2, "You must provide at least 2 hotel features")
      .required("Hotel features are required"),
   images: Yup.array().when("id", {
      is: (val) => !!val,
      then: (schema) => schema,
      otherwise: (schema) => schema.min(2, "You must provide at least 2 images").required("Hotel images are required"),
   }),
   brands: Yup.array().of(Yup.number().required()).min(1, "You must provide at least 1 hotel brand").required("Hotel brands are required"),
});

export const brandFormValidationSchema = Yup.object().shape({
   id: Yup.number(),
   name: Yup.string().required("Brand name is required"),
});

export type HotelFormType = Yup.InferType<typeof hotelFormValidationSchema>;
export type BrandFormType = Yup.InferType<typeof brandFormValidationSchema>;