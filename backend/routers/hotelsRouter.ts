import { Router } from "express"
import { createHotel, deleteHotel, getHotels, updateHotel } from "../controllers/hotelsController";
import use from "../utils/use";
import validateRequestParameters, { createOrUpdateHotelValidator } from "../middleware/yupMiddleware";

const hotelsRouter = Router()

hotelsRouter.get("/", use(getHotels));
hotelsRouter.post("/", validateRequestParameters(createOrUpdateHotelValidator, "body"), use(createHotel));
hotelsRouter.patch("/:id", validateRequestParameters(createOrUpdateHotelValidator, "body"), use(updateHotel));
hotelsRouter.delete("/:id", use(deleteHotel));

export default hotelsRouter