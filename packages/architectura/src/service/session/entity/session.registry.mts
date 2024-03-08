import type { Session } from "./session.model.mjs";

class SessionRegistry
{
	private static readonly SESSIONS: Map<string, Session> = new Map();

	private constructor() {}

	/**
	 * GetSession
	 */
	public static GetSession(uuid: string): Session | undefined
	{
		return this.SESSIONS.get(uuid);
	}

	/**
	 * AddSession
	 */
	public static AddSession(session: Session): void
	{
		this.SESSIONS.set(session.getUUID(), session);
	}

	/**
	 * RemoveSession
	 */
	public static RemoveSession(uuid: string): void
	{
		this.SESSIONS.delete(uuid);
	}

	/**
	 * ListSessions
	 */
	public static ListSessions(): IterableIterator<Session>
	{
		return this.SESSIONS.values();
	}
}

export { SessionRegistry };
