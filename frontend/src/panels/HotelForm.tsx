/* eslint-disable no-mixed-spaces-and-tabs */
import { FEATURES } from "@/lib/constants";
import { CheckBox, Dropzone, GMap, Input, Slider } from "@/components";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HotelFormType, hotelFormValidationSchema, HotelType } from "@/types";
import { ErrorMessage, Formik } from "formik";
import { createHotel, getBrands, updateHotel } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "@/utils/functions";

type Props = { hotel?: HotelType; setOpen: React.Dispatch<React.SetStateAction<boolean>> };

const HotelForm = ({ hotel, setOpen }: Props) => {
	const queryClient = useQueryClient();

	const initialValues: HotelFormType = {
		id: hotel?.id,
		name: hotel?.name ?? "",
		address: hotel?.address ?? "",
		city: hotel?.city ?? "",
		country: hotel?.country ?? "",
		rating: hotel?.rating ?? 0,
		latitude: hotel?.latitude ?? 0,
		longitude: hotel?.longitude ?? 0,
		features: hotel?.features ?? [],
		brands: hotel?.brands?.map((brand) => brand.id) ?? [],
		images: [],
	};

	const { data } = useQuery({
		queryKey: ["brands"],
		queryFn: getBrands,
		suspense: true,
	});
	const { mutate, isLoading } = useMutation(!hotel ? createHotel : updateHotel, {
		onSuccess: async ({ message }) => {
			showSuccessToast(message, { closeButton: true });
			setOpen(false);
			await queryClient.refetchQueries({ queryKey: [!hotel ? "hotels" : "hotel"], type: "active" });
		},
	});

	const brandsResponse = data?.data;

	return (
		<Formik initialValues={initialValues} validationSchema={hotelFormValidationSchema} onSubmit={(values) => mutate(values)}>
			{({ values, handleChange, handleSubmit, setFieldValue }) => {
				return (
					<form onSubmit={handleSubmit} className="grid gap-4">
						<Input placeholder="Enter hotel name" label="Hotel Name" value={values.name} name="name" onChange={handleChange} />
						<GMap
							setValues={(data) => {
								const address = data?.formatted_address;

								const country = address?.split(", ")?.at(-1);
								const city = address?.split(", ")?.at(-2);
								const latitude = data?.geometry?.location?.lat();
								const longitude = data?.geometry?.location?.lng();

								setFieldValue("latitude", latitude, true);
								setFieldValue("longitude", longitude, true);
								setFieldValue("city", city, true);
								setFieldValue("country", country, true);
								setFieldValue("address", address, true);
							}}
						/>
						<div>
							<Accordion type="single" defaultValue="brands" className="w-full">
								<AccordionItem value="brands">
									<AccordionTrigger className="text-[0.8rem] font-medium text-black/50 hover:no-underline">Brands</AccordionTrigger>
									<AccordionContent className="grid gap-1 max-h-[200px] overflow-y-auto mb-3">
										{brandsResponse?.map(({ id, name }) => (
											<CheckBox
												key={id}
												id={`brands-${id}`}
												label={name}
												value={id}
												checked={values.brands.includes(Number(id))}
												onCheckedChange={(checked) =>
													checked
														? setFieldValue("brands", [...values.brands, Number(id)])
														: setFieldValue(
																"brands",
																values.brands?.filter((brand) => brand !== Number(id))
														  )
												}
											/>
										))}
									</AccordionContent>
								</AccordionItem>
							</Accordion>
							<ErrorMessage name="brands" component="div" className="block mt-1 text-xs text-destructive" />
						</div>
						<Slider
							label="Rating"
							defaultValue={[5]}
							max={5}
							step={0.1}
							name="rating"
							value={[values.rating]}
							onValueChange={([rating]) => setFieldValue("rating", rating)}
						/>
						<div>
							<Accordion type="single" defaultValue="features" className="w-full">
								<AccordionItem value="features">
									<AccordionTrigger className="text-[0.8rem] font-medium text-black/50 hover:no-underline">
										Features
									</AccordionTrigger>
									<AccordionContent className="grid gap-1 max-h-[200px] overflow-y-auto mb-3">
										{FEATURES?.map(({ value, label }) => (
											<CheckBox
												key={value}
												id={value}
												label={label}
												value={value}
												checked={values.features.includes(value)}
												onCheckedChange={(checked) =>
													checked
														? setFieldValue("features", [...values.features, value])
														: setFieldValue(
																"features",
																values.features?.filter((feature) => feature !== value)
														  )
												}
											/>
										))}
									</AccordionContent>
								</AccordionItem>
							</Accordion>
							<ErrorMessage name="features" component="div" className="block mt-1 text-xs text-destructive" />
						</div>
						<Dropzone name="images" multiple />
						<div>
							<ErrorMessage name="latitude" component="div" className="block mt-1 text-xs text-destructive" />
							<ErrorMessage name="city" component="div" className="block mt-1 text-xs text-destructive" />
							<ErrorMessage name="country" component="div" className="block mt-1 text-xs text-destructive" />
							<ErrorMessage name="address" component="div" className="block mt-1 text-xs text-destructive" />
						</div>
						<Button disabled={isLoading} type="submit" className="mt-6 ml-auto">
							Submit
						</Button>
					</form>
				);
			}}
		</Formik>
	);
};

export default HotelForm;
