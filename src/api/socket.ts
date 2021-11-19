import { Server } from "socket.io";
import http from "http";
import JWT from "../utils/jwt";
import { UserStatues } from "./components/user/store";
import * as controller from "./components/user/controller";
import config from "../config";

const jwt = new JWT(config.jwt.userSecret);

export function InitSockets(httpServer: http.Server) {
	const io = new Server(httpServer, {
		cors: {
			origin: "*",
		},
	});

	io.on("connection", (socket) => {
		console.log("new client");
		let id: null | string = null;
		socket.on("auth", async (data) => {
			try {
				const decoded: any = jwt.verify(data.token);
				id = decoded.id;
				await controller.UpdateStatus(id, UserStatues.ONLINE);

				socket.join(id);
				socket.join("SignedIn");
				io.to("SignedIn").emit("statusUpdate", {
					id,
					status: UserStatues.ONLINE,
				});
			} catch (e) {
				socket.emit("auth", { message: "Auth failed", status: 401 });
			}
		});

		socket.on("disconnect", async () => {
			console.log("client disconnected");
			if (id) {
				try {
					await controller.UpdateStatus(id, UserStatues.OFFLINE);
					io.to("SignedIn").emit("statusUpdate", {
						id,
						status: UserStatues.OFFLINE,
					});
					return;
				} catch (e) {
					throw e;
				}
			}
		});
	});

	return io;
}
