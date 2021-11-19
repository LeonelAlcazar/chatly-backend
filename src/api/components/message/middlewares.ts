import {
	validateParams,
	lengthBounds,
	validatePhones,
	validateEmail,
	IParam,
} from "../../../utils/validator";

const SEND_MESSAGE: IParam[] = [
	{
		param_key: "receiver_id",
		type: "string",
		required: true,
	},
	{
		param_key: "content",
		type: "string",
		required: true,
	},
];

export const sendMessageValidator = validateParams(SEND_MESSAGE);
