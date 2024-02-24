import { ExecutionContext } from "../Core/ExecutionContext.mjs";

import { BasePreHook , Kernel } from "../index.mjs";

import { SessionManagerService, SessionService } from "../service/_index.mjs";

abstract class SessionPreHook extends BasePreHook
{
	/**
	 * execute
	 */
	public execute(): void
	{
		const CONTEXT: ExecutionContext = Kernel.GetExecutionContext(ExecutionContext);

		const COOKIES: Map<string, string> = CONTEXT.getRequest().getCookies();

		if (!COOKIES.has(`${SessionService.GetFullCookieName()}:id`))
		{
			this.initializeNewSession();

			return;
		}

		const SESSION_ID: string | undefined = COOKIES.get(`${SessionService.GetCookieNameScope()}:id`);

		if (SESSION_ID === undefined)
		{
			this.initializeNewSession();

			return;
		}

		this.initializeExistingSession(SESSION_ID);
	}

	// eslint-disable-next-line class-methods-use-this -- Stateless
	private initializeNewSession(): SessionService
	{
		const NEW_SESSION: SessionService = SessionService.Create();

		NEW_SESSION.save();

		NEW_SESSION.setCookie(`${SessionService.GetFullCookieName()}:id`, NEW_SESSION.getId());
		NEW_SESSION.refresh();

		const CONTEXT: ExecutionContext = Kernel.GetExecutionContext(ExecutionContext);

		CONTEXT.setSession(NEW_SESSION);

		return NEW_SESSION;
	}

	private initializeExistingSession(session_id: string): SessionService
	{
		let existing_session: SessionService | undefined = SessionManagerService.GetSession(session_id);

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
