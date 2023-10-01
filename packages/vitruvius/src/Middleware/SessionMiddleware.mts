// import { TypeGuard } from "@vitruvius-lab/ts-predicate";

// import { ExecutionContext } from "../Core/ExecutionContext.mjs";

// import { CookieEnum } from "../Service/Cookie/CookieEnum.mjs";

// import { Cookie } from "../Service/Cookie.mjs";

// import { Session } from "../Service/Session.mjs";

// import { SessionManager } from "../Service/SessionManager.mjs";

import { BaseMiddleware } from "./BaseMiddleware.mjs";

// import type { IncomingHttpHeaders } from "node:http";

abstract class SessionMiddleware extends BaseMiddleware
{
	/**
	 * Execute
	 */
	public static override async Execute(): Promise<void>
	{
		// const COOKIES: Record<string, string>|undefined = this.ParseCookies();

		// if (COOKIES === undefined || !TypeGuard.hasProperty(COOKIES, CookieEnum.SESSION_ID) || !TypeGuard.isString(COOKIES[CookieEnum.SESSION_ID]))
		// {
		// 	await this.InitializeNewSession();

		// 	return;
		// }

		// const SESSION: Session = await this.InitializeExistingSession(COOKIES[CookieEnum.SESSION_ID]);

		// SESSION.setCookies(COOKIES);
	}

	// private static ParseCookies(): Record<string, string>|undefined
	// {
	// 	const REQUEST_HEADERS: IncomingHttpHeaders|undefined = ExecutionContext.GetRequest()?.headers;

	// 	if (REQUEST_HEADERS === undefined)
	// 	{
	// 		return undefined;
	// 	}

	// 	if (!TypeGuard.HasProperty(REQUEST_HEADERS, "cookie") || !TypeGuard.IsString(REQUEST_HEADERS.cookie))
	// 	{
	// 		return undefined;
	// 	}

	// 	const COOKIES: Record<string, string> = Cookie.Extract(REQUEST_HEADERS.cookie);

	// 	return COOKIES;
	// }

	// private static async InitializeNewSession(): Promise<Session>
	// {
	// 	const NEW_SESSION: Session = await Session.Create({});

	// 	NEW_SESSION.save();

	// 	NEW_SESSION.setCookie(CookieEnum.SESSION_ID, NEW_SESSION.getId());
	// 	NEW_SESSION.refresh();
	// 	ExecutionContext.SetSession(NEW_SESSION);

	// 	return NEW_SESSION;
	// }

	// private static async InitializeExistingSession(session_id: string): Promise<Session>
	// {
	// 	let existing_session: Session|undefined = SessionManager.GetSession(session_id);

	// 	if (existing_session === undefined)
	// 	{
	// 		existing_session = await this.InitializeNewSession();
	// 	}

	// 	existing_session.refresh();
	// 	ExecutionContext.SetSession(existing_session);

	// 	return existing_session;
	// }
}

export { SessionMiddleware };
