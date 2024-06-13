/* eslint-disable max-lines -- Fluency is verbose */

import type { SinonSpy, SinonSpyCall } from "sinon";
import type { AssertionInstantiationInterface } from "../definition/interface/assertion-instantiation.interface.mjs";
import type { AssertionFlagsInterface } from "../definition/interface/assertion-flags.interface.mjs";
import { deepStrictEqual, doesNotMatch, doesNotReject, doesNotThrow, fail, match, notDeepStrictEqual, notStrictEqual, rejects, strictEqual, throws } from "node:assert";
import { BaseAssertion } from "./base-assertion.mjs";
import { VoidAssertion } from "./void-assertion.mjs";
import { AssertionConstantEnum } from "../definition/enum/assertion-constant.enum.mjs";
import { createErrorPredicate } from "../error-predicate/create-error-predicate.mjs";
import { getType } from "../utility/get-type.mjs";

/* eslint-disable @typescript-eslint/promise-function-async -- Promises are handled in a particular manner */
/* eslint-disable @typescript-eslint/member-ordering -- Ordered more meaningfully */
/* eslint-disable accessor-pairs -- Getters are used for fluent chaining */
/* eslint-disable id-length -- Fluent chaining words can be short */

/**
 * Fluent assertion
 *
 * @sealed
 */
class FluentAssertion extends BaseAssertion
{
	protected static readonly MISSING_VALUE: unique symbol = Symbol("MISSING_VALUE");

	protected readonly name: string;
	protected readonly actualValue: unknown;
	protected negationFlag: boolean;

	public constructor(parameter: AssertionInstantiationInterface)
	{
		super(parameter);

		this.name = parameter.name;
		this.actualValue = FluentAssertion.MISSING_VALUE;
		this.negationFlag = false;
	}

	protected static IsObject(value: unknown): value is object
	{
		return typeof value === "object" && value !== null;
	}

	protected static IsFunction(value: unknown): value is (...args: Array<unknown>) => unknown
	{
		return typeof value === "function";
	}

	protected static IsSpy(value: unknown): value is SinonSpy
	{
		if (!FluentAssertion.IsObject(value) && !FluentAssertion.IsFunction(value))
		{
			return false;
		}

		const SPY_KEYS: Array<string> = [
			"callCount",
			"called",
			"notCalled",
			"calledOnce",
			"calledTwice",
			"calledThrice",
			"firstCall",
			"secondCall",
			"thirdCall",
			"lastCall",
			"thisValues",
			"args",
			"exceptions",
			"returnValues",
		];

		return SPY_KEYS.every(
			(key: string): boolean =>
			{
				return key in value;
			}
		);
	}

	protected static IsSpyCall(value: unknown): value is SinonSpyCall
	{
		if (!FluentAssertion.IsObject(value) && !FluentAssertion.IsFunction(value))
		{
			return false;
		}

		const SPY_CALL_KEYS: Array<string> = [
			"args",
			"thisValue",
			"exception",
			"returnValue",
			"callback",
			"firstArg",
			"lastArg",
		];

		return SPY_CALL_KEYS.every(
			(key: string): boolean =>
			{
				return key in value;
			}
		);
	}

	/**
	 * Set the negation flag
	 *
	 * @remarks
	 * - The flag is reset after each assertion
	 * - See which assertion supports negation
	 *
	 * @throws if the flag is already set
	 */
	public get not(): this
	{
		if (this.negationFlag)
		{
			throw new Error("Double negation");
		}

		this.negationFlag = true;

		return this;
	}

	/**
	 * Assert that the value throw when invoked
	 *
	 * @returns A dead end assertion
	 *
	 * @throws if the value is not a function
	 * @throws if the value returns when invoked
	 * @throws if the thrown error does not match the predicate
	 */
	public throw(predicate?: Error | RegExp | string | typeof Error): VoidAssertion
	{
		if (this.negationFlag)
		{
			throw new Error('"throws" cannot be negated, use "returns" instead');
		}

		this.appendAction(
			(): void =>
			{
				if (!FluentAssertion.IsFunction(this.actualValue))
				{
					fail(`Expected ${this.name} to be a function`);
				}

				const MESSAGE: string = `Expected ${this.name} to throw`;

				throws(this.actualValue, createErrorPredicate(MESSAGE, predicate), MESSAGE);
			}
		);

		return this.createVoidAssertion();
	}

