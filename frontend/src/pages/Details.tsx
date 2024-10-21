import { FEATURE_ICON, FEATURES, images } from "@/lib/constants";
import { useRef, useState } from "react";
import { Gallery as GridGallery } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import StarRatings from "react-star-ratings";
import "yet-another-react-lightbox/styles.css";
import { Button } from "@/components/ui/button";
import { FilePenLine } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { HotelForm } from "@/panels";
import { HotelType } from "@/types";
import { GMapify } from "g-mapify";
import "g-mapify/dist/index.css";

const Details = () => {
	const hotel: HotelType = {
		id: 1,
		name: "Le Meriden",
		address: "24 Ocean Avenue",
		city: "Miami",
		country: "US",
		rating: 4.2,
		latitude: 6.5700419,
		longitude: 3.3758778,
		features: [
			"free_wifi",
			"parking",
			"air_conditioning",
			"swimming_pool",
			"fitness_center",
			"restaurant",
			"bar",
			"room_service",
			"airport_shuttle",
		],
		images: [],
		brands: [],
		createdAt: "2024-10-20T03:27:45.840Z",
		updatedAt: "2024-10-20T03:27:45.840Z",
	};
	const mapRef = useRef();

	return (
		<div className="grid max-w-6xl gap-6 mx-auto pb-28">
			<div>
				<div className="flex items-center gap-2">
					<h1 className="text-lg font-bold">{hotel.name}</h1>
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="custom" className="gap-2 px-0 text-default">
								<FilePenLine />
								Edit
							</Button>
						</SheetTrigger>
						<SheetContent className="">
							<SheetHeader>
								<SheetTitle>Edit Hotel</SheetTitle>
							</SheetHeader>
							<HotelForm />
						</SheetContent>
					</Sheet>
				</div>
				<div className="flex items-center gap-x-1 gap-y-1 max-w-[650px] flex-wrap">
					{hotel.brands?.map((brand, index) => (
						<span key={index} className="flex items-center gap-1 px-2 py-1 bg-black rounded-full">
							<p className="text-xs font-medium text-white">{brand?.name}</p>
						</span>
					))}
				</div>
			</div>
			<Gallery />
			<div>
				<h2 className="detail-section">Address</h2>
				<div className="grid gap-x-4 gap-y-1 grid-cols-[100px,1fr]">
					<div className="font-medium text-black/90">Street:</div>
					<div>{hotel?.address}</div>
					<div className="font-medium text-black/90">City:</div>
					<div>{hotel?.city}</div>
					<div className="font-medium text-black/90">Country:</div>
					<div>{hotel?.country}</div>
				</div>
			</div>
			<div>
				<h2 className="detail-section">Rating</h2>
				<StarRatings rating={hotel.rating} starDimension="30px" starSpacing="7px" starRatedColor="var(--default-color)" />
			</div>
			<div>
				<h2 className="detail-section">Hotel Features</h2>
				<div className="flex items-center mt-1 gap-x-4 gap-y-4 max-w-[650px] flex-wrap">
					{hotel.features?.map((featureKey, index) => {
						const Icon = FEATURE_ICON[featureKey];
						const feature = FEATURES.find((feature) => feature.value === featureKey);

						return (
							<span key={index} className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-default/20">
								<Icon className="w-[16px] h-[16px]" />
								<p className="text-sm font-medium">{feature?.label}</p>
							</span>
						);
					})}
				</div>
			</div>
			<GMapify
				appKey={import.meta.env.VITE_GOOGLE_MAP_KEY}
				ref={mapRef}
				lat={hotel?.latitude}
				lng={hotel?.longitude}
				mapClassName="h-[400px]"
				hasSearch
				mapOptions={{
					zoomControl: true,
					fullscreenControl: true,
					streetViewControl: true,
					clickableIcons: true,
				}}
			/>
			<div className="grid gap-1">
				<span className="text-sm font-medium">Date created: {new Date(hotel.createdAt).toLocaleString()}</span>
				<span className="text-sm font-medium">Date updated: {new Date(hotel.updatedAt).toLocaleString()}</span>
			</div>
		</div>
	);
};

const slides = images.map(({ src, width, height }) => ({
	src,
	width,
	height,
}));

const Gallery = () => {
	const [index, setIndex] = useState(-1);

	const handleClick = (index: number) => setIndex(index);

	return (
		<>
			<GridGallery images={images} onClick={handleClick} enableImageSelection={false} />
			<Lightbox slides={slides} open={index >= 0} index={index} close={() => setIndex(-1)} />
		</>
	);
};

export default Details;
