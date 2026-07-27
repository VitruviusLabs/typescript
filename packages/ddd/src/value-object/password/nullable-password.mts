abstract class NullablePassword
{
	public abstract getAlgorithm(): string | null;
	public abstract getSalt(): string | null;
	public abstract getHash(): string | null;
	public abstract verify(password: string): boolean;
}

export { NullablePassword };
