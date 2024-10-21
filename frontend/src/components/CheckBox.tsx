import { CheckboxProps } from "@radix-ui/react-checkbox";
import { Checkbox } from "./ui/checkbox";
import { RefAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props extends CheckboxProps, RefAttributes<HTMLButtonElement> {
	label: string;
	labelClassName?: string;
}

const CheckBox = ({ labelClassName, label, id, ...props }: Props) => {
	return (
		<div className="flex items-center gap-2">
			<Checkbox id={id} {...props} />
			<label
				htmlFor={id}
				className={cn(
					"text-sm font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
					labelClassName
				)}
			>
				{label}
			</label>
		</div>
	);
};

export default CheckBox;
