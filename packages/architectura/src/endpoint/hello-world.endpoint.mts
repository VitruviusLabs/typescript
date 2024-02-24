
import { KernelService } from "../_index.mjs";

import { BaseEndpoint } from "../core/endpoint/base.endpoint.mjs";

import { HTTPMethodEnum } from "../definition/enum/http-method.enum.mjs";


import { ExecutionContextService } from "../service/execution-context/execution-context.service.mjs";




class HelloWorldEndpoint extends BaseEndpoint
{
	protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
	protected readonly route: string = "^.*$";

	// eslint-disable-next-line @typescript-eslint/require-await, class-methods-use-this -- This is a WIP.
	public async execute(): Promise<void>
	{
		const CONTEXT: ExecutionContextService = KernelService.GetExecutionContext(ExecutionContextService);

		CONTEXT.getResponse().send('Hello World!');
	}
}

export { HelloWorldEndpoint };
