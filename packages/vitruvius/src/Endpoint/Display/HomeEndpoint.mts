import { ExecutionContext } from "../../Core/ExecutionContext.mjs";




import { HTTPMethodEnum } from "../../Core/HTTP/HTTPMethodEnum.mjs";

import { BaseEndpoint } from "../BaseEndpoint.mjs";



class HomeEndpoint extends BaseEndpoint
{
	protected static override readonly METHOD: HTTPMethodEnum = HTTPMethodEnum.GET;
	protected static override readonly ROUTE: string = "/";

	// @TODO: Refine this.
	// eslint-disable-next-line @typescript-eslint/require-await -- This is a WIP.
	public static override async Execute(): Promise<void>
	{
		// const REQUEST: Request|undefined = ExecutionContext.GetRequest();

		// if (REQUEST === undefined)
		// {
		// 	throw new Error("Failed to retrieve request.");
		// }

		// const COOKIES: Record<string, string>|undefined = Cookie.Extract(REQUEST.headers.cookie ?? "");

		// const SESSION: Session|undefined = Session.GetById(COOKIES[CookieEnum.SESSION_ID] ?? "");

		// if (SESSION?.isLogged())
		// {
		// 	ExecutionContext.GetResponse()?.send(`Logged in with user ${SESSION.getUser()?.getId()
		// 		?.toString() ?? ""}`);

		// 	return;
		// }

		ExecutionContext.GetResponse()?.send('Hello World!');
	}
}

export { HomeEndpoint };
