import { ExecutionContext } from "../Core/ExecutionContext.mjs";


import { Session } from "../Service/Session.mjs";

import { SessionManager } from "../Service/SessionManager.mjs";

import { BaseMiddleware } from "./BaseMiddleware.mjs";

abstract class SessionMiddleware extends BaseMiddleware
{
	/**
	 * Execute
	 */
	// eslint-disable-next-line @typescript-eslint/require-await -- This is a temporary solution.
	public static override async Execute(): Promise<void>
	{
		const COOKIES: Map<string, string>|undefined = ExecutionContext.GetRequest()?.getCookies();

		if (COOKIES === undefined) {
			this.InitializeNewSession();

			return;
		}

		const SESSION_ID: string|undefined = COOKIES.get(`${Session.GetCookieNameScope()}:id`);

		if (SESSION_ID === undefined) {
			this.InitializeNewSession();

			return;
		}

		this.InitializeExistingSession(SESSION_ID);
	}

	private static InitializeNewSession(): Session
	{
		const NEW_SESSION: Session = Session.Create();

		NEW_SESSION.save();

		NEW_SESSION.setCookie(`${Session.GetFullCookieName()}:id`, NEW_SESSION.getId());
		NEW_SESSION.refresh();
		ExecutionContext.SetSession(NEW_SESSION);

		return NEW_SESSION;
	}

	private static InitializeExistingSession(session_id: string): Session
	{
		let existing_session: Session|undefined = SessionManager.GetSession(session_id);

		if (existing_session === undefined)
		{
			existing_session = this.InitializeNewSession();
		}

		existing_session.refresh();
		ExecutionContext.SetSession(existing_session);

		return existing_session;
	}
}

export { SessionMiddleware };
