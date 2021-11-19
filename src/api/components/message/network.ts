import express, { NextFunction } from "express";
import * as controller from "./controller";
import response from "../../../network/response";
import * as middlewares from "./middlewares";
import secure from "../auth/secure";
import userSecure from "../auth/secure";
const router = express.Router();

router.get("/of/:id", userSecure, GetMessagesOf);
router.post("/", userSecure, SendMessage);

function GetMessagesOf(req: any, res: any, next: any) {
	controller
		.ListMessagesOf(req.decoded.id, req.params.id)
		.then((messages) => response.success(req, res, messages, 200))
		.catch(next);
}

function SendMessage(req: any, res: any, next: any) {
	controller
		.SendMessage(req.decoded.id, req.body.receiver_id, req.body.content)
		.then((message) => {
			req.io.to(req.decoded.id).emit("message", message);
			req.io.to(req.body.receiver_id).emit("message", message);
			response.success(req, res, message, 201);
		})
		.catch(next);
}

export default router;
