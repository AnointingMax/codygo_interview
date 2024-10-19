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