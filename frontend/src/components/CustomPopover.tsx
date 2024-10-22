import { type ReactElement, ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface PopoverAction {
	onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	label: ReactNode;
	disabled?: boolean;
}

interface CustomPopoverProps {
	trigger: ReactElement;
	actions: PopoverAction[];
	align?: "start" | "center" | "end";
	side?: "top" | "right" | "bottom" | "left";
	className?: string;
	open?: boolean;
	triggerClassName?: string;
	onOpenChange?: (open: boolean) => void;
}

const CustomPopover = ({ trigger, actions, align, side = "bottom", className = "", open, triggerClassName, onOpenChange }: CustomPopoverProps) => {
	return (
		<Popover open={open} onOpenChange={onOpenChange}>
			<PopoverTrigger className={triggerClassName} asChild>
				{trigger}
			</PopoverTrigger>
			<PopoverContent align={align} side={side} className={cn("p-2", className)}>
				<div className="flex flex-col gap-1">
					{actions.map(({ onClick, label, disabled }, index) => (
						<button
							key={`popover-action-${index}`}
							className="w-full justify-start gap-2 font-medium text-popover-foreground *:rounded-[5px] *:px-2 *:py-2.5"
							onClick={onClick}
							disabled={disabled}
						>
							{label}
						</button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default CustomPopover;
