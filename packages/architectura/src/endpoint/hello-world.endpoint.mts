import { BaseEndpoint } from "../Core/Base/BaseEndpoint.mjs";

import { HTTPMethodEnum } from "../Core/HTTP/http-method.enum.mjs";

import { Kernel } from "../index.mjs";

import { ExecutionContextService } from "../service/execution-context/execution-context.service.mjs";



class HelloWorldEndpoint extends BaseEndpoint
{
	protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
	protected readonly route: string = "^.*$";

	// eslint-disable-next-line @typescript-eslint/require-await, class-methods-use-this -- This is a WIP.
	public async execute(): Promise<void>
	{
		const CONTEXT: ExecutionContextService = Kernel.GetExecutionContext(ExecutionContextService);

		CONTEXT.getResponse().send('Hello World!');
	}
}

export { HelloWorldEndpoint };
