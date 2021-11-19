import JWT from "../../../utils/jwt";
import ApiError from "../../../utils/error";
import { Auth } from "./store";
import bcrypt from "bcrypt";
import config from "../../../config";

const jwt = new JWT(config.jwt.userSecret);

export async function Authenticate(email: string, password: string) {
	try {
		const auth = await Auth.findOne({ where: { email } });
		if (auth) {
			if (bcrypt.compareSync(password, auth.getDataValue("password"))) {
				return jwt.sign({ id: auth.getDataValue("user_id") }, {});
			}
			throw new ApiError("Incorrect password", 401);
		}
		throw new ApiError("User doesnt exist", 401);
	} catch (e) {
		throw e;
	}
}
