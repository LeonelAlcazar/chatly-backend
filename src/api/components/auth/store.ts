import { Sequelize, Model, DataTypes } from "sequelize";
import { Database } from "../../../store/sequelize";

export class Auth extends Model {}

let synced = false;

export function Init() {
	Auth.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			user_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ sequelize: Database.getInstance().sequelize, modelName: "auth" }
	);
}

export function Sync(force: boolean) {
	if (!synced) {
		Auth.sync({ force }).catch((e) => console.log("Auth error", e));
		synced = true;
	}
}
