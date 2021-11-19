import { InitHttpServerApi } from "./api";
import { Database } from "./store/sequelize";
import * as User from "./api/components/user/store";
import * as Auth from "./api/components/auth/store";
import * as Message from "./api/components/message/store";
import config from "./config";

(async () => {
	Database.getInstance()
		.Init(config.mysql.ddbb, config.mysql.user, config.mysql.pass, {
			host: config.mysql.host,
			dialect: "mysql",
		})
		.then(() => {
			User.Init();
			Auth.Init();
			Message.Init();

			User.User.hasOne(Auth.Auth, { foreignKey: "user_id", as: "auth" });
			User.User.hasMany(Message.Message, {
				foreignKey: "sender_id",
				as: "message",
			});
			Message.Message.belongsTo(User.User, { foreignKey: "sender_id" });

			User.Sync(false);
			Auth.Sync(false);
			Message.Sync(false);
		});

	InitHttpServerApi(config.api.port);
})();
