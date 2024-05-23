import type { JSONObjectType } from "../../../utility/json/definition/type/json-object.type.mjs";
import type { SessionDelegate } from "./session.delegate.mjs";
import { SessionConstantEnum } from "../definition/enum/session-constant.enum.mjs";
import { MillisecondEnum } from "../../../definition/enum/millisecond.enum.mjs";
import { ContextualStorage } from "../../../core/utility/contextual-storage.mjs";

/**
 * Session class
 *
 * @remarks
 * Expires after a set time.
 * Store session data which can be saved remotely.
 * You can link custom objects to the session too, but they won't be saved like the data.
 *
 * @sealed
 */
class Session extends ContextualStorage
{
	private readonly uuid: string;
	private readonly delegate: SessionDelegate;
	private expirationTime: number;
	private data: JSONObjectType;

	/**
	 * Create a new session object
	 */
	public constructor(uuid: string, delegate: SessionDelegate)
	{
		super();

		this.uuid = uuid;
		this.delegate = delegate;
		this.expirationTime = 0;
		this.data = {};

		this.refresh();
	}

	/**
	 * Save the session data
	 */
	public async save(): Promise<void>
	{
		await this.delegate.saveData(this.uuid, this.data);
	}

	/**
	 * Clear the session data
	 */
	public async clear(): Promise<void>
	{
		await this.delegate.removeData(this.uuid);
		this.data = {};
	}

	/**
	 * Refresh the session remaining time
	 */
	public refresh(): void
	{
		const TTL: number = SessionConstantEnum.MINUTES_TO_LIVE * MillisecondEnum.MINUTE;

		this.expirationTime = Date.now() + TTL;
	}

	/**
	 * Check if the session is expired
	 */
	public isExpired(): boolean
	{
		return this.expirationTime < Date.now();
	}

	/**
	 * Get the session UUID
	 */
	public getUUID(): string
	{
		return this.uuid;
	}

	/**
	 * Get the session data
	 */
	public getData(): JSONObjectType
	{
		return this.data;
	}

	/**
	 * Set the session data
	 */
	public setData(data: JSONObjectType): void
	{
		this.data = data;
	}
}

export { Session };
