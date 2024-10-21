/* eslint-disable no-mixed-spaces-and-tabs */
import { COUNTRIES, COUNTRY_OPTIONS, FEATURES } from "@/assets/constants";
import { CheckBox, Dropzone, Input, Slider } from "@/components";
import Combobox from "@/components/Combobox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

const HotelForm = () => {
	const initialValues: HotelFormType = {
		name: "",
		address: "",
		city: "",
		country: "",
		rating: 0,
		features: [],
		brands: [],
		images: [],
	};
	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Hotel name is required"),
		address: Yup.string().required("Hotel address is required"),
		city: Yup.string().required("Hotel city is required"),
		country: Yup.string()
			.oneOf(
				COUNTRIES.map((country) => country.code),
				"A valid country must be provided"
			)
			.required("Hotel country is required"),
		rating: Yup.number().max(5, "Maximum rating is 5").min(0, "Minimum rating is 0").required("Hotel rating is required"),
		features: Yup.array()
			.of(Yup.string().required())
			.min(2, "You must provide at least 2 hotel features")
			.required("Hotel features are required"),
		images: Yup.array().min(2, "You must provide at least 2 images").required("Hotel images are required"),
		brands: Yup.array().of(Yup.string().required()).min(1, "You must provide at least 1 hotel brand").required("Hotel brands are required"),
	});
	type HotelFormType = Yup.InferType<typeof validationSchema>;

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => console.log(values)}>
			{({ values, handleChange, handleSubmit, setFieldValue }) => (
				<form onSubmit={handleSubmit} className="grid gap-4">
					<Input placeholder="Enter hotel name" label="Hotel Name" value={values.name} name="name" onChange={handleChange} />
					<Input placeholder="Enter hotel address" label="Hotel Address" value={values.address} name="address" onChange={handleChange} />
					<Input placeholder="Enter hotel city" label="Hotel City" value={values.city} name="city" onChange={handleChange} />
					<div>
						<Accordion type="single" defaultValue="brands" className="w-full">
							<AccordionItem value="brands">
								<AccordionTrigger className="text-[0.8rem] font-medium text-black/50 hover:no-underline">Brands</AccordionTrigger>
								<AccordionContent className="grid gap-1 max-h-[200px] overflow-y-auto mb-3">
									{FEATURES?.map(({ value, label }) => (
										<CheckBox
											key={value}
											id={value}
											label={label}
											value={value}
											checked={values.brands.includes(value)}
											onCheckedChange={(checked) =>
												checked
													? setFieldValue("brands", [...values.brands, value])
													: setFieldValue(
															"brands",
															values.brands?.filter((brand) => brand !== value)
													  )
											}
										/>
									))}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
						<ErrorMessage name="brands" component="div" className="block mt-1 text-xs text-destructive" />
					</div>
					<Combobox
						className="w-full"
						placeholder="Select country"
						value={values.country}
						setValue={(country) => setFieldValue("country", country)}
						options={COUNTRY_OPTIONS}
						label="Country"
						name="country"
					/>
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
								<AccordionTrigger className="text-[0.8rem] font-medium text-black/50 hover:no-underline">Features</AccordionTrigger>
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
					<Button className="mt-6 ml-auto">Submit</Button>
				</form>
			)}
		</Formik>
	);
};

export default HotelForm;
