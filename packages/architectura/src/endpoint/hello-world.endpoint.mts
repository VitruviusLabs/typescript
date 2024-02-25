import { BaseEndpoint } from "../core/endpoint/base.endpoint.mjs";
import { HTTPMethodEnum } from "../core/endpoint/definition/enum/http-method.enum.mjs";
import { ExecutionContext } from "../core/execution-context/execution-context.mjs";
import { ExecutionContextRegistry } from "../core/execution-context/execution-context.registry.mjs";

class HelloWorldEndpoint extends BaseEndpoint
{
	protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
	protected readonly route: string = "^.*$";

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this -- Does nothing much
	public execute(): void
	{
		const CONTEXT: ExecutionContext = ExecutionContextRegistry.GetExecutionContext(ExecutionContext);

		CONTEXT.getResponse().send("Hello World!");
	}
}

export { HelloWorldEndpoint };
