import { Sequelize, Model, DataTypes } from "sequelize";

export class Database {
	public sequelize: Sequelize = null;
	private static instance: Database;
	private constructor() {}

	public static getInstance(): Database {
		if (!Database.instance) {
			Database.instance = new Database();
			console.log("XXX");
		}
		console.log("YYY");
		return Database.instance;
	}

	public async Init(
		database: string,
		username: string,
		password: string,
		options: any
	) {
		console.log("SSS");
		this.sequelize = new Sequelize(database, username, password, options);
		try {
			await this.sequelize.authenticate();
			console.log("Connection has been established successfully.");
		} catch (error) {
			console.error("Unable to connect to the database:", error);
			await InitDatabaseConnection(database, username, password, options);
		}
	}
}

export let sequelize = new Sequelize({ host: "localhost", dialect: "mysql" });
export async function InitDatabaseConnection(
	database: string,
	username: string,
	password: string,
	options: any
) {
	sequelize = new Sequelize(database, username, password, options);
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
		InitDatabaseConnection(database, username, password, options);
	}
}
