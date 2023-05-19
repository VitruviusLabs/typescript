import type { StructuredDataPropertyDescriptor } from "../types/_index.mjs";

function isStructuredDataPropertyDescriptor(value: unknown, property_name: string): asserts value is StructuredDataPropertyDescriptor<unknown>
{
	if (typeof value !== "object" || value === null)
	{
		throw new Error(`There is an invalid property descriptor for "${property_name}".`);
	}
}

export { isStructuredDataPropertyDescriptor };
