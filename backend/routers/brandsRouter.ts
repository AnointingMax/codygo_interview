import { Router } from "express"
import { createBrand, deleteBrand, getBrands, updateBrand } from "../controllers/brandsControler";
import validateRequestParameters, { brandSearchValidator, createOrUpdateBrandValidator } from "../middleware/yupMiddleware";
import use from "../utils/use";

const brandsRouter = Router()

brandsRouter.get("/", validateRequestParameters(brandSearchValidator, "query"), use(getBrands));
brandsRouter.post("/", validateRequestParameters(createOrUpdateBrandValidator, "body"), use(createBrand));
brandsRouter.patch("/:id", validateRequestParameters(createOrUpdateBrandValidator, "body"), use(updateBrand));
brandsRouter.delete("/:id", use(deleteBrand));

export default brandsRouter