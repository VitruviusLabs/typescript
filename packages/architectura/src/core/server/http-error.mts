import type { HTTPStatusCodeEnum } from "./_index.mjs";
import type { HTTPErrorInstantiationInterface } from "./definition/interface/http-error-instantiation.interface.mjs";

class HTTPError extends Error
{
	protected readonly statusCode: HTTPStatusCodeEnum;
	protected readonly data: object;

	public constructor(parameters: HTTPErrorInstantiationInterface)
	{
		super(parameters.message, parameters);

		this.statusCode = parameters.statusCode;
		this.data = parameters.data ?? {};
	}

	public getStatusCode(): HTTPStatusCodeEnum
	{
		return this.statusCode;
	}

	public getData(): object
	{
		return this.data;
	}
}

export { HTTPError };
