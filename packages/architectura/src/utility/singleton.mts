import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";

// eslint-disable-next-line @typescript-eslint/ban-types -- Generic constructor
const INSTANCES: Map<Function, object> = new Map();

/**
 * A singleton class that can only be instantiated once.
 *
 * @remarks
 * This class is a base class for singletons. It ensures that a class can only be
 * instantiated once. It also provides a method to get the instance of a singleton
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
 * MySingleton.Remove(MySingleton); // Clears the instance
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
	 * This method returns a boolean if the instance of a singleton class exists.
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
	 * if (!MySingleton.HasInstance(MySingleton))
	 * {
	 *     new MySingleton();
	 * }
	 *
	 * const instance = MySingleton.GetInstance(MySingleton)
	 * ```
	 *
	 * @param class_constructor - The constructor of the singleton class.
	 * @returns true if the instance of the singleton class exists, false otherwise.
	 */
	public static HasInstance<T extends Singleton>(class_constructor: ConstructorOf<T>): boolean
	{
		const INSTANCE: object | undefined = INSTANCES.get(class_constructor);

		return INSTANCE instanceof class_constructor;
	}

	/**
	 * Retrieve the instance of a singleton class.
	 *
	 * @sealed
	*
	 * @remarks
	 * This method returns the instance of a singleton class.
	 * If the class has not been instantiated yet, throws an error.
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
	 * @throws If the instance doesn't exist.
	 */
	public static GetInstance<T extends Singleton>(class_constructor: ConstructorOf<T>): T
	{
		const INSTANCE: object | undefined = INSTANCES.get(class_constructor);

		if (INSTANCE instanceof class_constructor)
		{
			return INSTANCE;
		}

		if (class_constructor.name === "")
		{
			throw new Error("No instance found");
		}

		throw new Error(`No instance of ${class_constructor.name} found`);
	}

	/**
	 * Retrieve the instance of a singleton class.
	 *
	 * @sealed
	*
	 * @remarks
	 * This method returns the instance of a singleton class.
	 * If the class has not been instantiated yet, it returns undefined.
	 *
	 * @param class_constructor - The constructor of the singleton class.
	 * @returns The instance of the singleton class, or undefined if it doesn't exists.
	 */
	public static FindInstance<T extends Singleton>(class_constructor: ConstructorOf<T>): T | undefined
	{
		const INSTANCE: object | undefined = INSTANCES.get(class_constructor);

		if (INSTANCE instanceof class_constructor)
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
	 * MySingleton.RemoveInstance(MySingleton);
	 *
	 * const instance2 = MySingleton.GetInstance(MySingleton); // Returns undefined
	 * ```
	 *
	 * @param class_constructor - The constructor of the singleton class.
	 */
	public static RemoveInstance<T extends Singleton>(class_constructor: ConstructorOf<T>): void
	{
		INSTANCES.delete(class_constructor);
	}
}

export { Singleton };
