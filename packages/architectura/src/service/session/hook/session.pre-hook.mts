import { randomUUID } from "node:crypto";
import type { ExecutionContext } from "../../../core/execution-context/execution-context.mjs";
import type { SessionDelegateInterface } from "../definition/interface/session-delegate.interface.mjs";
import { BasePreHook } from "../../../core/hook/base.pre-hook.mjs";
import { Server } from "../../../core/server/server.mjs";
import { Session } from "../entity/session.model.mjs";
import { SessionRegistry } from "../entity/session.registry.mjs";
import { SessionConstantEnum } from "../definition/enum/session-constant.enum.mjs";
import { MillisecondEnum } from "../../../definition/enum/millisecond.enum.mjs";

/**
 * Session pre-hook
 *
 * @sealed
 */
class SessionPreHook extends BasePreHook
{
	private readonly delegate: SessionDelegateInterface;

	/**
	 * Create the session pre-hook
	 *
	 * @remarks
	 * Initialize expired sessions removal
	 */
	public constructor(delegate: SessionDelegateInterface)
	{
		super();

		this.delegate = delegate;

		const TIMER: NodeJS.Timeout = setInterval(
			// eslint-disable-next-line @typescript-eslint/no-misused-promises -- Asynchronous callback
			async (): Promise<void> =>
			{
				try
				{
					for (const SESSION of SessionRegistry.ListSessions())
					{
						if (!SESSION.isExpired())
						{
							continue;
						}

						SessionRegistry.RemoveSession(SESSION.getUUID());
						await SESSION.clearData();
					}
				}
				catch (error: unknown)
				{
					await Server.HandleError(error);
				}
			},
			SessionConstantEnum.MINUTES_BETWEEN_CLEANUP * MillisecondEnum.MINUTE
		);

		TIMER.unref();
	}

	/**
	 * Execute the session pre-hook
	 *
	 * @remarks
	 * Refreshes the session if it exists, otherwise creates a new one.
	 * When creating a new one, prefill the session cookie in the response.
	 */
	public async execute(context: ExecutionContext): Promise<void>
	{
		const SESSION_ID: string | undefined = context.getRequest().getCookie(SessionConstantEnum.COOKIE_NAME);

		let session: Session | undefined = undefined;

		if (SESSION_ID !== undefined)
		{
			session = SessionRegistry.GetSession(SESSION_ID);
		}

		if (session !== undefined)
		{
			session.postponeExpiration();
			context.setContextualItem(Session, session);

			return;
		}

		const NEW_SESSION: Session = new Session(SESSION_ID ?? randomUUID(), this.delegate);

		SessionRegistry.AddSession(NEW_SESSION);
		context.setContextualItem(Session, NEW_SESSION);

		if (SESSION_ID === undefined)
		{
			context.getResponse().setCookie({
				name: SessionConstantEnum.COOKIE_NAME.toString(),
				value: NEW_SESSION.getUUID(),
			});
		}

		await NEW_SESSION.loadData();
	}
}

export { SessionPreHook };
