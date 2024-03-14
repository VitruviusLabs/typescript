import { randomUUID } from "node:crypto";
import type { ExecutionContext } from "../../../core/execution-context/execution-context.mjs";
import type { SessionDelegate } from "../entity/session.delegate.mjs";
import { BasePreHook } from "../../../core/hook/base.pre-hook.mjs";
import { Server } from "../../../core/server/server.mjs";
import { Session } from "../entity/session.model.mjs";
import { SessionRegistry } from "../entity/session.registry.mjs";
import { SessionConstantEnum } from "../definition/enum/session-constant.enum.mjs";
import { MillisecondEnum } from "../../../definition/enum/millisecond.enum.mjs";

class SessionPreHook extends BasePreHook
{
	private readonly delegate: SessionDelegate;

	public constructor(delegate: SessionDelegate)
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
						await SESSION.clear();
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

	public execute(context: ExecutionContext): void
	{
		let session: Session | undefined = undefined;

		const SESSION_ID: string | undefined = context.getRequest().getCookie(SessionConstantEnum.COOKIE_NAME);

		if (SESSION_ID !== undefined)
		{
			session = SessionRegistry.GetSession(SESSION_ID);
		}

		if (session !== undefined)
		{
			session.refresh();
			context.setSession(session);

			return;
		}

		session = new Session(SESSION_ID ?? randomUUID(), this.delegate);

		SessionRegistry.AddSession(session);
		context.setSession(session);

		if (SESSION_ID === undefined)
		{
			context.getResponse().setCookie({
				name: SessionConstantEnum.COOKIE_NAME.toString(),
				value: session.getUUID(),
			});
		}
	}
}

export { SessionPreHook };
