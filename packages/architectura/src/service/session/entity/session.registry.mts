import { Session } from "./session.mjs";

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
		if (SessionRegistry.SESSIONS.has(session.getUUID()))
		{
			throw new Error("A session with this UUID already exists");
		}

		SessionRegistry.SESSIONS.set(session.getUUID(), session);
	}

	/**
	 * Remove a session from the registry
	 */
	public static RemoveSession(session_or_uuid: Session | string): void
	{
		if (session_or_uuid instanceof Session)
		{
			SessionRegistry.SESSIONS.delete(session_or_uuid.getUUID());

			return;
		}

		SessionRegistry.SESSIONS.delete(session_or_uuid);
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
