import { FluentAssertion } from "./_internal.mjs";

/**
 * Root assertion
 *
 * @internal
 */
class RootAssertion extends FluentAssertion
{
	/**
	 * The promise chain is shared between the whole assertion tree
	**/
	public promise: Promise<void> | undefined;

	public constructor(value: unknown)
	{
		super({ name: RootAssertion.GetName(value) });

		this.setValue(value);

		this.promise = undefined;
	}

	protected static GetName(value: unknown): string
	{
		if (RootAssertion.IsSpy(value))
		{
			if (value.wrappedMethod as unknown !== undefined)
			{
				return `spy of "${value.wrappedMethod.name}"`;
			}

			return "spy";
		}

		if (RootAssertion.IsSpyCall(value))
		{
			return "spy call";
		}

		if (typeof value === "function")
		{
			return "callable";
		}

		return "value";
	}
}

export { RootAssertion };
