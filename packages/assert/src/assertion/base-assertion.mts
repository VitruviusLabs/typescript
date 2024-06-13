import type { BaseAssertionInstantiationInterface } from "../definition/interface/base-assertion-instantiation.interface.mjs";
import { FluentAssertion, RootAssertion } from "./_internal.mjs";

/**
 * Base assertion
 *
 * @internal
 */
abstract class BaseAssertion
{
	protected readonly root: RootAssertion;
	protected readonly parent: FluentAssertion;

	public constructor(parameter: BaseAssertionInstantiationInterface)
	{
		const ROOT: BaseAssertion = parameter.root ?? this;
		const PARENT: BaseAssertion = parameter.parent ?? this;

		if (!(ROOT instanceof RootAssertion))
		{
			throw new Error("Root assertion is required");
		}

		if (!(PARENT instanceof FluentAssertion))
		{
			throw new Error("Parent assertion is required");
		}

		this.root = ROOT;
		this.parent = PARENT;
	}

	/**
	 * @return the initial assertion.
	 *
	 * @throws if this is the root assertion
	 */
	public reset(): FluentAssertion
	{
		if (this instanceof RootAssertion)
		{
			throw new Error("Cannot backtrack from the root assertion");
		}

		return this.root;
	}

	/**
	 * @return the parent assertion.
	 *
	 * @throws if this is the root assertion
	 */
	public rewind(): FluentAssertion
	{
		if (this instanceof RootAssertion)
		{
			throw new Error("Cannot backtrack from the root assertion");
		}

		return this.parent;
	}

	/**
	 * @privateRemarks
	 * Allow awaiting the assertion without exposing the method
	 */
	protected then(resolve: (value: Promise<void> | undefined) => void): void
	{
		resolve(this.root.promise);
	}
}

export { BaseAssertion };
