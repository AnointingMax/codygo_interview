import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export interface SelectOption {
	label: string;
	value: string;
}

type Props = {
	options: SelectOption[];
	placeholder: string;
	value: string;
	setValue: (value: string) => void;
	className?: string;
	label?: string;
	labelClassName?: string;
};

const Combobox = ({ options, placeholder, value, setValue, className, label, labelClassName }: Props) => {
	const [open, setOpen] = useState(false);

	return (
		<div>
			{!!label && <label className={cn("mb-1 block text-[0.8rem] font-medium text-black/50", labelClassName)}>{label}</label>}
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className={cn("justify-between py-2 text-[#a8b0bd] font-normal", className)}
					>
						{value ? options.find((option) => option.value === value)?.label : placeholder}
						<CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-0">
					<Command>
						<CommandInput placeholder="Search option..." className="" />
						<CommandList>
							<CommandEmpty>No option found.</CommandEmpty>
							<CommandGroup>
								{options.map((option) => (
									<CommandItem
										key={option.value}
										value={option.value}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? "" : currentValue);
											setOpen(false);
										}}
									>
										{option.label}
										<CheckIcon className={cn("ml-auto h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default Combobox;
