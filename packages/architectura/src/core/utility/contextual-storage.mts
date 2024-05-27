import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";

/**
 * Contextual storage.
 *
 * @remarks
 * Meant to append and retrieve custom objects to ExecutionContext and Session.
 */
abstract class ContextualStorage
{
	// eslint-disable-next-line @typescript-eslint/ban-types -- Generic constructor type
	private readonly contextualItems: Map<Function, unknown>;

	public constructor()
	{
		this.contextualItems = new Map();
	}

	/**
	 * Get a contextual item if it exists.
	 *
	 * @remarks
	 * It shouldn't throw an error unless the storage has been tampered with
	 *
	 * @throws if the item does not inherit from the class.
	 */
	public findContextualItem<T extends object>(dependent_class: ConstructorOf<T>): T | undefined
	{
		const VALUE: unknown = this.contextualItems.get(dependent_class);

		if (VALUE === undefined || VALUE instanceof dependent_class)
		{
			return VALUE;
		}

		throw new Error(`Invalid contextual ${dependent_class.name}.`);
	}

	/**
	 * Get a contextual item.
	 *
	 * @throws if the item does not exist.
	 */
	public getContextualItem<T extends object>(dependent_class: ConstructorOf<T>): T
	{
		const VALUE: T | undefined = this.findContextualItem(dependent_class);

		if (VALUE === undefined)
		{
			throw new Error(`No contextual ${dependent_class.name} found.`);
		}

		return VALUE;
	}

	/**
	 * Set a contextual item.
	 *
	 * @throws if the item does not inherit from the class.
	 */
	public setContextualItem<T extends object>(dependent_class: ConstructorOf<T>, dependent_object: T): void
	{
		if (!(dependent_object instanceof dependent_class))
		{
			throw new Error(`The object must be a ${dependent_class.name}.`);
		}

		this.contextualItems.set(dependent_class, dependent_object);
	}

	/**
	 * Remove a contextual item.
	 */
	public removeContextualItem<T extends object>(dependent_class: ConstructorOf<T>): void
	{
		this.contextualItems.delete(dependent_class);
	}

	/**
	 * Clear all contextual items.
	 */
	public clearContextualItems(): void
	{
		this.contextualItems.clear();
	}
}

export { ContextualStorage };
