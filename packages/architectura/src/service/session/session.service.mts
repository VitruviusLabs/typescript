import { randomUUID } from "node:crypto";

// import { ExecutionContext } from "../Core/ExecutionContext.mjs";

import { MillisecondEnum } from "../../Core/Time/MillisecondEnum.mjs";

// import { CookieEnum } from "./Cookie/CookieEnum.mjs";

// import { Logger } from "./Logger.mjs";


import { SessionEnum } from "../../definition/enum/session.enum.mjs";

import { SessionManager } from "../SessionManager.mjs";

import { CookieService } from "../cookie/cookie.service.mjs";

import type { SessionInstantiationInterface } from "../../definition/interface/session-instantiation.interface.mjs";

// import type { SessionInterface } from "./Session/SessionInterface.mjs";

class SessionService
{
	private static readonly Duration: number = SessionEnum.DEFAULT_DURATION;
	private static CookieNameScope: string = "session";

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
			SessionService.Duration * MillisecondEnum.SECOND
		);
	}

	/**
	 * Create
	 */
	// public static async Create(value: SessionInterface): Promise<Session>
	public static Create(): SessionService
	{
		const INSTANTIATION_INTERFACE: SessionInstantiationInterface = {
			id: randomUUID()
		};

		const INSTANCE: SessionService = new SessionService(INSTANTIATION_INTERFACE);

		return INSTANCE;
	}

	/**
	 * GetById
	 */
	public static GetById(id: string): SessionService | undefined
	{
		return SessionManager.GetSession(id);
	}

	/**
	 * GetCookieNameScope
	 */
	public static GetCookieNameScope(): string
	{
		return this.CookieNameScope;
	}

	/**
	 * SetCookieNameScope
	 */
	public static SetCookieNameScope(scope: string): void
	{
		this.CookieNameScope = scope;
	}

	public static GetFullCookieName(): string
	{
		return `${CookieService.GetCookieServiceNamePrefix()}:${SessionService.CookieNameScope}`;
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

export { SessionService };
