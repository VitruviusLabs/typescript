import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";

class GlobalCustomRegistry
{
	// eslint-disable-next-line @typescript-eslint/ban-types -- Generic constructor type
	private static readonly REGISTRY: Map<Function, WeakMap<object, object>> = new Map();

	private constructor() {}

	public static Get<T extends object>(class_constructor: ConstructorOf<T>, related_object: object): T | undefined
	{
		const MAP: WeakMap<object, object> | undefined = this.REGISTRY.get(class_constructor);

		if (MAP === undefined)
		{
			return undefined;
		}

		const VALUE: object | undefined = MAP.get(related_object);

		if (VALUE === undefined || VALUE instanceof class_constructor)
		{
			return VALUE;
		}

		throw new Error("Invalid value in registry.");
	}

	public static Set<T extends object>(class_constructor: ConstructorOf<T>, related_object: object, value: T): void
	{
		let map: WeakMap<object, object> | undefined = this.REGISTRY.get(class_constructor);

		if (map === undefined)
		{
			map = new WeakMap();
			this.REGISTRY.set(class_constructor, map);
		}

		map.set(related_object, value);
	}
}

export { GlobalCustomRegistry };
