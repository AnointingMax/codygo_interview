import { cn } from "@/lib/utils";
import { ErrorMessage } from "formik";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	containerClassName?: string;
	innerContainerClassName?: string;
	label?: string;
	labelClassName?: string;
}

const Input = ({ containerClassName, className, label, labelClassName, ...props }: Props) => {
	return (
		<div className={containerClassName}>
			{!!label && <label className={cn("mb-1 block text-[0.8rem] font-medium text-black/50", labelClassName)}>{label}</label>}
			<input
				{...props}
				className={cn(
					"text-bodyText w-full rounded-md px-3 py-2 text-sm !outline-0 placeholder:text-[#a8b0bd]",
					"focus:![--tw-ring-shadow:transparent] disabled:cursor-not-allowed disabled:bg-[#FBFBFB]",
					"border border-black/35",
					className
				)}
			/>
			{!!props["name"] && <ErrorMessage name={props["name"]} component="div" className="block mt-1 text-xs text-destructive" />}
		</div>
	);
};

export default Input;
