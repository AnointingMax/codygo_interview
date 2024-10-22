import { FEATURE_ICON, FEATURES } from "@/lib/constants";
import { useState } from "react";
import { Gallery as GridGallery, Image, ThumbnailImageProps } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import StarRatings from "react-star-ratings";
import "yet-another-react-lightbox/styles.css";
import { Button } from "@/components/ui/button";
import { FilePenLine, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { HotelForm } from "@/panels";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { deleteHotel, getHotel } from "@/api";
import { CustomPopover, GMap } from "@/components";

const Details = () => {
	const { id } = useParams();
	const [open, setOpen] = useState(false);

	const { data } = useQuery({
		queryKey: ["hotel", id],
		queryFn: () => getHotel(id as string),
		suspense: true,
	});
	const { mutate, isLoading } = useMutation(deleteHotel, {
		onSuccess: () => {},
	});

	const hotel = data?.data;

	if (!hotel) return null;

	return (
		<div className="grid max-w-6xl gap-6 mx-auto pb-28">
			<div className="flex items-center justify-between gap-2">
				<div>
					<h1 className="mb-1 text-lg font-bold">{hotel?.name}</h1>
					<div className="flex items-center gap-x-1 gap-y-1 max-w-[650px] flex-wrap">
						{hotel?.brands?.map((brand, index) => (
							<span key={index} className="flex items-center gap-1 px-2 py-1 bg-black rounded-full">
								<p className="text-xs font-medium text-white">{brand?.name}</p>
							</span>
						))}
					</div>
				</div>
				<CustomPopover
					align="end"
					trigger={<Button>Actions</Button>}
					actions={[
						{
							label: (
								<>
									<span className="flex items-center gap-2 text-sm font-medium text-[#404040] hover:bg-primary-transparent hover:text-primary">
										<FilePenLine className="size-[18px] flex-shrink-0" />
										Edit Hotel
									</span>
									<Sheet open={open} onOpenChange={() => {}}>
										<SheetContent setOpen={setOpen}>
											<SheetHeader>
												<SheetTitle>Edit Hotel</SheetTitle>
											</SheetHeader>
											<HotelForm hotel={hotel} setOpen={setOpen} />
										</SheetContent>
									</Sheet>
								</>
							),
							onClick: () => {},
						},
						{
							label: (
								<span className="flex items-center gap-2 text-sm font-medium text-destructive hover:bg-destructive/10">
									<Trash2 className="size-[18px] flex-shrink-0" />
									Delete Hotel
								</span>
							),
							disabled: isLoading,
							onClick: () => mutate(id as string),
						},
					]}
				/>
			</div>
			<Gallery
				images={hotel?.images.map(({ src, ...rest }) => ({
					src: [import.meta.env.VITE_API_URL, import.meta.env.VITE_IMAGE_PATH, src].join("/"),
					...rest,
				}))}
			/>
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
				<StarRatings rating={hotel?.rating} starDimension="30px" starSpacing="7px" starRatedColor="var(--default-color)" />
			</div>
			<div>
				<h2 className="detail-section">Hotel Features</h2>
				<div className="flex items-center mt-1 gap-x-4 gap-y-4 max-w-[650px] flex-wrap">
					{hotel?.features?.map((featureKey, index) => {
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
			<GMap coordinates={{ lat: hotel.latitude, lng: hotel.longitude }} setValues={() => {}} />
			<div className="grid gap-1">
				<span className="text-sm font-medium">Date created: {new Date(hotel?.createdAt).toLocaleString()}</span>
				<span className="text-sm font-medium">Date updated: {new Date(hotel?.updatedAt).toLocaleString()}</span>
			</div>
		</div>
	);
};

const Gallery = ({ images }: { images: Image[] }) => {
	const [index, setIndex] = useState(-1);

	const handleClick = (index: number) => setIndex(index);
	const slides = images.map(({ src, width, height }) => ({
		src,
		width,
		height,
	}));

	return (
		<>
			<GridGallery images={images} thumbnailImageComponent={ImageComponent} onClick={handleClick} enableImageSelection={false} />
			<Lightbox slides={slides} open={index >= 0} index={index} close={() => setIndex(-1)} />
		</>
	);
};

const ImageComponent = (props: ThumbnailImageProps) => {
	return <img crossOrigin="anonymous" {...props.imageProps} title="" />;
};

export default Details;
