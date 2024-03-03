import type { StructuredDataPropertyDescriptor } from "../definition/_index.mjs";
import { TypeGuard } from "../index.mjs";

function isStructuredDataPropertyDescriptor(value: unknown, property_name: string): asserts value is StructuredDataPropertyDescriptor<unknown>
{
	if (!TypeGuard.isRecord(value))
	{
		throw new Error(`There is an invalid property descriptor for "${property_name}".`);
	}
}

export { isStructuredDataPropertyDescriptor };
