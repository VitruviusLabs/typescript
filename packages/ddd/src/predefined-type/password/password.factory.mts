import { hash as crypto_hash } from "node:crypto";
import type { NullablePassword } from "./nullable-password.mjs";
import { NullPassword } from "./null-password.mjs";
import { Password } from "./password.mjs";

class PasswordFactory
{
	public static CreateNew(algorithm: string, salt: string, password: string): Password
	{
		const hash: string = crypto_hash(algorithm, password + salt);

		return new Password({
			algorithm: algorithm,
			salt: salt,
			hash: hash,
		});
	}

	public static CreateExisting(algorithm: string, salt: string, hash: string): NullablePassword
	{
		return new Password({
			algorithm: algorithm,
			salt: salt,
			hash: hash,
		});
	}

	public static CreateNullable(algorithm: string | null, salt: string | null, hash: string | null): NullablePassword
	{
		if (algorithm === null || salt === null || hash === null)
		{
			return new NullPassword();
		}

		return new Password({
			algorithm: algorithm,
			salt: salt,
			hash: hash,
		});
	}
}

export { PasswordFactory };
