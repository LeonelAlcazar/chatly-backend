import dotenv from "dotenv";

dotenv.config();

export default {
	api: {
		port: parseInt(process.env.PORT) || 8080,
	},
	jwt: {
		userSecret: process.env.USER_SECRET || "users",
	},
	mysql: {
		host: process.env.MYSQL_HOST || "127.0.0.1",
		user: process.env.MYSQL_USER || "root",
		pass: process.env.MYSQL_PASS || "",
		ddbb: process.env.MYSQL_DDBB || "chat",
	},
};
