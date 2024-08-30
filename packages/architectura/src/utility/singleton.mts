import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";

// eslint-disable-next-line @ts/no-unsafe-function-type -- Generic constructor
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
	 * This method returns a boolean if the instance of a singleton class exists in the internal registry.
	 * It takes a constructor as parameter for consistency with GetInstance and FindInstance.
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
	 * This method returns the instance of a singleton class from the internal registry.
	 * If the class is not found in the internal registry, throws an error.
	 * It takes a constructor as parameter because of a TypeScript typing limitation.
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
	 * @throws If the instance cannot be found.
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
	 * If no instance is found in the internal registry, it returns undefined.
	 * It takes a constructor as parameter because of a TypeScript typing limitation.
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
	 * This method remove the instance of a singleton class from the internal registry.
	 * It takes a constructor as parameter for consistency with GetInstance and FindInstance.
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
