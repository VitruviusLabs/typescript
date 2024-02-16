import { ExecutionContext } from "../../Core/ExecutionContext.mjs";

import { HTTPMethodEnum } from "../../Core/HTTP/HTTPMethodEnum.mjs";

import { Kernel } from "../../index.mjs";

import { BaseEndpoint } from "../BaseEndpoint.mjs";

class HomeEndpoint extends BaseEndpoint
{
	protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
	protected readonly route: string = "^/?$";

	// eslint-disable-next-line @typescript-eslint/require-await, class-methods-use-this -- This is a WIP.
	public async execute(): Promise<void>
	{
		const CONTEXT: ExecutionContext = Kernel.GetExecutionContext(ExecutionContext);

		CONTEXT.getResponse().send('Hello World!');
	}
}

export { HomeEndpoint };
