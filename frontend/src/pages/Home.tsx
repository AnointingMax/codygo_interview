import { HotelCard, Search } from "@/components";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchContextProvider } from "@/context";
import { HotelType } from "@/types";
import { ListFilter } from "lucide-react";

const Home = () => {
	const hotels: HotelType[] = [
		{
			id: 1,
			name: "Le Meriden",
			address: "24 Ocean Avenue",
			city: "Miami",
			country: "US",
			latitude: 6.5700419,
			longitude: 3.3758778,
			rating: 4.2,
			features: ["free_wifi", "parking", "air_conditioning"],
			images: [],
			brands: [],
			createdAt: "2024-10-20T03:27:45.840Z",
			updatedAt: "2024-10-20T03:27:45.840Z",
		},
		{
			id: 2,
			name: "Le Meriden",
			address: "24 Ocean Avenue",
			city: "Miami",
			country: "US",
			latitude: 6.5700419,
			longitude: 3.3758778,
			rating: 4.2,
			features: ["free_wifi", "parking", "air_conditioning"],
			images: [],
			brands: [],
			createdAt: "2024-10-20T03:27:45.840Z",
			updatedAt: "2024-10-20T03:27:45.840Z",
		},
		{
			id: 3,
			name: "Le Meriden",
			address: "24 Ocean Avenue",
			city: "Miami",
			country: "US",
			latitude: 6.5700419,
			longitude: 3.3758778,
			rating: 4.2,
			features: ["free_wifi", "parking", "air_conditioning"],
			images: [],
			brands: [],
			createdAt: "2024-10-20T03:27:45.840Z",
			updatedAt: "2024-10-20T03:27:45.840Z",
		},
		{
			id: 4,
			name: "Le Meriden",
			address: "24 Ocean Avenue",
			city: "Miami",
			country: "US",
			latitude: 6.5700419,
			longitude: 3.3758778,
			rating: 4.2,
			features: ["free_wifi", "parking", "air_conditioning"],
			images: [],
			brands: [],
			createdAt: "2024-10-20T03:27:45.840Z",
			updatedAt: "2024-10-20T03:27:45.840Z",
		},
		{
			id: 5,
			name: "Le Meriden",
			address: "24 Ocean Avenue",
			city: "Miami",
			country: "US",
			latitude: 6.5700419,
			longitude: 3.3758778,
			rating: 4.2,
			features: ["free_wifi", "parking", "air_conditioning"],
			images: [],
			brands: [],
			createdAt: "2024-10-20T03:27:45.840Z",
			updatedAt: "2024-10-20T03:27:45.840Z",
		},
	];

	return (
		<SearchContextProvider>
			<div className="grid gap-8 md:grid-cols-[clamp(200px,25vw,270px),1fr]">
				<Search />
				<div>
					<MobileSearch />
					<div className="grid gap-6 md:grid-cols-[repeat(auto-fill,minmax(230px,1fr))] grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
						{hotels?.map((hotel) => (
							<HotelCard hotel={hotel} key={hotel.id} />
						))}
					</div>
				</div>
			</div>
		</SearchContextProvider>
	);
};

const MobileSearch = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="rounded-full aspect-square md:hidden">
					<ListFilter />
				</Button>
			</SheetTrigger>
			<SheetContent className="pt-12">
				<Search panel />
			</SheetContent>
		</Sheet>
	);
};

export default Home;
