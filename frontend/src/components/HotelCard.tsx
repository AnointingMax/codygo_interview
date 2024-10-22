import { FEATURE_ICON } from "@/lib/constants";
import { HotelType } from "@/types";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "./ui/carousel";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Image } from "react-grid-gallery";

type Props = {
	hotel: HotelType;
};
const featureCount = 3;

const HotelCard = ({ hotel }: Props) => {
	const firstFourFeatures = hotel?.features?.slice(0, featureCount);
	const extraFeatureCount = hotel?.features.length - featureCount;

	return (
		<Link to="#">
			<ImageCarousel images={hotel.images} />
			<div className="pt-2">
				<p className="font-semibold">{hotel.name}</p>
				<p className="text-sm text-black/70">
					{hotel.address}, {hotel.city}, {hotel.country}
				</p>
				<StarRatings rating={hotel.rating} starDimension="17px" starSpacing="2px" starRatedColor="var(--default-color)" />
				<div className="flex items-center gap-2 mt-1">
					{firstFourFeatures?.map((featureKey, index) => {
						const Icon = FEATURE_ICON[featureKey];

						return (
							<span key={index}>
								<Icon className="w-[16px] h-[16px]" />
							</span>
						);
					})}
					{extraFeatureCount > 0 && <div className="text-xs text-default">+ {extraFeatureCount} more</div>}
				</div>
			</div>
		</Link>
	);
};

const ImageCarousel = ({ images }: { images: Image[] }) => {
	const [api, setApi] = useState<CarouselApi>();

	return <Carousel
		setApi={setApi}
		opts={{
			align: "start",
			loop: true,
		}}
	>
		<CarouselContent>
			{images
				.map((image, index) => {
					const path = [import.meta.env.VITE_API_URL, import.meta.env.VITE_IMAGE_PATH, image.src].join("/")
					return (
						<CarouselItem key={index}>
							<img crossOrigin="anonymous" src={path} className="w-full rounded-md" alt="" />
						</CarouselItem>
					)
				})}
		</CarouselContent>
		<CarouselDots dotApi={api} />
	</Carousel>
}

const CarouselDots = ({ dotApi }: { dotApi: CarouselApi }) => {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		dotApi?.on("select", () => {
			setCurrent(dotApi?.selectedScrollSnap());
		});
	}, [dotApi]);

	return (
		<div className="absolute flex items-center gap-1 -translate-x-1/2 bottom-2 left-1/2">
			{Array(dotApi?.scrollSnapList().length ?? 0)
				.fill("")
				.map((_, index) => (
					<button
						onClick={() => dotApi?.scrollTo(index)}
						className={cn("w-[9px] aspect-square rounded-full bg-default", current === index ? "opacity-95" : "opacity-40")}
						key={index}
					/>
				))}
		</div>
	);
};

export default HotelCard;
