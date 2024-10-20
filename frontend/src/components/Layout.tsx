import { Outlet } from "react-router-dom";
import { Toaster } from "./ui/toaster";

const Layout = () => {
	return (
		<div>
			Layout
			<Outlet />
			<Toaster />
		</div>
	);
};

export default Layout;
