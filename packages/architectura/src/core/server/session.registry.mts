import type { Session } from "./session.mjs";

abstract class SessionRegistry
{
	private static readonly SESSIONS: Map<string, Session> = new Map();

	/**
	 * GetSession
	 */
	public static GetSession(key: string): Session | undefined
	{
		return this.SESSIONS.get(key);
	}

	/**
	 * SetSession
	 */
	public static SetSession(key: string, value: Session): void
	{
		this.SESSIONS.set(key, value);
	}

	/**
	 * ClearSession
	 */
	public static ClearSession(key: string): void
	{
		this.SESSIONS.delete(key);
	}
}

export { SessionRegistry };
