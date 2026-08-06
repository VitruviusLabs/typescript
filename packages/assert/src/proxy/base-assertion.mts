import type { BaseAssertionInternal, FluentAssertionInternal, RootAssertionInternal } from "../internal/_index.mjs";
import { FluentAssertion, RootAssertion } from "./_index.mjs";

abstract class BaseAssertion<T extends BaseAssertionInternal>
{
	protected readonly internal: T;

	public constructor(internal: T)
	{
		this.internal = internal;
	}

	/**
	 * @return the initial assertion.
	 *
	 * @throws if this is the root assertion
	 */
	public reset(): RootAssertion
	{
		return new RootAssertion(this.internal.root);
	}

	/**
	 * @return the parent assertion.
	 *
	 * @throws if this is the root assertion
	 */
	public rewind(): FluentAssertion
	{
		const root: RootAssertionInternal = this.internal.root;
		const parent: FluentAssertionInternal = this.internal.parent;

		if (parent === root)
		{
			return new RootAssertion(root);
		}

		return new FluentAssertion(parent);
	}

	/**
	 * @privateRemarks
	 * Allow awaiting the assertion without exposing the method
	 */
	protected then(resolve: (value: Promise<void> | undefined) => void): void
	{
		resolve(this.internal.root.promise);
	}
}

export { BaseAssertion };
