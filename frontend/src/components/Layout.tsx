import { Link, Outlet } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BrandForm, HotelForm } from "@/panels";
import { Toaster } from "./ui/sonner";
import { Suspense, useState } from "react";
import Fallback from "./Fallback";
import CustomPopover from "./CustomPopover";
import { Plus } from "lucide-react";

const Layout = () => {
	return (
		<div className="*:px-8">
			<TopNav />
			<Suspense fallback={<Fallback />}>
				<Outlet />
			</Suspense>
			<Toaster />
		</div>
	);
};

const TopNav = () => {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex items-center justify-between py-4">
			<Link to="/">
				<h1 className="text-2xl font-extrabold">Hotel Ranking</h1>
			</Link>
			<CustomPopover
				align="end"
				trigger={
					<Button className="max-sm:rounded-full max-sm:aspect-square max-sm:p-2.5">
						<Plus className="size-[18px] flex-shrink-0" />
						<span className="max-sm:hidden">Create</span>
					</Button>
				}
				actions={[
					{
						label: (
							<>
								<span className="flex items-center gap-2 text-sm font-medium text-[#404040] hover:bg-primary-transparent hover:text-primary">
									<Plus className="size-[18px] flex-shrink-0" />
									Create Hotel
								</span>
								<Sheet open={open} onOpenChange={() => {}}>
									<SheetContent setOpen={setOpen}>
										<SheetHeader>
											<SheetTitle>Create Hotel</SheetTitle>
										</SheetHeader>
										<HotelForm setOpen={setOpen} />
									</SheetContent>
								</Sheet>
							</>
						),
						onClick: () => setOpen(true),
					},
					{
						label: (
							<Sheet>
								<SheetTrigger asChild>
									<span className="flex items-center gap-2 text-sm font-medium text-[#404040] hover:bg-primary-transparent hover:text-primary">
										<Plus className="size-[18px] flex-shrink-0" />
										Create Brand
									</span>
								</SheetTrigger>
								<SheetContent>
									<SheetHeader>
										<SheetTitle>Create Brand</SheetTitle>
									</SheetHeader>
									<BrandForm />
								</SheetContent>
							</Sheet>
						),
						onClick: () => {},
					},
				]}
			/>
		</div>
	);
};

export default Layout;
