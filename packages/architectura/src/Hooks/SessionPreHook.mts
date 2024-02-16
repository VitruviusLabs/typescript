import { ExecutionContext } from "../Core/ExecutionContext.mjs";

import { Session } from "../Service/Session.mjs";

import { SessionManager } from "../Service/SessionManager.mjs";

import { Kernel } from "../index.mjs";

import { BasePreHook } from "./BasePreHook.mjs";

abstract class SessionPreHook extends BasePreHook
{
	/**
	 * execute
	 */
	public execute(): void
	{
		const CONTEXT: ExecutionContext = Kernel.GetExecutionContext(ExecutionContext);

		const COOKIES: Map<string, string> = CONTEXT.getRequest().getCookies();

		if (!COOKIES.has(`${Session.GetFullCookieName()}:id`))
		{
			this.initializeNewSession();

			return;
		}

		const SESSION_ID: string | undefined = COOKIES.get(`${Session.GetCookieNameScope()}:id`);

		if (SESSION_ID === undefined)
		{
			this.initializeNewSession();

			return;
		}

		this.initializeExistingSession(SESSION_ID);
	}

	// eslint-disable-next-line class-methods-use-this -- Stateless
	private initializeNewSession(): Session
	{
		const NEW_SESSION: Session = Session.Create();

		NEW_SESSION.save();

		NEW_SESSION.setCookie(`${Session.GetFullCookieName()}:id`, NEW_SESSION.getId());
		NEW_SESSION.refresh();

		const CONTEXT: ExecutionContext = Kernel.GetExecutionContext(ExecutionContext);

		CONTEXT.setSession(NEW_SESSION);

		return NEW_SESSION;
	}

	private initializeExistingSession(session_id: string): Session
	{
		let existing_session: Session | undefined = SessionManager.GetSession(session_id);

		if (existing_session === undefined)
		{
			existing_session = this.initializeNewSession();
		}

		existing_session.refresh();

		const CONTEXT: ExecutionContext = Kernel.GetExecutionContext(ExecutionContext);

		CONTEXT.setSession(existing_session);

		return existing_session;
	}
}

export { SessionPreHook };
