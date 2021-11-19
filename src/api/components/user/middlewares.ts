import {
	validateParams,
	lengthBounds,
	validatePhones,
	validateEmail,
	IParam,
} from "../../../utils/validator";

const CREATE_USER: IParam[] = [
	{
		param_key: "email",
		type: "string",
		required: true,
		validator_functions: [validateEmail],
	},
	{
		param_key: "nickname",
		type: "string",
		required: true,
		validator_functions: [lengthBounds(4, 20)],
	},
	{
		param_key: "password",
		type: "string",
		required: true,
		validator_functions: [lengthBounds(6, 1000)],
	},
	{
		param_key: "pictureURL",
		type: "string",
		required: true,
	},
];

export const createUserValidator = validateParams(CREATE_USER);
