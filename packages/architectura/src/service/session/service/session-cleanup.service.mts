import { toError } from "@vitruvius-labs/ts-predicate/helper";
import { MillisecondEnum } from "@vitruvius-labs/toolbox";
import { Server } from "../../../core/server/server.mjs";
import { SessionRegistry } from "../entity/session.registry.mjs";
import { SessionConstantEnum } from "../definition/enum/session-constant.enum.mjs";

/**
 * Session cleanup service
 *
 * @sealed
 */
class SessionCleanupService
{
	private static TIMER: NodeJS.Timeout | undefined;

	/**
	 * Cleanup expired sessions
	 *
	 * @remarks
	 * - Remove expired sessions from the registry and clear their data
	 */
	public static async Cleanup(): Promise<void>
	{
		const ERRORS: Array<Error> = [];

		for (const SESSION of SessionRegistry.ListSessions())
		{
			if (!SESSION.isExpired())
			{
				continue;
			}

			SessionRegistry.RemoveSession(SESSION);

			try
			{
				await SESSION.clearData();
			}
			catch (error: unknown)
			{
				ERRORS.push(toError(error));
			}
		}

		if (ERRORS.length > 0)
		{
			throw new AggregateError(ERRORS, "Failed to cleanup some expired sessions");
		}
	}

	/**
	 * Start watching periodically for expired sessions to destroy
	 *
	 * @remarks
	 * - This method should be called once in the application lifecycle if the application uses sessions
	 * - The timer is unref'd to allow the application to exit even if the timer is still running
	 * - Do nothing if the timer is already running
	 * - Will call the cleanup method every few minutes
	 */
	public static StartWatching(): void
	{
		if (SessionCleanupService.TIMER !== undefined)
		{
			return;
		}

		SessionCleanupService.TIMER = setInterval(
			// eslint-disable-next-line @ts/no-misused-promises -- Asynchronous callback
			async (): Promise<void> =>
			{
				try
				{
					await SessionCleanupService.Cleanup();
				}
				catch (error: unknown)
				{
					await Server.HandleError(error);
				}
			},
			SessionConstantEnum.MINUTES_BETWEEN_CLEANUP * MillisecondEnum.MINUTE
		);

		SessionCleanupService.TIMER.unref();
	}

	/**
	 * Stop watching
	 *
	 * @remarks
	 * - Do nothing if the timer is not running
	 */
	public static StopWatching(): void
	{
		if (SessionCleanupService.TIMER === undefined)
		{
			return;
		}

		clearInterval(SessionCleanupService.TIMER);
		SessionCleanupService.TIMER = undefined;
	}
}

export { SessionCleanupService };
