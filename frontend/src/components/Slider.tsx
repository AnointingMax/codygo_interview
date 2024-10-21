import { SliderProps } from "@radix-ui/react-slider";
import { Slider as UISlider } from "./ui/slider";
import { RefAttributes } from "react";
import { cn } from "@/lib/utils";
import { ErrorMessage } from "formik";

interface Props extends SliderProps, RefAttributes<HTMLSpanElement> {
	containerClassName?: string;
	label?: string;
	labelClassName?: string;
	name?: string;
}

const Slider = ({ containerClassName, label, labelClassName, ...props }: Props) => {
	const [rating] = props["value"] ?? [0];

	return (
		<div className={containerClassName}>
			{!!label && <label className={cn("mb-1 block text-[0.8rem] font-medium text-black/50", labelClassName)}>{label}</label>}
			<div className="flex items-center gap-4">
				<UISlider {...props} />
				<span className="font-semibold">{rating}</span>
			</div>
			{!!props["name"] && <ErrorMessage name={props["name"]} component="div" className="block mt-1 text-xs text-destructive" />}
		</div>
	);
};

export default Slider;
