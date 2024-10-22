import { createBrand, updateBrand } from "@/api";
import { Input } from "@/components";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { BrandFormType, brandFormValidationSchema, BrandType } from "@/types";
import { showSuccessToast } from "@/utils/functions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";

type Props = {
	brand?: BrandType;
};

const BrandForm = ({ brand }: Props) => {
	const queryClient = useQueryClient();

	const initialValues: BrandFormType = {
		id: brand?.id,
		name: brand?.name ?? "",
	};

	const { mutate, isLoading } = useMutation(!brand ? createBrand : updateBrand, {
		onSuccess: async ({ message }) => {
			showSuccessToast(message, { closeButton: true });
			await queryClient.refetchQueries({ queryKey: [!brand ? "brands" : "brand"], type: "active" });
		},
	});

	return (
		<Formik initialValues={initialValues} validationSchema={brandFormValidationSchema} onSubmit={(values) => mutate(values)}>
			{({ values, handleChange, handleSubmit }) => (
				<form onSubmit={handleSubmit} className="grid">
					<Input placeholder="Enter brand name" label="Hotel Name" value={values.name} name="name" onChange={handleChange} />
					<SheetClose asChild>
						<Button disabled={isLoading} type="submit" className="mt-6 ml-auto">
							Submit
						</Button>
					</SheetClose>
				</form>
			)}
		</Formik>
	);
};

export default BrandForm;
