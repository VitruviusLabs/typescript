import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";

// eslint-disable-next-line @ts/no-unsafe-function-type -- TypeScript type the constructor property as Function
const INSTANCES: Map<Function, Singleton> = new Map();

/**
 * A singleton class that can only be instantiated once.
 *
 * @remarks
 * This class is a base class for singletons. It ensures that a class can only be instantiated once.
 * It also provides methods to get the instance of a singleton class.
 *
 * @example
 * ```typescript
 * class MySingleton extends Singleton {}
 *
 * new MySingleton();
 * ```
 */
abstract class Singleton
{
	public constructor()
	{
		if (INSTANCES.has(this.constructor))
		{
			throw new Error("Already instantiated once.");
		}

		INSTANCES.set(this.constructor, this);
	}

	/**
	 * Test if there is an instance of a singleton class.
	 *
	 * @sealed
	 *
	 * @remarks
	 * This method returns a boolean if the instance of a singleton class exists in the internal registry.
	 *
	 * @example
	 * ```typescript
	 * if (!MySingleton.HasInstance())
	 * {
	 *     new MySingleton();
	 * }
	 * ```
	 *
	 * @returns true if the instance of the singleton class exists, false otherwise.
	 */
	public static HasInstance<T extends Singleton>(this: ConstructorOf<T>): boolean
	{
		return INSTANCES.has(this);
	}

	/**
	 * Retrieve the instance of a singleton class.
	 *
	 * @sealed
	 *
	 * @remarks
	 * This method returns the instance of a singleton class from the internal registry.
	 * If the class is not found in the internal registry, throws an error.
	 *
	 * @example
	 * ```typescript
	 * const instance = MySingleton.GetInstance();
	 * ```
	 *
	 * @returns The instance of the singleton class.
	 * @throws If the instance cannot be found.
	 */
	public static GetInstance<T extends Singleton>(this: ConstructorOf<T>): T
	{
		const INSTANCE: object | undefined = INSTANCES.get(this);

		if (INSTANCE instanceof this)
		{
			return INSTANCE;
		}

		if (this.name === "")
		{
			throw new Error("No instance exist.");
		}

		throw new Error(`No instance of ${this.name} exist.`);
	}

	/**
	 * Retrieve the instance of a singleton class.
	 *
	 * @sealed
	 *
	 * @remarks
	 * This method returns the instance of a singleton class.
	 * If no instance is found in the internal registry, it returns undefined.
	 *
	 * @example
	 * ```typescript
	 * const instance = MySingleton.FindInstance();
	 * ```
	 *
	 * @returns The instance of the singleton class, or undefined if it doesn't exists.
	 */
	public static FindInstance<T extends Singleton>(this: ConstructorOf<T>): T | undefined
	{
		const INSTANCE: object | undefined = INSTANCES.get(this);

		if (INSTANCE instanceof this)
		{
			return INSTANCE;
		}

		return undefined;
	}

	/**
	 * Clears the instance of a singleton class.
	 *
	 * @sealed
	 *
	 * @remarks
	 * This method remove the instance of a singleton class from the internal registry.
	 *
	 * @example
	 * ```typescript
	 * MySingleton.RemoveInstance();
	 *
	 * const instance2 = MySingleton.GetInstance(); // Throw an error
	 * ```
	 *
	 */
	public static RemoveInstance<T extends Singleton>(this: ConstructorOf<T>): void
	{
		INSTANCES.delete(this);
	}
}

export { Singleton };
