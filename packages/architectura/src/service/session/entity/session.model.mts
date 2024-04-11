import type { JSONObjectType } from "../../../utility/json/_index.mjs";
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

	public async save(): Promise<void>
	{
		await this.delegate.saveData(this.uuid, this.data);
	}

	public async clear(): Promise<void>
	{
		await this.delegate.removeData(this.uuid);
		this.data = {};
	}

	public refresh(): void
	{
		const TTL: number = SessionConstantEnum.MINUTES_TO_LIVE * MillisecondEnum.MINUTE;

		this.expirationTime = Date.now() + TTL;
	}

	public isExpired(): boolean
	{
		return this.expirationTime < Date.now();
	}

	public getUUID(): string
	{
		return this.uuid;
	}

	public getData(): JSONObjectType
	{
		return this.data;
	}

	public setData(data: JSONObjectType): void
	{
		this.data = data;
	}
}

export { Session };
