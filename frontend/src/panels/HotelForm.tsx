/* eslint-disable no-mixed-spaces-and-tabs */
import { BRANDS, FEATURES } from "@/lib/constants";
import { CheckBox, Dropzone, Input, Slider } from "@/components";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HotelType } from "@/types";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { AddressFormatter, GMapify } from "g-mapify";
import { useRef } from "react";

type Props = { hotel?: HotelType };

const HotelForm = ({ hotel }: Props) => {
	const mapRef = useRef();

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
	const validationSchema = Yup.object().shape({
		id: Yup.number(),
		name: Yup.string().required("Hotel name is required"),
		address: Yup.string().required("Hotel address is required"),
		city: Yup.string().required("Hotel city is required"),
		country: Yup.string().required("Hotel country is required"),
		rating: Yup.number().max(5, "Maximum rating is 5").min(0, "Minimum rating is 0").required("Hotel rating is required"),
		latitude: Yup.number().required("Hotel latitude is required"),
		longitude: Yup.number().required("Hotel longitude is required"),
		features: Yup.array()
			.of(Yup.string().required())
			.min(2, "You must provide at least 2 hotel features")
			.required("Hotel features are required"),
		images: Yup.array().when("id", {
			is: (val) => !!val,
			then: (schema) => schema,
			otherwise: (schema) => schema.min(2, "You must provide at least 2 images").required("Hotel images are required"),
		}),
		brands: Yup.array().of(Yup.number().required()).min(1, "You must provide at least 1 hotel brand").required("Hotel brands are required"),
	});
	type HotelFormType = Yup.InferType<typeof validationSchema>;

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => console.log(values)}>
			{({ values, handleChange, handleSubmit, setFieldValue }) => {
				const onMapSelect = (status, data) => {
					if (status) {
						const formattedAddress = AddressFormatter(data.address_components);

						setFieldValue("latitude", data.geometry.location.lat);
						setFieldValue("longitude", data.geometry.location.lng);
						setFieldValue("city", formattedAddress.locality);
						setFieldValue("country", formattedAddress.country);
						setFieldValue("address", [formattedAddress.streetNumber, formattedAddress.route, formattedAddress.state].join(" "));
					}
				};

				return (
					<form onSubmit={handleSubmit} className="grid gap-4">
						<Input placeholder="Enter hotel name" label="Hotel Name" value={values.name} name="name" onChange={handleChange} />
						<GMapify
							appKey={import.meta.env.VITE_GOOGLE_MAP_KEY}
							ref={mapRef}
							mapClassName="h-[400px]"
							onSelect={onMapSelect}
							hasSearch
							mapOptions={{
								zoomControl: true,
								fullscreenControl: true,
								streetViewControl: true,
								clickableIcons: true,
							}}
						/>
						<div>
							<Accordion type="single" defaultValue="brands" className="w-full">
								<AccordionItem value="brands">
									<AccordionTrigger className="text-[0.8rem] font-medium text-black/50 hover:no-underline">Brands</AccordionTrigger>
									<AccordionContent className="grid gap-1 max-h-[200px] overflow-y-auto mb-3">
										{BRANDS?.map(({ id, name }) => (
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
							step={1}
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
						<Button type="submit" className="mt-6 ml-auto">
							Submit
						</Button>
					</form>
				);
			}}
		</Formik>
	);
};

export default HotelForm;
