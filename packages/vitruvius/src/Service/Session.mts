import { randomUUID } from "node:crypto";

// import { ExecutionContext } from "../Core/ExecutionContext.mjs";

import { MillisecondEnum } from "../Core/Time/MillisecondEnum.mjs";

// import { CookieEnum } from "./Cookie/CookieEnum.mjs";

import { Environment } from "./Environment.mjs";

// import { Logger } from "./Logger.mjs";

import { SessionManager } from "./SessionManager.mjs";

import type { SessionInstantiationInterface } from "./Session/SessionInstantiationInterface.mjs";

// import type { SessionInterface } from "./Session/SessionInterface.mjs";

class Session
{
	private readonly id: string;
	private cookies: Map<string, string> = new Map<string, string>();

	private readonly timeout: NodeJS.Timeout;

	private constructor(value: SessionInstantiationInterface)
	{
		this.id = value.id;

		this.timeout = setTimeout(
			(): void =>
			{
				this.close();
			},
			Environment.GetUserSessionDuration() * MillisecondEnum.SECOND
		);
	}

	/**
	 * Create
	 */
	// public static async Create(value: SessionInterface): Promise<Session>
	public static Create(): Session
	{
		const INSTANTIATION_INTERFACE: SessionInstantiationInterface = {
			id: randomUUID()
		};

		const INSTANCE: Session = new Session(INSTANTIATION_INTERFACE);

		return INSTANCE;
	}

	/**
	 * GetById
	 */
	public static GetById(id: string): Session|undefined
	{
		return SessionManager.GetSession(id);
	}

	/**
	 * close
	 */
	public close(): void
	{
		clearTimeout(this.timeout);
		SessionManager.ClearSession(this.getId());
	}

	/**
	 * save
	 */
	public save(): void
	{
		SessionManager.SetSession(this.getId(), this);
	}

	/**
	 * refresh
	 */
	public refresh(): void
	{
		// ExecutionContext.GetResponse()?.cookie(CookieEnum.SESSION_ID, this.getId());
		this.timeout.refresh();
	}

	/**
	 * getId
	 */
	public getId(): string
	{
		return this.id;
	}

	/**
	 * getCookies
	 */
	public getCookies(): Map<string, string>
	{
		return this.cookies;
	}

	/**
	 * setCookie
	 */
	public setCookie(key: string, value: string): void
	{
		this.cookies.set(key, value);
	}

	/**
	 * setCookies
	 */
	public setCookies(cookies: Map<string, string>): void
	{
		this.cookies = cookies;
	}
}

export { Session };