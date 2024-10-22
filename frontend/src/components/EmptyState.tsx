import { NoDataIcon } from "@/assets/svgs";

const EmptyState = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-2 min-h-[50vh]">
			<NoDataIcon className="max-w-[200px]" />
			<p className="text-sm font-medium">No data matches your search</p>
		</div>
	);
};

export default EmptyState;
