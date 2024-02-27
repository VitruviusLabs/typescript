import { BaseEndpoint } from "../core/endpoint/base.endpoint.mjs";
import { HTTPMethodEnum } from "../core/endpoint/definition/enum/http-method.enum.mjs";
import type { ExecutionContext } from "../core/execution-context/execution-context.mjs";

class HelloWorldEndpoint extends BaseEndpoint
{
	protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
	protected readonly route: string = "^.*$";

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this -- Does nothing much
	public execute(context: ExecutionContext): void
	{
		context.getResponse().text("Hello World!");
	}
}

export { HelloWorldEndpoint };
