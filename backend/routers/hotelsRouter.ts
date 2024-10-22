import { Router } from "express"
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotelsController";
import use from "../utils/use";
import validateRequestParameters, { createOrUpdateHotelValidator, hotelSearchValidator } from "../middleware/yupMiddleware";
import upload from "../services/fileUpload";

const hotelsRouter = Router()

hotelsRouter.get(
  "/",
  validateRequestParameters(hotelSearchValidator, "query"),
  use(getHotels)
);
hotelsRouter.get(
  "/:id",
  use(getHotel)
);
hotelsRouter.post(
  "/",
  upload.array("images[]"),
  validateRequestParameters(createOrUpdateHotelValidator, "body"),
  use(createHotel)
);
hotelsRouter.patch(
  "/:id",
  upload.array("images[]"),
  validateRequestParameters(createOrUpdateHotelValidator, "body"),
  use(updateHotel)
);
hotelsRouter.delete("/:id", use(deleteHotel));

export default hotelsRouter