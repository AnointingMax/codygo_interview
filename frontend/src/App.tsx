import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					index: true,
					element: <div>Home</div>,
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
