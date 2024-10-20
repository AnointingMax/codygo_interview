import { Request, Response } from "express"
import { THotelCreateOrUpdate, THotelSearch } from "../middleware/yupMiddleware";
import prisma from "../prisma";

export const getHotels = async (req: Request, res: Response) => {
  const { search = "", country, rating = 5, features, page = 1, perPage = 15 } = req.query as unknown as THotelSearch;

  const hotels = await prisma.hotel.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive"
          },
        },
        {
          address: {
            contains: search,
            mode: "insensitive"
          },
        }
      ],
      country,
      rating: {
        lte: Number(rating)
      },
      ...(!!features?.length && {
        features: {
          hasSome: features
        }
      })
    },
    include: {
      brands: true
    },
    take: Number(perPage),
    skip: (Number(page) - 1) * Number(perPage)
  })

  const count = await prisma.hotel.count({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive"
          },
        },
        {
          address: {
            contains: search,
            mode: "insensitive"
          },
        }
      ],
      country,
      rating: {
        lte: Number(rating)
      },
      ...(!!features?.length && {
        features: {
          hasSome: features
        }
      })
    },
  })

  res.json({ message: "Hotels returned successfully", data: hotels, count })
}

export const createHotel = async (req: Request, res: Response) => {
  const { name, address, features, country, rating, city } = req.body as unknown as THotelCreateOrUpdate

  const rawFiles = req.files as Express.Multer.File[]
  const images = rawFiles?.map((file) => file.path)

  const hotel = await prisma.hotel.create({
    data: {
      name,
      address,
      city,
      features,
      country,
      rating: Number(rating),
      images,
    }
  })

  res.json({ message: "Hotel created successfully", data: hotel })
}

export const updateHotel = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, address, city, country, features, rating } = req.body as unknown as THotelCreateOrUpdate

  const rawFiles = req.files as Express.Multer.File[]
  const images = rawFiles?.map((file) => file.path)

  const hotel = await prisma.hotel.update({
    where: { id: Number(id) },
    data: {
      name,
      address,
      city,
      country,
      features,
      rating: Number(rating),
      images: {
        push: images
      }
    }
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