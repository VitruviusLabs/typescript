import { ExecutionContext } from "../../Core/ExecutionContext.mjs";

import { HTTPMethodEnum } from "../../Core/HTTP/HTTPMethodEnum.mjs";

import { BaseEndpoint } from "../BaseEndpoint.mjs";



class HomeEndpoint extends BaseEndpoint
{
	protected static override readonly METHOD: HTTPMethodEnum = HTTPMethodEnum.GET;
	protected static override readonly ROUTE: string = "^/?$";

	// @TODO: Refine this.
	// eslint-disable-next-line @typescript-eslint/require-await -- This is a WIP.
	public static override async Execute(): Promise<void>
	{
		ExecutionContext.GetResponse()?.send('Hello World!');
	}
}

export { HomeEndpoint };
