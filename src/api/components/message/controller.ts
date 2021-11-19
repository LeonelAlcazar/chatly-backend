import { Op } from "sequelize";
import { User } from "../user/store";
import { Message } from "./store";

export async function ListMessagesOf(id: string, otherId: string) {
	try {
		const messages = await Message.findAll({
			include: { model: User, required: true },
			where: {
				[Op.or]: [
					{ sender_id: id, receiver_id: otherId },
					{ receiver_id: id, sender_id: otherId },
				],
			},
		});

		return messages;
	} catch (e) {
		throw e;
	}
}

export async function SendMessage(id: string, toId: string, content: string) {
	try {
		const message = await Message.create({
			sender_id: id,
			receiver_id: toId,
			content,
		});

		return await Message.findOne({
			include: { model: User, required: true },
			where: { id: message.getDataValue("id") },
		});
	} catch (e) {
		throw e;
	}
}
