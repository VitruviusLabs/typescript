import type { SessionService } from "../../core/server/session.service.mjs";

abstract class SessionManagerService
{
	private static readonly SESSIONS: Map<string, SessionService> = new Map();

	/**
	 * GetSession
	 */
	public static GetSession(key: string): SessionService | undefined
	{
		return this.SESSIONS.get(key);
	}

	/**
	 * SetSession
	 */
	public static SetSession(key: string, value: SessionService): void
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

export { SessionManagerService };
