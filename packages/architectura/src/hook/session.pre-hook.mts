import type { ExecutionContext } from "../core/execution-context/execution-context.mjs";
import { ExecutionContextRegistry } from "../core/execution-context/execution-context.registry.mjs";
import { Session } from "../core/server/session.mjs";
import { SessionRegistry } from "../core/server/session.registry.mjs";
import { BasePreHook } from "./base.pre-hook.mjs";

abstract class SessionPreHook extends BasePreHook
{
	/**
	 * execute
	 */
	public execute(): void
	{
		const CONTEXT: ExecutionContext = ExecutionContextRegistry.GetExecutionContext();

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

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this -- Stateless
	private initializeNewSession(): Session
	{
		const NEW_SESSION: Session = Session.Create();

		NEW_SESSION.save();

		NEW_SESSION.setCookie(`${Session.GetFullCookieName()}:id`, NEW_SESSION.getId());
		NEW_SESSION.refresh();

		const CONTEXT: ExecutionContext = ExecutionContextRegistry.GetExecutionContext();

		CONTEXT.setSession(NEW_SESSION);

		return NEW_SESSION;
	}

	private initializeExistingSession(session_id: string): Session
	{
		let existing_session: Session | undefined = SessionRegistry.GetSession(session_id);

		if (existing_session === undefined)
		{
			existing_session = this.initializeNewSession();
		}

		existing_session.refresh();

		const CONTEXT: ExecutionContext = ExecutionContextRegistry.GetExecutionContext();

		CONTEXT.setSession(existing_session);

		return existing_session;
	}
}

export { SessionPreHook };
