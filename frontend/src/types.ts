import { Image } from "react-grid-gallery";

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