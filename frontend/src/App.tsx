import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@/components";
import { Button } from "@/components/ui/button";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					index: true,
					element: (
						<div>
							Home
							<Button>Hello</Button>
						</div>
					),
				},
				{
					path: ":id",
					element: <div>Details</div>,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
