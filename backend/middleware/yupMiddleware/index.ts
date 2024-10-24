import * as Yup from "yup"
import { NextFunction, Request, Response } from "express";

type ReqParameter = keyof Request

const validateRequestParameters = (resourceSchema: Yup.ObjectSchema<{}, Yup.AnyObject, {}, "">, reqParameter: ReqParameter) => async (req: Request, res: Response, next: NextFunction) => {
  const resource = req[reqParameter];

  try {
    await resourceSchema.validate(resource);
    next();
  } catch (e: any) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
};

export const brandSearchValidator = Yup.object().shape({
  name: Yup.string(),
  page: Yup.number().integer().positive(),
  perPage: Yup.number().integer().positive(),
});

export const createOrUpdateBrandValidator = Yup.object().shape({
  name: Yup.string().required("Brand name is required")
});

export const hotelSearchValidator = Yup.object().shape({
  search: Yup.string(),
  country: Yup.string(),
  rating: Yup.number().max(5, "Maximum rating is 5").min(0, "Minimum rating is 0"),
  features: Yup.array().of(Yup.string().required()),
  brands: Yup.array().of(Yup.number().required()),
  page: Yup.number().integer().positive(),
  perPage: Yup.number().integer().positive(),
});

export const createOrUpdateHotelValidator = Yup.object().shape({
  name: Yup.string().required("Hotel name is required"),
  address: Yup.string().required("Hotel address is required"),
  city: Yup.string().required("Hotel city is required"),
  latitude: Yup.number().required("Hotel latitude is required"),
  longitude: Yup.number().required("Hotel longitude is required"),
  country: Yup.string().required("Hotel country is required"),
  rating: Yup.number().max(5, "Maximum rating is 5").min(0, "Minimum rating is 0"),
  features: Yup.array().of(Yup.string().required()).min(2, "You must provide at least 2 hotel features").required("Hotel features are required"),
  brands: Yup.array().of(Yup.number().required()).min(1, "You must provide at least 1 hotel brand").required("Hotel brand is required"),
});

export type TBrandSearch = Yup.InferType<typeof brandSearchValidator>;
export type TBrandCreateOrUpdate = Yup.InferType<typeof createOrUpdateBrandValidator>;
export type THotelSearch = Yup.InferType<typeof hotelSearchValidator>;
export type THotelCreateOrUpdate = Yup.InferType<typeof createOrUpdateHotelValidator>;

export default validateRequestParameters