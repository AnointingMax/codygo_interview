import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Fallback, Layout } from "@/components";
import { Details, Home } from "@/pages";
import { Suspense } from "react";

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

	return (
		<Suspense fallback={<Fallback />}>
			<RouterProvider router={router} />
		</Suspense>
	);
}

export default App;
