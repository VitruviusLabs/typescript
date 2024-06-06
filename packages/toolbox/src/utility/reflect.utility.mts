import { getConstructorOf } from "@vitruvius-labs/ts-predicate/helper";
import { assertFunction, assertNullableProperty } from "@vitruvius-labs/ts-predicate/type-assertion";

class ReflectUtility
{
	/**
	 * @return the property's value
	 * @throws if the property doesn't exist
	 */
	public static Get(target: object, key: string): unknown
	{
		assertNullableProperty(target, key);

		return Reflect.get(target, key);
	}

	/**
	 * Set the property's value
	 *
	 * @return if the property was set successfully or not
	 * @throws if the property doesn't exist
	 */
	public static Set(target: object, key: string, value: unknown): boolean
	{
		assertNullableProperty(target, key);

		return Reflect.set(target, key, value);
	}

	/**
	 * Call the method with the given arguments
	 *
	 * @return the returned value
	 * @throws if the member doesn't exist or is not a function
	 */
	public static Call(target: object, key: string, ...args: Array<unknown>): unknown
	{
		return ReflectUtility.Apply(target, key, args);
	}

	/**
	 * Call the method with the given arguments
	 *
	 * @return the returned value
	 * @throws if the member doesn't exist or is not a function
	 */
	public static Apply(target: object, key: string, args: Array<unknown>): unknown
	{
		const CALLABLE: unknown = ReflectUtility.Get(target, key);

		assertFunction(CALLABLE);

		return CALLABLE.apply(target, args);
	}

	/**
	 * @return the constructor's property's value
	 * @throws if the static property doesn't exist
	 */
	public static StaticGet(target: object, key: string): unknown
	{
		const CONSTRUCTOR: typeof Object = getConstructorOf(target);

		assertNullableProperty(CONSTRUCTOR, key);

		return Reflect.get(CONSTRUCTOR, key);
	}

	/**
	 * Set the constructor's property's value
	 *
	 * @return if the static property was set successfully or not
	 * @throws if the static property doesn't exist
	 */
	public static StaticSet(target: object, key: string, value: unknown): boolean
	{
		const CONSTRUCTOR: typeof Object = getConstructorOf(target);

		assertNullableProperty(CONSTRUCTOR, key);

		return Reflect.set(CONSTRUCTOR, key, value);
	}

	/**
	 * Call the constructor's method with the given arguments
	 *
	 * @return the returned value
	 * @throws if the static member doesn't exist or is not a function
	 */
	public static StaticCall(target: object, key: string, ...args: Array<unknown>): unknown
	{
		return ReflectUtility.StaticApply(target, key, args);
	}

	/**
	 * Call the constructor's method with the given arguments
	 *
	 * @return the returned value
	 * @throws if the static member doesn't exist or is not a function
	 */
	public static StaticApply(target: object, key: string, args: Array<unknown>): unknown
	{
		const CONSTRUCTOR: typeof Object = getConstructorOf(target);

		const CALLABLE: unknown = ReflectUtility.Get(CONSTRUCTOR, key);

		assertFunction(CALLABLE);

		return CALLABLE.apply(CONSTRUCTOR, args);
	}
}

export { ReflectUtility };
