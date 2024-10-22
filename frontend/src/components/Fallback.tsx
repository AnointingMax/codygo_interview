import { cn } from "@/lib/utils";

type Props = {
	className?: string;
};

const Fallback = ({ className }: Props) => {
	return (
		<div className={cn("grid min-h-[50vh] w-full items-center justify-center", className)}>
			<h1 className="text-2xl font-extrabold animate-pulse">Hotel Ranking</h1>
		</div>
	);
};

export default Fallback;
