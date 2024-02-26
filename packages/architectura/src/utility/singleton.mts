import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";

// eslint-disable-next-line @typescript-eslint/ban-types -- Class constructors are of Function type is TypeScript. This is an exception to the global rule.
const INSTANCES: Map<Function, object> = new Map();

/**
 * A singleton class that can only be instanciated once.
 *
 * @remarks
 *
 * This class is a base class for singletons. It ensures that a class can only be
 * instanciated once. It also provides a method to get the instance of a singleton
 * class.
 *
 * @example
 * ```typescript
 * class MySingleton extends Singleton
 * {
 *     public constructor()
 *     {
 *         super();
 *     }
 * }
 *
 * const instance = new MySingleton();
 * const instance2 = new MySingleton(); // Throws an error
 *
 * const instance3 = MySingleton.GetInstance(MySingleton); // Returns instance
 *
 * MySingleton.Clear(MySingleton); // Clears the instance
 *
 * const instance4 = MySingleton.GetInstance(MySingleton); // Returns undefined
 * ```
 */
abstract class Singleton
{
	public constructor()
	{
		if (INSTANCES.has(this.constructor))
		{
			throw new Error("Already instanciated once");
		}

		INSTANCES.set(this.constructor, this);
	}

	/**
	 * Gets the instance of a singleton class.
	 *
	 * @remarks
	 *
	 * This method returns the instance of a singleton class. If the class has not been
	 * instanciated yet, it returns undefined.
	 *
	 * @example
	 * ```typescript
	 * class MySingleton extends Singleton
	 * {
	 *      public constructor()
	 *      {
	 *          super();
	 *      }
	 * }
	 *
	 * const instance = new MySingleton();
	 *
	 * const instance2 = MySingleton.GetInstance(MySingleton); // Returns instance
	 * ```
	 *
	 * @param class_constructor - The constructor of the singleton class.
	 * @returns The instance of the singleton class.
	 */
	public static GetInstance<T extends Singleton>(class_constructor: ConstructorOf<T>): T | undefined
	{
		// @ts-expect-error: the value has to be an instance of the constructor
		return INSTANCES.get(class_constructor);
	}

	/**
	 * Clears the instance of a singleton class.
	 *
	 * @remarks
	 *
	 * This method clears the instance of a singleton class. It removes the instance from
	 * the internal map.
	 *
	 * @example
	 * ```typescript
	 * class MySingleton extends Singleton
	 * {
	 *     public constructor()
	 *     {
	 *         super();
	 *     }
	 * }
	 *
	 * const instance = new MySingleton();
	 *
	 * MySingleton.Clear(MySingleton);
	 *
	 * const instance2 = MySingleton.GetInstance(MySingleton); // Returns undefined
	 * ```
	 *
	 * @param class_constructor - The constructor of the singleton class.
	 **/
	public static Clear<T extends Singleton>(class_constructor: ConstructorOf<T>): void
	{
		INSTANCES.delete(class_constructor);
	}
}

export { Singleton };
