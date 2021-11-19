import express, { NextFunction } from "express";
import * as controller from "./controller";
import response from "../../../network/response";
import * as middlewares from "./middlewares";
import secure from "../auth/secure";
const router = express.Router();

router.post("/login", middlewares.loginValidator, Authenticate);

function Authenticate(req: any, res: any, next: NextFunction) {
	controller
		.Authenticate(req.body.email, req.body.password)
		.then((token) => response.success(req, res, token, 200))
		.catch(next);
}

export default router;
