import express from "express";
import cors from "cors";
import errors from "../network/errors";
import http from "http";

import userRouter from "./components/user/network";
import authRouter from "./components/auth/network";
import messageRouter from "./components/message/network";
import { InitSockets } from "./socket";

export function InitHttpServerApi(port: number) {
	const app = express();
	const server = http.createServer(app);
	const io = InitSockets(server);

	app.use(cors());

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use((req: any, res, next) => {
		req.io = io;
		next();
	});

	app.use("/user", userRouter);
	app.use("/auth", authRouter);
	app.use("/message", messageRouter);

	app.use(errors);

	server.listen(port, () => {
		console.log(`API on http://localhost:${port}`);
	});
}
