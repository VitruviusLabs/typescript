import { FluentAssertionInternal } from "./_index.mjs";
import { isSpyCall } from "../fluent/sinon/predicate/is-spy-call.mjs";
import { isSpy } from "../fluent/sinon/predicate/is-spy.mjs";

/** @internal */
class RootAssertionInternal extends FluentAssertionInternal
{
	/**
	 * The promise chain is shared between the whole assertion tree
	**/
	public promise: Promise<void> | undefined;

	public constructor(value: unknown)
	{
		// `this` can only be accessed from the top level class, so we cannot simply pass `this` for root and parent
		super({ name: RootAssertionInternal.GetName(value) });

		this.setValue(value);

		this.promise = undefined;
	}

	public static GetName(value: unknown): string
	{
		if (isSpy(value))
		{
			if (value.wrappedMethod as unknown !== undefined)
			{
				return `spy of "${value.wrappedMethod.name}"`;
			}

			return "spy";
		}

		if (isSpyCall(value))
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

export { RootAssertionInternal };
