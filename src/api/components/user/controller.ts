import { User, UserStatues } from "./store";
import bcrypt from "bcrypt";
import { Auth } from "../auth/store";
import ApiError from "../../../utils/error";
import { Op } from "sequelize";

export async function List(query?: any) {
	try {
		const users = await User.findAll({ where: query });

		return users;
	} catch (e) {
		throw e;
	}
}

export async function Get(id: string) {
	try {
		const user = await User.findOne({ where: { id } });

		return user;
	} catch (e) {
		throw e;
	}
}

export async function UpdateStatus(id: string, status: UserStatues) {
	try {
		const user = await User.findOne({ where: { id } });
		if (user) {
			user.setDataValue("status", status);
			user.save();
			return user;
		}
		throw new ApiError("User doesnt exist", 404);
	} catch (e) {
		throw e;
	}
}

export async function Register(data: {
	email: string;
	nickname: string;
	pictureURL: string;
	password: string;
}) {
	try {
		const usersWithSameEmailOrNickname = await User.findAll({
			where: {
				[Op.or]: [{ email: data.email }, { nickname: data.nickname }],
			},
		});

		if (usersWithSameEmailOrNickname.length == 0) {
			const user = await User.create({
				email: data.email,
				nickname: data.nickname,
				pictureURL: data.pictureURL,
			});
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(data.password, salt);
			const auth = await Auth.create({
				user_id: user.getDataValue("id"),
				email: data.email,
				password: hash,
			});
			return user;
		} else {
			throw new ApiError(
				"User with email and/or nickname already exist",
				400
			);
		}
	} catch (e) {
		throw e;
	}
}
