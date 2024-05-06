import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";

class ContextualStorage
{
	// eslint-disable-next-line @typescript-eslint/ban-types -- Generic constructor type
	private readonly contextualItems: Map<Function, unknown>;

	public constructor()
	{
		this.contextualItems = new Map();
	}

	public findContextualItem<T extends object>(dependent_class: ConstructorOf<T>): T | undefined
	{
		const VALUE: unknown = this.contextualItems.get(dependent_class);

		if (VALUE === undefined || VALUE instanceof dependent_class)
		{
			return VALUE;
		}

		throw new Error(`Invalid contextual ${dependent_class.name}.`);
	}

	public getContextualItem<T extends object>(dependent_class: ConstructorOf<T>): T
	{
		const VALUE: T | undefined = this.findContextualItem(dependent_class);

		if (VALUE === undefined)
		{
			throw new Error(`No contextual ${dependent_class.name} found.`);
		}

		return VALUE;
	}

	public setContextualItem<T extends object>(dependent_class: ConstructorOf<T>, dependent_object: T): void
	{
		this.contextualItems.set(dependent_class, dependent_object);
	}

	public removeContextualItem<T extends object>(dependent_class: ConstructorOf<T>): void
	{
		this.contextualItems.delete(dependent_class);
	}

	public clearContextualItems(): void
	{
		this.contextualItems.clear();
	}
}

export { ContextualStorage };
