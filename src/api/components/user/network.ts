import express, { NextFunction } from "express";
import * as controller from "./controller";
import response from "../../../network/response";
import * as middlewares from "./middlewares";
import secure from "../auth/secure";
import userSecure from "../auth/secure";
const router = express.Router();

router.get("/", userSecure, ListUsers);
router.get("/:id", userSecure, GetUser);
router.post("/", middlewares.createUserValidator, RegisterUser);

function ListUsers(req: any, res: any, next: NextFunction) {
	controller
		.List(req.query)
		.then((users) => {
			response.success(req, res, users, 200);
		})
		.catch(next);
}

function GetUser(req: any, res: any, next: NextFunction) {
	controller
		.Get(req.params.id === "me" ? req.decoded.id : req.params.id)
		.then((user) => response.success(req, res, user, 200))
		.catch(next);
}

function RegisterUser(req: any, res: any, next: NextFunction) {
	controller
		.Register(req.body)
		.then((user) => {
			response.success(req, res, user, 201);
		})
		.catch(next);
}

export default router;
