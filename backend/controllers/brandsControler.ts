import { Request, Response } from "express"
import prisma from "../prisma";
import { TBrandCreateOrUpdate, TBrandSearch } from "../middleware/yupMiddleware";

export const getBrands = async (req: Request, res: Response) => {
  const { name } = req.query as unknown as TBrandSearch;

  const brands = await prisma.brand.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive"
      },
    },
  })

  res.json({ message: "Brands returned successfully", data: brands })
}

export const createBrand = async (req: Request, res: Response) => {
  const { name } = req.body as unknown as TBrandCreateOrUpdate

  const brand = await prisma.brand.create({
    data: { name }
  })

  res.json({ message: "Brand created successfully", data: brand })
}

export const updateBrand = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name } = req.body as unknown as TBrandCreateOrUpdate

  const brand = await prisma.brand.update({
    where: { id: Number(id) },
    data: { name }
  })

  res.json({ message: "Brand updated successfully", brand })
}

export const deleteBrand = async (req: Request, res: Response) => {
  const { id } = req.params

  await prisma.brand.delete({
    where: { id: Number(id) }
  })

  res.json({ message: "Brand deleted successfully" })
}