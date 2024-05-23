import type { Session } from "./session.model.mjs";

/**
 * Session registry
 *
 * @sealed
 */
class SessionRegistry
{
	private static readonly SESSIONS: Map<string, Session> = new Map();

	/**
	 * Get a session by its UUID
	 */
	public static GetSession(uuid: string): Session | undefined
	{
		return this.SESSIONS.get(uuid);
	}

	/**
	 * Add a session to the registry
	 */
	public static AddSession(session: Session): void
	{
		this.SESSIONS.set(session.getUUID(), session);
	}

	/**
	 * Remove a session from the registry
	 */
	public static RemoveSession(uuid: string): void
	{
		this.SESSIONS.delete(uuid);
	}

	/**
	 * List all sessions
	 */
	public static ListSessions(): IterableIterator<Session>
	{
		return this.SESSIONS.values();
	}
}

export { SessionRegistry };