	/**
	 * Assert that the value will return when invoked
	 *
	 * @returns A new assertion for the returned value
	 *
	 * @throws if the value is not a function
	 * @throws if the value throws when invoked
	 */
	public get return(): FluentAssertion
	{
		if (this.negationFlag)
		{
			throw new Error('"returns" cannot be negated, use "throws" instead');
		}

		const ASSERTION: FluentAssertion = this.createAssertion("returned value");

		this.appendAction(
			(): void =>
			{
				const CALLABLE: unknown = this.actualValue;

				if (!FluentAssertion.IsFunction(CALLABLE))
				{
					fail(`Expected ${this.name} to be a function`);
				}

				let result: unknown = undefined;

				doesNotThrow(
					(): void =>
					{
						/* Retrieve the returned value */
						result = CALLABLE();
					},
					`Expected ${this.name} to return`
				);

				ASSERTION.setValue(result);
			}
		);

		return ASSERTION;
	}

	/**
	 * Assert that the value eventually rejects
	 *
	 * @returns A dead end assertion
	 *
	 * @throws if the value is not a Promise
	 * @throws if the promise is eventually fulfilled
	 * @throws if the promise rejection reason does not match the predicate
	 */
	public reject(predicate?: Error | RegExp | string | typeof Error): VoidAssertion
	{
		if (this.negationFlag)
		{
			throw new Error('"rejects" cannot be negated, use "fulfills" instead');
		}

		this.appendAction(
			async (): Promise<void> =>
			{
				if (!(this.actualValue instanceof Promise))
				{
					fail(`Expected ${this.name} to be a promise`);
				}

				const MESSAGE: string = `Expected ${this.name} to reject`;

				await rejects(this.actualValue, createErrorPredicate(MESSAGE, predicate), MESSAGE);
			}
		);

		return this.createVoidAssertion();
	}

	/**
	 * Assert that the value eventually fulfills
	 *
	 * @returns A new assertion with the promised value
	 *
	 * @throws if the value is not a Promise
	 * @throws if the value is eventually rejected
	 */
	public get fulfill(): FluentAssertion
	{
		if (this.negationFlag)
		{
			throw new Error('"fulfill" cannot be negated, use "reject" instead');
		}

		const ASSERTION: FluentAssertion = this.createAssertion("returned value");

		this.appendAction(
			async (): Promise<void> =>
			{
				if (!(this.actualValue instanceof Promise))
				{
					fail(`Expected ${this.name} to be a promise`);
				}

				await doesNotReject(this.actualValue, `Expected ${this.name} to fulfill`);

				ASSERTION.setValue(await this.actualValue);
			}
		);

		return ASSERTION;
	}

