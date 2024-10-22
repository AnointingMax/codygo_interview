import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import 'dotenv/config'
import morgan from "morgan"
import cors from "cors"
import ErrorWithCode from "./utils/ErrorWithCode";
import { brandsRouter, hotelsRouter } from "./routers";
import path from "path";

const app = express();

app.use(cors({
	origin: [
		"http://localhost:5173",
		"http://localhost:3000",
		"http://localhost:3001",
		"http://localhost:3002",
	],
}));
app.use(express.json())
app.use(helmet());
app.use(morgan('dev'))

// routes
app.get("/", (req: Request, res: Response) => {
	res.send("Health Route");
});

app.use('/images', express.static(path.join(__dirname, './uploads')))
app.use("/brands", brandsRouter);
app.use("/hotels", hotelsRouter);

app.use((error: ErrorWithCode, req: Request, res: Response, next: NextFunction): void => {
	console.log(error.message)
	res.status(error.errorCode ?? 500).json({ error: error.message })
})

app.all("*", (req, res) => {
	res.status(404).json({ error: "Route not found" })
})

// some more stuff

const APP_PORT = process.env.APP_PORT;

app.listen(APP_PORT, () => {
	console.log(`Server started on port ${APP_PORT}`);
});
