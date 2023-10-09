import { ExecutionContext } from "../Core/ExecutionContext.mjs";

import { CookieEnum } from "../Service/Cookie/CookieEnum.mjs";

import { Session } from "../Service/Session.mjs";

import { SessionManager } from "../Service/SessionManager.mjs";

import { BaseMiddleware } from "./BaseMiddleware.mjs";

abstract class SessionMiddleware extends BaseMiddleware
{
	/**
	 * Execute
	 */
	public static override async Execute(): Promise<void>
	{
		const COOKIES: Map<string, string>|undefined = ExecutionContext.GetRequest()?.getCookies();

		if (COOKIES === undefined) {
			await this.InitializeNewSession();
			return;
		}
		const SESSION_ID: string|undefined = COOKIES.get(CookieEnum.SESSION_ID);

		if (SESSION_ID === undefined) {
			await this.InitializeNewSession();
			return;
		}
		await this.InitializeExistingSession(SESSION_ID);
	}

	private static async InitializeNewSession(): Promise<Session>
	{
		const NEW_SESSION: Session = Session.Create();

		NEW_SESSION.save();

		NEW_SESSION.setCookie(CookieEnum.SESSION_ID, NEW_SESSION.getId());
		NEW_SESSION.refresh();
		ExecutionContext.SetSession(NEW_SESSION);

		return NEW_SESSION;
	}

	private static async InitializeExistingSession(session_id: string): Promise<Session>
	{
		let existing_session: Session|undefined = SessionManager.GetSession(session_id);

		if (existing_session === undefined)
		{
			existing_session = await this.InitializeNewSession();
		}

		existing_session.refresh();
		ExecutionContext.SetSession(existing_session);

		return existing_session;
	}
}

export { SessionMiddleware };
