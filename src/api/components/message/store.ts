import { Sequelize, Model, DataTypes } from "sequelize";
import { Database } from "../../../store/sequelize";
export class Message extends Model {}

let synced = false;
export function Init() {
	Message.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			sender_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			receiver_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			content: {
				type: DataTypes.TEXT(),
				allowNull: false,
			},
		},
		{ sequelize: Database.getInstance().sequelize, modelName: "message" }
	);
}

export function Sync(force: boolean) {
	if (!synced) {
		Message.sync({ force }).catch((e) => console.log("User error", e));
		synced = true;
	}
}
