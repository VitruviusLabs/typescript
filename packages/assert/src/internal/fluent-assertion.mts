import type { AssertionInstantiationInterface } from "./definition/interface/assertion-instantiation.interface.mjs";
import type { AssertionFlagsInterface } from "./definition/interface/assertion-flags.interface.mjs";
import { BaseAssertionInternal } from "./base-assertion.mjs";
import { VoidAssertionInternal } from "./void-assertion.mjs";

/** @internal */
class FluentAssertionInternal extends BaseAssertionInternal
{
	public static readonly MISSING_VALUE: unique symbol = Symbol("MISSING_VALUE");

	public readonly name: string;
	public readonly actualValue: unknown;
	protected negationFlag: boolean;

	public constructor(parameter: AssertionInstantiationInterface)
	{
		super(parameter);

		this.name = parameter.name;
		this.actualValue = FluentAssertionInternal.MISSING_VALUE;
		this.negationFlag = false;
	}

	public negate(): void
	{
		if (this.negationFlag)
		{
			throw new Error("Double negation");
		}

		this.negationFlag = true;
	}

	public disableNegation(name: string, alternate?: string): void
	{
		if (!this.negationFlag)
		{
			return;
		}

		if (alternate !== undefined)
		{
			throw new Error(`"${name}" cannot be negated, use "${alternate}" instead`);
		}

		throw new Error(`"${name}" cannot be negated`);
	}

	public appendAction(action: (flags: AssertionFlagsInterface) => Promise<void> | void): void
	{
		/* Because of the asynchronous chain, the flags can change before the action is executed */
		/* Snapshot of the flags when the action was appended */
		const FLAGS: AssertionFlagsInterface = {
			negation: this.negationFlag,
		};

		/* Reset of the flags for the next action */
		this.negationFlag = false;

		if (this.root.promise === undefined)
		{
			const RESULT: Promise<void> | void = action(FLAGS);

			if (RESULT instanceof Promise)
			{
				/* Beginning of the promise chain */
				this.root.promise = RESULT;
			}

			return;
		}

		/* Append action to the promise chain */
		this.root.promise = this.root.promise.then(
			(): Promise<void> | void =>
			{
				/* Append to the promise chain */
				return action(FLAGS);
			}
		);
	}

	public setValue(value: unknown): void
	{
		if (this.actualValue !== FluentAssertionInternal.MISSING_VALUE)
		{
			throw new Error("Value already set");
		}

		Reflect.set(this, "actualValue", value);
	}

	public createVoidAssertion(): VoidAssertionInternal
	{
		return new VoidAssertionInternal({
			root: this.root,
			parent: this,
		});
	}

	public createAssertion(name: string): FluentAssertionInternal
	{
		return new FluentAssertionInternal({
			root: this.root,
			parent: this,
			name: this.buildName(name),
		});
	}

	public buildName(suffix: string): string
	{
		if (this.name === "value")
		{
			return suffix;
		}

		return `${this.name} ${suffix}`;
	}
}

export { FluentAssertionInternal };
