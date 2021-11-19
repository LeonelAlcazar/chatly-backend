import {
	validateParams,
	lengthBounds,
	validatePhones,
	validateEmail,
	IParam,
} from "../../../utils/validator";

const LOGIN: IParam[] = [
	{
		param_key: "email",
		type: "string",
		required: true,
		validator_functions: [validateEmail],
	},
	{
		param_key: "password",
		type: "string",
		required: true,
		validator_functions: [lengthBounds(6, 1000)],
	},
];

export const loginValidator = validateParams(LOGIN);
