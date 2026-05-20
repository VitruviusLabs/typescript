import type { FluentAssertionInternal } from "../internal/_index.mjs";
import { AssertionConstantEnum } from "./definition/enum/assertion-constant.enum.mjs";
import { BaseAssertion, VoidAssertion } from "./_index.mjs";

import {
	fluent_above,
	fluent_arguments,
	fluent_array,
	fluent_at,
	fluent_below,
	fluent_bigint,
	fluent_boolean,
	fluent_call,
	fluent_called,
	fluent_context,
	fluent_exactly,
	fluent_extensible,
	fluent_frozen,
	fluent_fulfill,
	fluent_instance_of,
	fluent_integer,
	fluent_least,
	fluent_length,
	fluent_match,
	fluent_mathematical,
	fluent_member,
	fluent_most,
	fluent_nullish,
	fluent_number,
	fluent_numerical,
	fluent_object,
	fluent_property,
	fluent_reject,
	fluent_resemble,
	fluent_return,
	fluent_sealed,
	fluent_string,
	fluent_throw,
} from "../fluent/_index.mjs";

/* eslint-disable id-length */
/* eslint-disable accessor-pairs */
/* eslint-disable @ts/member-ordering */

/**
 * Fluent assertion
 *
 * @sealed
 */
class FluentAssertion<T extends FluentAssertionInternal = FluentAssertionInternal> extends BaseAssertion<T>
{
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
		this.internal.negate();

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
	public throw(predicate?: Error | RegExp | string | ErrorConstructor): VoidAssertion
	{
		return new VoidAssertion(fluent_throw(this.internal, predicate));
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
		return new FluentAssertion(fluent_return(this.internal));
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
		return new VoidAssertion(fluent_reject(this.internal, predicate));
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
		return new FluentAssertion(fluent_fulfill(this.internal));
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
		fluent_resemble(this.internal, expected);

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
		fluent_exactly(this.internal, expected);

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
		fluent_nullish(this.internal);

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
		fluent_boolean(this.internal);

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
		fluent_integer(this.internal);

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
		fluent_number(this.internal);

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
		fluent_mathematical(this.internal);

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
		fluent_bigint(this.internal);

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
		fluent_below(this.internal, max);

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
		fluent_above(this.internal, min);

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
		fluent_most(this.internal, max);

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
		fluent_least(this.internal, min);

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
		fluent_string(this.internal);

		return this;
	}

	/**
	 * Accessor for the value's length
	 *
	 * @remarks
	 * Works with strings, arrays, maps and sets
	 *
	 * @returns A new assertion with the value's length
	 *
	 * @throws if the value is not a string
	 */
	public get length(): FluentAssertion
	{
		return new FluentAssertion(fluent_length(this.internal));
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
		fluent_match(this.internal, pattern);

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
		fluent_numerical(this.internal);

		return this;
	}

	/**
	 * Assert that the value is an UUID
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not an UUID
	 */
	public get UUID(): this
	{
		return this.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
	}

	/**
	 * Assert that the value is an UUIDv4
	 *
	 * @remarks
	 * - Can be negated
	 *
	 * @throws if the value is not an UUIDv4
	 */
	public get UUIDv4(): this
	{
		return this.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
	}

	/**
	 * Assert that the value is a random UUID
	 *
	 * @remarks
	 * - Can be negated
	 * - Alias of UUIDv4
	 *
	 * @throws if the value is not a random UUID
	 */
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
		fluent_array(this.internal);

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
		return new FluentAssertion(fluent_at(this.internal, index));
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
		fluent_object(this.internal);

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
		fluent_extensible(this.internal);

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
		fluent_sealed(this.internal);

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
		fluent_frozen(this.internal);

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
		fluent_instance_of(this.internal, class_constructor);

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
		fluent_member(this.internal, key);

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
		return new FluentAssertion(fluent_property(this.internal, key));
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
		fluent_called(this.internal, count);

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
		return new FluentAssertion(fluent_call(this.internal, nth));
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
		fluent_context(this.internal, thisArg);

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
		return new FluentAssertion(fluent_arguments(this.internal));
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
}

export { FluentAssertion };
