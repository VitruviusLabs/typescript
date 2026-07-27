import { NullableLazyReference } from "./nullable-lazy-reference.mjs";

class NullReference extends NullableLazyReference<never>
{
	// eslint-disable-next-line @ts/class-methods-use-this
	public getUUID(): null
	{
		return null;
	}

	// eslint-disable-next-line @ts/class-methods-use-this, @ts/require-await
	public async getRecord(): Promise<null>
	{
		return null;
	}

	// eslint-disable-next-line @ts/class-methods-use-this, @ts/no-empty-function
	public enableCaching(): void {}

	// eslint-disable-next-line @ts/class-methods-use-this, @ts/no-empty-function
	public disableCaching(): void {}

	// eslint-disable-next-line @ts/class-methods-use-this, @ts/no-empty-function
	public clearCachedRecord(): void {}
}

export { NullReference };
