import config from "../../../config";
import response from "../../../network/response";
import JWT from "../../../utils/jwt";

const jwt = new JWT(config.jwt.userSecret);
function existBearerToken(authorization: string) {
	return authorization.toUpperCase().indexOf("BEARER") >= 0;
}
export default function userSecure(req: any, res: any, next: any) {
	let authorization: string = req.headers.authorization || "";
	// console.log({authorization: authorization})

	if (existBearerToken(authorization)) {
		authorization = authorization.slice(6, authorization.length).trim();
		try {
			const decoded = jwt.verify(authorization);
			req.decoded = decoded;
			next();
		} catch (e) {
			response.error(req, res, "UNAUTHORIZED", 401);
		}
	} else {
		response.error(req, res, "NO TOKEN", 401);
	}
}
