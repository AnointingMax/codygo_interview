import { Request, Response } from "express"
import { THotelCreateOrUpdate, THotelSearch } from "../middleware/yupMiddleware";
import prisma from "../prisma";

export const getHotels = async (req: Request, res: Response) => {
  const { search, country, rating, features } = req.query as unknown as THotelSearch;

  const hotels = await prisma.hotel.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          address: {
            contains: search,
            mode: "insensitive"
          }
        }
      ],
      country,
      rating: {
        lte: rating
      },
      features: {
        hasSome: features
      }
    },
    include: {
      brands: true
    }
  })

  res.json({ message: "Hotels returned successfully", data: hotels })
}

export const createHotel = async (req: Request, res: Response) => {
  const { name, address, features, country, rating, city } = req.body as unknown as THotelCreateOrUpdate

  const hotel = await prisma.hotel.create({
    data: { name, address, city, features, country, rating }
  })

  res.json({ message: "Hotel created successfully", data: hotel })
}

export const updateHotel = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name } = req.body as unknown as THotelCreateOrUpdate

  const hotel = await prisma.hotel.update({
    where: { id: Number(id) },
    data: { name }
  })

  res.json({ message: "Hotel updated successfully", hotel })
}

export const deleteHotel = async (req: Request, res: Response) => {
  const { id } = req.params

  await prisma.hotel.delete({
    where: { id: Number(id) }
  })

  res.json({ message: "Hotel deleted successfully" })
}