import { NullablePassword } from "./nullable-password.mjs";

class NullPassword extends NullablePassword
{
	// eslint-disable-next-line @ts/class-methods-use-this
	public getAlgorithm(): null
	{
		return null;
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	public getSalt(): null
	{
		return null;
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	public getHash(): null
	{
		return null;
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	public verify(): false
	{
		return false;
	}
}

export { NullPassword };
