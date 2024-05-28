import type { SessionDelegateInterface } from "../definition/interface/session-delegate.interface.mjs";
import { Session } from "./session.mjs";

/**
 * Session Factory
 *
 * @sealed
 */
class SessionFactory
{
	/**
	 * Create a new session object
	 *
	 * @remarks
	 * Data will be loaded from the delegate if provided.
	 */
	public static async Create(uuid: string, delegate?: SessionDelegateInterface): Promise<Session>
	{
		const SESSION: Session = new Session(uuid, delegate);

		await SESSION.loadData();

		return SESSION;
	}
}

export { SessionFactory };
