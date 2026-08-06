import type { BaseAssertionInstantiationInterface } from "./definition/interface/base-assertion-instantiation.interface.mjs";
import { FluentAssertionInternal, RootAssertionInternal } from "./_index.mjs";

/** @internal */
abstract class BaseAssertionInternal
{
	public readonly root: RootAssertionInternal;
	public readonly parent: FluentAssertionInternal;

	public constructor(parameter: BaseAssertionInstantiationInterface)
	{
		const ROOT: BaseAssertionInternal = parameter.root ?? this;
		const PARENT: BaseAssertionInternal = parameter.parent ?? this;

		if (!(ROOT instanceof RootAssertionInternal))
		{
			throw new Error("Root assertion is required");
		}

		if (!(PARENT instanceof FluentAssertionInternal))
		{
			throw new Error("Parent assertion is required");
		}

		this.root = ROOT;
		this.parent = PARENT;
	}
}

export { BaseAssertionInternal };