	/**
	 * Assert that the value is recursively similar to the expected value
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not recursively similar to the expected value
	 */
	public resemble(expected: unknown): this
	{
		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				if (flags.negation)
				{
					notDeepStrictEqual(this.actualValue, expected, `Expected ${this.name} to be different from the expected value`);

					return;
				}

				deepStrictEqual(this.actualValue, expected, `Expected ${this.name} to resemble the expected value`);
			}
		);

		return this;
	}

	/**
	 * Assert that the value is exactly the expected value
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not exactly the expected value
	 */
	public exactly(expected: unknown): this
	{
		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				if (flags.negation)
				{
					notStrictEqual(this.actualValue, expected, `Expected ${this.name} to be strictly different from the expected value`);

					return;
				}

				strictEqual(this.actualValue, expected, `Expected ${this.name} to be strictly equal to the expected value`);
			}
		);

		return this;
	}

	/**
	 * Assert that the value is undefined
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not undefined
	 */
	public get undefined(): this
	{
		return this.exactly(undefined);
	}

	/**
	 * Assert that the value is null
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not null
	 */
	public get null(): this
	{
		return this.exactly(null);
	}

	/**
	 * Assert that the value is NaN
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not NaN
	 */
	public get NaN(): this
	{
		return this.exactly(NaN);
	}

	/**
	 * Assert that the value is nullish
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not undefined, null, or NaN
	 */
	public get nullish(): this
	{
		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				const NULLISH_VALUES: Array<unknown> = [undefined, null, NaN];

				if (flags.negation)
				{
					if (NULLISH_VALUES.includes(this.actualValue))
					{
						const TYPE: string = getType(this.actualValue);

						fail(`Expected ${this.name} to not be undefined, null, or NaN, but got ${TYPE}`);
					}

					return;
				}

				if (!NULLISH_VALUES.includes(this.actualValue))
				{
					const TYPE: string = getType(this.actualValue);

					fail(`Expected ${this.name} to be undefined, null, or NaN, but got ${TYPE}`);
				}
			}
		);

		return this;
	}

	/**
	 * Assert that the value is not nullish
	 *
	 * @remarks
	 * - Alias of .not.nullish
	 *
	 * @throws if the value is undefined, null, or NaN
	 */
	public get defined(): this
	{
		return this.not.nullish;
	}

	/**
	 * Assert that the value is a boolean
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not a boolean
	 */
	public get boolean(): this
	{
		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				if (flags.negation)
				{
					if (typeof this.actualValue === "boolean")
					{
						fail(`Expected ${this.name} to not be a boolean`);
					}

					return;
				}

				if (typeof this.actualValue !== "boolean")
				{
					const TYPE: string = getType(this.actualValue);

					fail(`Expected ${this.name} to be a boolean, but got ${TYPE}`);
				}
			}
		);

		return this;
	}

	/**
	 * Assert that the value is false
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not false
	 */
	public get false(): this
	{
		return this.exactly(false);
	}

	/**
	 * Assert that the value is true
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not true
	 */
	public get true(): this
	{
		return this.exactly(true);
	}

	/**
	 * Assert that the value is a safe integer
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not a safe integer
	 */
	public get integer(): this
	{
		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				if (flags.negation)
				{
					if (Number.isSafeInteger(this.actualValue))
					{
						fail(`Expected ${this.name} to not be an integer`);
					}

					return;
				}

				if (!Number.isSafeInteger(this.actualValue))
				{
					const TYPE: string = getType(this.actualValue);

					fail(`Expected ${this.name} to be an integer, but got ${TYPE}`);
				}
			}
		);

		return this;
	}

	/**
	 * Assert that the value is a finite number
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not a finite number
	 */
	public get number(): this
	{
		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				if (flags.negation)
				{
					if (Number.isFinite(this.actualValue))
					{
						fail(`Expected ${this.name} to not be a finite number`);
					}

					return;
				}

				if (!Number.isFinite(this.actualValue))
				{
					const TYPE: string = getType(this.actualValue);

					fail(`Expected ${this.name} to be a finite number, but got ${TYPE}`);
				}
			}
		);

		return this;
	}

	/**
	 * Assert that the value is a mathematical value (a finite number or infinity)
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not a mathematical value
	 */
	public get mathematical(): this
	{
		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				if (flags.negation)
				{
					if (typeof this.actualValue === "number")
					{
						fail(`Expected ${this.name} to not be a number`);
					}

					return;
				}

				if (typeof this.actualValue !== "number" || Number.isNaN(this.actualValue))
				{
					const TYPE: string = getType(this.actualValue);

					fail(`Expected ${this.name} to be a number, but got ${TYPE}`);
				}
			}
		);

		return this;
	}

	/**
	 * Assert that the value is a bigint
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not a bigint
	 */
	public get bigint(): this
	{
		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				if (flags.negation)
				{
					if (typeof this.actualValue === "bigint")
					{
						fail(`Expected ${this.name} to not be a bigint`);
					}

					return;
				}

				if (typeof this.actualValue !== "bigint")
				{
					const TYPE: string = getType(this.actualValue);

					fail(`Expected ${this.name} to be a bigint, but got ${TYPE}`);
				}
			}
		);

		return this;
	}

	/**
	 * Assert that the value is less than the expected value
	 *
	 * @throws if the value is not a number nor a bigint
	 * @throws if the value is less than the expected value
	 */
	public below(max: bigint | number): this
	{
		if (this.negationFlag)
		{
			throw new Error('"below" cannot be negated, use "least" instead');
		}

		this.appendAction(
			(): void =>
			{
				if (typeof this.actualValue !== "number" && typeof this.actualValue !== "bigint")
				{
					fail(`Expected ${this.name} to be a number or a bigint`);
				}

				if (this.actualValue >= max)
				{
					fail(`Expected ${this.name} to be below ${max.toString()}`);
				}
			}
		);

		return this;
	}

	/**
	 * Assert that the value is greater than to the expected value
	 *
	 * @throws if the value is not a number nor a bigint
	 * @throws if the value is greater than to the expected value
	 */
	public above(min: bigint | number): this
	{
		if (this.negationFlag)
		{
			throw new Error('"above" cannot be negated, use "most" instead');
		}

		this.appendAction(
			(): void =>
			{
				if (typeof this.actualValue !== "number" && typeof this.actualValue !== "bigint")
				{
					fail(`Expected ${this.name} to be a number or a bigint`);
				}

				if (this.actualValue <= min)
				{
					fail(`Expected ${this.name} to be above ${min.toString()}`);
				}
			}
		);

		return this;
	}

	/**
	 * Assert that the value is at less than or equal to the expected value
	 *
	 * @throws if the value is not a number nor a bigint
	 * @throws if the value is less than or equal to the expected value
	 */
	public most(max: bigint | number): this
	{
		if (this.negationFlag)
		{
			throw new Error('"most" cannot be negated, use "above" instead');
		}

		this.appendAction(
			(): void =>
			{
				if (typeof this.actualValue !== "number" && typeof this.actualValue !== "bigint")
				{
					fail(`Expected ${this.name} to be a number or a bigint`);
				}

				if (this.actualValue > max)
				{
					fail(`Expected ${this.name} to be at most ${max.toString()}`);
				}
			}
		);

		return this;
	}

	/**
	 * Assert that the value is greater than or equal to the expected value
	 *
	 * @throws if the value is not a number nor a bigint
	 * @throws if the value is greater than or equal to the expected value
	 */
	public least(min: bigint | number): this
	{
		if (this.negationFlag)
		{
			throw new Error('"least" cannot be negated, use "below" instead');
		}

		this.appendAction(
			(): void =>
			{
				if (typeof this.actualValue !== "number" && typeof this.actualValue !== "bigint")
				{
					fail(`Expected ${this.name} to be a number or a bigint`);
				}

				if (this.actualValue <= min)
				{
					fail(`Expected ${this.name} to be at least ${min.toString()}`);
				}
			}
		);

		return this;
	}

	/**
	 * Assert that the value is a string
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not a string
	 */
	public get string(): this
	{
		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				if (flags.negation)
				{
					if (typeof this.actualValue === "string")
					{
						fail(`Expected ${this.name} to not be a string`);
					}

					return;
				}

				if (typeof this.actualValue !== "string")
				{
					const TYPE: string = getType(this.actualValue);

					fail(`Expected ${this.name} to be a string, but got ${TYPE}`);
				}
			}
		);

		return this;
	}

	/**
	 * Accessor for the value's length
	 *
	 * @returns A new assertion with the value's length
	 *
	 * @throws if the value is not a string
	 */
	public get length(): FluentAssertion
	{
		if (this.negationFlag)
		{
			throw new Error('"length" cannot be negated');
		}

		const ASSERTION: FluentAssertion = this.createAssertion("length");

		this.appendAction(
			(): void =>
			{
				if (typeof this.actualValue !== "string")
				{
					const TYPE: string = getType(this.actualValue);

					fail(`Expected ${this.name} to be a string, but got ${TYPE}`);
				}

				ASSERTION.setValue(this.actualValue.length);
			}
		);

		return ASSERTION;
	}

	/**
	 * Assert that the value match the pattern
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not a string
	 * @throws if the value does not match the pattern
	 */
	public match(pattern: RegExp): this
	{
		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				if (typeof this.actualValue !== "string")
				{
					const TYPE: string = getType(this.actualValue);

					fail(`Expected ${this.name} to be a string, but got ${TYPE}`);
				}

				if (flags.negation)
				{
					doesNotMatch(this.actualValue, pattern, `Expected ${this.name} to not match ${pattern.toString()}`);

					return;
				}

				match(this.actualValue, pattern, `Expected ${this.name} to match ${pattern.toString()}`);
			}
		);

		return this;
	}

	/**
	 * Assert that the value is a numerical string
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not a string
	 * @throws if the value is not a numerical string
	 */
	public get numerical(): this
	{
		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				const NUMERICAL_PATTERN: RegExp = /^-?(?:[1-9][0-9]*|0)(?:\.[0-9]+)?$/;

				if (typeof this.actualValue !== "string")
				{
					const TYPE: string = getType(this.actualValue);

					fail(`Expected ${this.name} to be a string, but got ${TYPE}`);
				}

				if (flags.negation)
				{
					doesNotMatch(this.actualValue, NUMERICAL_PATTERN, `Expected ${this.name} to not be a numerical string`);

					return;
				}

				match(this.actualValue, NUMERICAL_PATTERN, `Expected ${this.name} to be a numerical string`);
			}
		);

		return this;
	}

	/**
	 * Assert that the value is a stringified number
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not a stringified number
	 */
	public get UUID(): this
	{
		return this.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
	}

	public get UUIDv4(): this
	{
		return this.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
	}

	public get randomUUID(): this
	{
		return this.UUIDv4;
	}

	/**
	 * Assert that the value is an array
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not an array
	 */
	public get array(): this
	{
		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				if (flags.negation)
				{
					if (Array.isArray(this.actualValue))
					{
						fail(`Expected ${this.name} to not be an array`);
					}

					return;
				}

				if (!Array.isArray(this.actualValue))
				{
					const TYPE: string = getType(this.actualValue);

					fail(`Expected ${this.name} to be an array, but got ${TYPE}`);
				}
			}
		);

		return this;
	}

	/**
	 * Assert that the value is an array
	 *
	 * @remarks
	 * - The index is 0-based
	 *
	 * @returns A new assertion with the value at the index
	 *
	 * @throws if the value is not an array
	 * @throws if the value's length is less than the index
	 */
	public at(index: number): FluentAssertion
	{
		if (this.negationFlag)
		{
			throw new Error('"at" cannot be negated');
		}

		const ITEM_NAME: string = `item #${index.toString()}`;

		const ASSERTION: FluentAssertion = this.createAssertion(ITEM_NAME);

		this.appendAction(
			(): void =>
			{
				if (!Array.isArray(this.actualValue))
				{
					fail(`Expected ${this.name} to be an array`);
				}

				if (index >= this.actualValue.length)
				{
					fail(`Expected ${this.name} to have a at least ${(index + 1).toString()} items`);
				}

				ASSERTION.setValue(this.actualValue[index]);
			}
		);

		return ASSERTION;
	}

	/**
	 * Assert that the value is an object
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not an object
	 */
	public get object(): this
	{
		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				if (flags.negation)
				{
					if (FluentAssertion.IsObject(this.actualValue))
					{
						fail(`Expected ${this.name} to not be an object`);
					}

					return;
				}

				if (!FluentAssertion.IsObject(this.actualValue))
				{
					const TYPE: string = getType(this.actualValue);

					fail(`Expected ${this.name} to be an object, but got ${TYPE}`);
				}
			}
		);

		return this;
	}

	/**
	 * Assert that the value is extensible
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not extensible
	 */
	public get extensible(): this
	{
		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				if (flags.negation)
				{
					if (Object.isExtensible(this.actualValue))
					{
						fail(`Expected ${this.name} to not be extensible`);
					}

					return;
				}

				if (!Object.isExtensible(this.actualValue))
				{
					fail(`Expected ${this.name} to be extensible`);
				}
			}
		);

		return this;
	}

	/**
	 * Assert that the value is sealed
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not sealed
	 */
	public get sealed(): this
	{
		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				if (flags.negation)
				{
					if (Object.isSealed(this.actualValue))
					{
						fail(`Expected ${this.name} to not be sealed`);
					}

					return;
				}

				if (!Object.isSealed(this.actualValue))
				{
					fail(`Expected ${this.name} to be sealed`);
				}
			}
		);

		return this;
	}

	/**
	 * Assert that the value is frozen
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not frozen
	 */
	public get frozen(): this
	{
		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				if (flags.negation)
				{
					if (Object.isFrozen(this.actualValue))
					{
						fail(`Expected ${this.name} to not be frozen`);
					}

					return;
				}

				if (!Object.isFrozen(this.actualValue))
				{
					fail(`Expected ${this.name} to be frozen`);
				}
			}
		);

		return this;
	}

	/**
	 * Assert that the value is an instance of the expected class
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not an instance of the expected class
	 */
	public instanceOf(class_constructor: abstract new (...args: ReadonlyArray<unknown>) => object): this
	{
		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				if (flags.negation)
				{
					if (this.actualValue instanceof class_constructor)
					{
						fail(`Expected ${this.name} to not be an instance of ${class_constructor.name}`);
					}

					return;
				}

				if (!(this.actualValue instanceof class_constructor))
				{
					const TYPE: string = getType(this.actualValue);

					fail(`Expected ${this.name} to be an instance of ${class_constructor.name}, but got ${TYPE}`);
				}
			}
		);

		return this;
	}

	/**
	 * Assert that the value has the specified member (property or method)
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not an object
	 * @throws if the value does not have the expected member
	 */
	public member(key: string | symbol): this
	{
		let property_name: string = "";

		if (typeof key === "symbol")
		{
			property_name = `property ${key.toString()}`;
		}
		else
		{
			property_name = `property "${key}"`;
		}

		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				if (!FluentAssertion.IsObject(this.actualValue))
				{
					fail(`Expected ${this.name} to be an object`);
				}

				if (flags.negation)
				{
					if (key in this.actualValue)
					{
						fail(`Expected ${this.name} to not have a ${property_name}`);
					}

					return;
				}

				if (!(key in this.actualValue))
				{
					fail(`Expected ${property_name} to exist`);
				}
			}
		);

		return this;
	}

	/**
	 * Accessor for the specified property
	 *
	 * @returns a new assertion object for the property value
	 *
	 * @throws if the value is not an object
	 * @throws if the value does not have the expected property
	 */
	public property(key: string | symbol): FluentAssertion
	{
		if (this.negationFlag)
		{
			throw new Error('"property" cannot be negated');
		}

		let property_name: string = "";

		if (typeof key === "symbol")
		{
			property_name = `property ${key.toString()}`;
		}
		else
		{
			property_name = `property "${key}"`;
		}

		const ASSERTION: FluentAssertion = this.createAssertion(property_name);

		this.appendAction(
			(): void =>
			{
				if (!FluentAssertion.IsObject(this.actualValue))
				{
					fail(`Expected ${this.name} to be an object`);
				}

				if (!(key in this.actualValue))
				{
					fail(`Expected ${property_name} to exist`);
				}

				ASSERTION.setValue(Reflect.get(this.actualValue, key));
			}
		);

		return ASSERTION;
	}

	/**
	 * Assert that the value has been called
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not a SinonSpy
	 * @throws if the value has not been called
	 * @throws if the value has been called a different number of times thant the expected count
	 */
	public called(count?: number): this
	{
		if (count !== undefined && count < 0)
		{
			throw new RangeError("Call count must be a non-negative integer");
		}

		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				if (!FluentAssertion.IsSpy(this.actualValue))
				{
					fail(`Expected ${this.name} to be a spy`);
				}

				if (flags.negation)
				{
					if (count === undefined)
					{
						strictEqual(this.actualValue.called, false, `Expected ${this.name} to not have been called`);

						return;
					}

					notStrictEqual(this.actualValue.callCount, count, `Expected ${this.name} call count to be different than ${count.toString()}`);

					return;
				}

				if (count === undefined)
				{
					strictEqual(this.actualValue.called, true, `Expected ${this.name} to have been called at least once`);

					return;
				}

				strictEqual(this.actualValue.callCount, count, `Expected ${this.name} call count to be exactly ${count.toString()}`);
			}
		);

		return this;
	}

	/**
	 * Accessor for the specified call
	 *
	 * @remarks
	 * - The call number is 1-based
	 *
	 * @throws if the value is not a SinonSpy
	 * @throws if the value if the specified call does not exist
	 */
	public call(nth: number | "last"): FluentAssertion
	{
		if (this.negationFlag)
		{
			throw new Error('"call" cannot be negated');
		}

		if (nth !== "last" && (!Number.isSafeInteger(nth) || nth < 1))
		{
			throw new RangeError('Call number must be a positive integer or "last"');
		}

		let call_name: string = "last call";

		if (nth !== "last")
		{
			call_name = `call #${nth.toString()}`;
		}

		const ASSERTION: FluentAssertion = this.createAssertion(call_name);

		this.appendAction(
			(): void =>
			{
				if (!FluentAssertion.IsSpy(this.actualValue))
				{
					fail(`Expected ${this.name} to be a spy`);
				}

				if (nth === "last")
				{
					if (!this.actualValue.called)
					{
						fail(`Expected ${this.name} to have been called at least once`);
					}

					ASSERTION.setValue(this.actualValue.lastCall);

					return;
				}

				if (nth > this.actualValue.callCount)
				{
					fail(`Expected ${this.name} to have been called at least ${nth.toString()} times`);
				}

				ASSERTION.setValue(this.actualValue.getCall(nth - 1));
			}
		);

		return ASSERTION;
	}

	/**
	 * Accessor for the first call
	 *
	 * @remarks
	 * - Alias of call(1)
	 */
	public get firstCall(): FluentAssertion
	{
		return this.call(AssertionConstantEnum.FIRST_CALL);
	}

	/**
	 * Accessor for the second call
	 *
	 * @remarks
	 * - Alias of call(2)
	 */
	public get secondCall(): FluentAssertion
	{
		return this.call(AssertionConstantEnum.SECOND_CALL);
	}

	/**
	 * Accessor for the third call
	 *
	 * @remarks
	 * - Alias of call(3)
	 */
	public get thirdCall(): FluentAssertion
	{
		return this.call(AssertionConstantEnum.THIRD_CALL);
	}

	/**
	 * Accessor for the last call
	 *
	 * @remarks
	 * - Alias of call("last")
	 */
	public get lastCall(): FluentAssertion
	{
		return this.call("last");
	}

	/**
	 * Assert that the value has been called with the expected context
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not a SinonSpyCall
	 * @throws if the call thisValue is not exactly the expected context
	 */
	public context(thisArg: object | undefined): this
	{
		this.appendAction(
			(flags: AssertionFlagsInterface): void =>
			{
				if (!FluentAssertion.IsSpyCall(this.actualValue))
				{
					fail(`Expected ${this.name} to be a spy call`);
				}

				if (flags.negation)
				{
					notStrictEqual(this.actualValue.thisValue, thisArg, `Expected ${this.name} context to not be exactly the expected context`);

					return;
				}

				strictEqual(this.actualValue.thisValue, thisArg, `Expected ${this.name} context to be exactly the expected context`);
			}
		);

		return this;
	}

	/**
	 * Accessor for the call arguments
	 *
	 * @throws if the value is not a SinonSpyCall
	 * @throws if the call arguments do not resemble the expected arguments
	 */
	public get arguments(): FluentAssertion
	{
		if (this.negationFlag)
		{
			throw new Error('"arguments" cannot be negated');
		}

		const ASSERTION: FluentAssertion = this.createAssertion("arguments");

		this.appendAction(
			(): void =>
			{
				if (!FluentAssertion.IsSpyCall(this.actualValue))
				{
					fail(`Expected ${this.name} to be a spy call`);
				}

				ASSERTION.setValue(this.actualValue.args);
			}
		);

		return ASSERTION;
	}

	/**
	 * Chaining word
	 */
	public get a(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get an(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get the(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get will(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get be(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get is(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get are(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get was(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get been(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get have(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get has(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get do(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get does(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get did(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get to(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get of(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get that(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get which(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get and(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get but(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get still(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get also(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get with(): this
	{
		return this;
	}

	/**
	 * Chaining word
	 */
	public get value(): this
	{
		return this;
	}

	protected appendAction(action: (flags: AssertionFlagsInterface) => Promise<void> | void): void
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

	protected setValue(value: unknown): void
	{
		if (this.actualValue !== FluentAssertion.MISSING_VALUE)
		{
			throw new Error("Value already set");
		}

		Reflect.set(this, "actualValue", value);
	}

	protected createVoidAssertion(): VoidAssertion
	{
		return new VoidAssertion({
			root: this.root,
			parent: this,
		});
	}

	protected createAssertion(name: string): FluentAssertion
	{
		return new FluentAssertion({
			root: this.root,
			parent: this,
			name: this.buildName(name),
		});
	}

	protected buildName(suffix: string): string
	{
		if (this.name === "value")
		{
			return suffix;
		}

		return `${this.name} ${suffix}`;
	}
}

export { FluentAssertion };
