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
   images: string[];
   brands: Brand[],
   createdAt: string,
   updatedAt: string,
};

export type Brand = {
   id: number;
   name: string;
   createdAt: string,
   updatedAt: string,
}