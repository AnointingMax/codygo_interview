import { Outlet } from "react-router-dom";
import { Toaster } from "./ui/toaster";

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
			<h1 className="text-2xl font-extrabold">Hotel Ranking</h1>
		</div>
	);
};

export default Layout;
