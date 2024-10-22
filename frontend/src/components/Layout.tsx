import { Link, Outlet } from "react-router-dom";
import { Toaster } from "./ui/toaster";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { HotelForm } from "@/panels";

const Layout = () => {
	return (
		<div className="*:px-8">
			<TopNav />
			<Outlet />
			<Toaster />
		</div>
	);
};

const TopNav = () => {
	return (
		<div className="flex items-center justify-between py-4">
			<Link to="/">
				<h1 className="text-2xl font-extrabold">Hotel Ranking</h1>
			</Link>
			<Sheet>
				<SheetTrigger asChild>
					<Button>Create Hotel</Button>
				</SheetTrigger>
				<SheetContent className="">
					<SheetHeader>
						<SheetTitle>Create Hotel</SheetTitle>
					</SheetHeader>
					<HotelForm />
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default Layout;
