import { Sequelize, Model, DataTypes } from "sequelize";
import { Database } from "../../../store/sequelize";
export class User extends Model {}

export enum UserStatues {
	ONLINE = "online",
	OFFLINE = "offline",
}

let synced = false;
export function Init() {
	User.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			nickname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			pictureURL: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "",
			},
		},
		{ sequelize: Database.getInstance().sequelize, modelName: "user" }
	);
}

export function Sync(force: boolean) {
	if (!synced) {
		User.sync({ force }).catch((e) => console.log("User error", e));
		synced = true;
	}
}
