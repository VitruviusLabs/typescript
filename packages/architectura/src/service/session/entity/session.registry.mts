import type { Session } from "./session.mjs";

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
		return SessionRegistry.SESSIONS.get(uuid);
	}

	/**
	 * Add a session to the registry
	 */
	public static AddSession(session: Session): void
	{
		SessionRegistry.SESSIONS.set(session.getUUID(), session);
	}

	/**
	 * Remove a session from the registry
	 */
	public static RemoveSession(uuid: string): void
	{
		SessionRegistry.SESSIONS.delete(uuid);
	}

	/**
	 * List all sessions
	 *
	 * @internal
	 *
	 * @privateRemarks
	 * Used for cleaning expired sessions.
	 */
	public static ListSessions(): IterableIterator<Session>
	{
		return SessionRegistry.SESSIONS.values();
	}
}

export { SessionRegistry };
