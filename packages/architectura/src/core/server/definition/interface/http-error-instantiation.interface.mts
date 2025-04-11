import type { HTTPStatusCodeEnum } from "../enum/http-status-code.enum.mjs";

interface HTTPErrorInstantiationInterface extends ErrorOptions
{
	statusCode: HTTPStatusCodeEnum;
	message: string;
	data?: object;
}

export type { HTTPErrorInstantiationInterface };
