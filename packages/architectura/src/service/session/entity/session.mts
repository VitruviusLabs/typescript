import { type JSONObjectType, MillisecondEnum } from "@vitruvius-labs/toolbox";
import type { SessionDelegateInterface } from "../definition/interface/session-delegate.interface.mjs";
import { SessionConstantEnum } from "../definition/enum/session-constant.enum.mjs";
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
	private readonly delegate: SessionDelegateInterface | undefined;
	private expirationTime: number;
	private data: JSONObjectType;

	/**
	 * Create a new session object
	 *
	 * @remarks
	 * No data will be loaded from the delegate.
	 */
	public constructor(uuid: string, delegate?: SessionDelegateInterface)
	{
		super();

		this.uuid = uuid;
		this.expirationTime = 0;
		this.delegate = delegate;
		this.data = {};

		this.postponeExpiration();
	}

	/**
	 * Get the session UUID
	 */
	public getUUID(): string
	{
		return this.uuid;
	}

	/**
	 * Check if the session is expired
	 */
	public isExpired(): boolean
	{
		return this.expirationTime < Date.now();
	}

	/**
	 * Get the expiration date
	 */
	public getExpirationDate(): Date
	{
		return new Date(this.expirationTime);
	}

	/**
	 * Postpone the expiration date
	 */
	public postponeExpiration(): void
	{
		const TTL: number = SessionConstantEnum.MINUTES_TO_LIVE * MillisecondEnum.MINUTE;

		this.expirationTime = Date.now() + TTL;
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

	/**
	 * Load the session data
	 */
	public async loadData(): Promise<void>
	{
		const DATA: JSONObjectType | undefined = await this.delegate?.fetchData(this.uuid);

		if (DATA !== undefined)
		{
			this.data = DATA;
		}
	}

	/**
	 * Save the session data
	 */
	public async saveData(): Promise<void>
	{
		await this.delegate?.saveData(this.uuid, this.data);
	}

	/**
	 * Clear the session data
	 */
	public async clearData(): Promise<void>
	{
		await this.delegate?.removeData(this.uuid);
		this.data = {};
	}
}

export { Session };
