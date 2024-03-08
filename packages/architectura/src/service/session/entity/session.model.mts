import type { JSONObjectType } from "../../../definition/type/json-object.type.mjs";
import type { SessionDelegate } from "./session.delegate.mjs";
import { SessionConstantEnum } from "../definition/enum/session-constant.enum.mjs";
import { MillisecondEnum } from "../../../definition/enum/millisecond.enum.mjs";

class Session
{
	private readonly uuid: string;
	private readonly delegate: SessionDelegate;
	private expirationTime: number;
	private data: JSONObjectType;

	public constructor(uuid: string, delegate: SessionDelegate)
	{
		this.uuid = uuid;
		this.delegate = delegate;
		this.expirationTime = 0;
		this.data = {};

		this.refresh();
	}

	/**
	 * save
	 */
	public async save(): Promise<void>
	{
		await this.delegate.saveData(this.uuid, this.data);
	}

	/**
	 * clear
	 */
	public async clear(): Promise<void>
	{
		await this.delegate.removeData(this.uuid);
		this.data = {};
	}

	/**
	 * refresh
	 */
	public refresh(): void
	{
		const TTL: number = SessionConstantEnum.MINUTES_TO_LIVE * MillisecondEnum.MINUTE;

		this.expirationTime = Date.now() + TTL;
	}

	/**
	 * isExpired
	 */
	public isExpired(): boolean
	{
		return this.expirationTime < Date.now();
	}

	/**
	 * getUUID
	 */
	public getUUID(): string
	{
		return this.uuid;
	}

	/**
	 * getData
	 */
	public getData(): JSONObjectType
	{
		return this.data;
	}

	/**
	 * setData
	 */
	public setData(data: JSONObjectType): void
	{
		this.data = data;
	}
}

export { Session };
