import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@/components";
import { Details, Home } from "@/pages";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					index: true,
					element: <Home />,
				},
				{
					path: ":id",
					element: <Details />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
