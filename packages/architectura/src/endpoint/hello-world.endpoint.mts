import { BaseEndpoint } from "../core/endpoint/base.endpoint.mjs";
import { HTTPMethodEnum } from "../core/definition/enum/http-method.enum.mjs";
import type { ExecutionContext } from "../core/execution-context/execution-context.mjs";

class HelloWorldEndpoint extends BaseEndpoint
{
	protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
	protected readonly route: string = "^.*$";

	public override async execute(context: ExecutionContext): Promise<void>
	{
		await context.getResponse().text("Hello World!");
	}
}

export { HelloWorldEndpoint };
