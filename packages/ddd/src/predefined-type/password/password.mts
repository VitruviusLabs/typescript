import { hash as crypto_hash } from "node:crypto";
import type { PasswordInstantiationInterface } from "./definition/interface/password-instantiation.interface.mjs";
import { NullablePassword } from "./nullable-password.mjs";

class Password extends NullablePassword
{
	protected readonly algorithm: string;
	protected readonly salt: string;
	protected readonly hash: string;

	public constructor(parameters: PasswordInstantiationInterface)
	{
		super();

		this.algorithm = parameters.algorithm;
		this.salt = parameters.salt;
		this.hash = parameters.hash;
	}

	public getAlgorithm(): string
	{
		return this.algorithm;
	}

	public getSalt(): string
	{
		return this.salt;
	}

	public getHash(): string
	{
		return this.hash;
	}

	public verify(password: string): boolean
	{
		return this.hash === crypto_hash(this.algorithm, password + this.salt);
	}
}

export { Password };
