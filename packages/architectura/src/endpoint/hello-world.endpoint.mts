import { BaseEndpoint } from "../core/endpoint/base.endpoint.mjs";
import { HTTPMethodEnum } from "../core/definition/enum/http-method.enum.mjs";
import type { ExecutionContext } from "../core/execution-context/execution-context.mjs";

/**
 * Placeholder endpoint
 *
 * @remarks
 * Used as a placeholder endpoint when none have been added to the registry.
 * Let's you know that the server is correctly running.
 *
 * @internal
 * @sealed
 */
class HelloWorldEndpoint extends BaseEndpoint
{
	protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
	protected readonly route: string = ".*";

	public override async execute(context: ExecutionContext): Promise<void>
	{
		await context.getResponse().text("Hello World!");
	}
}

export { HelloWorldEndpoint };
