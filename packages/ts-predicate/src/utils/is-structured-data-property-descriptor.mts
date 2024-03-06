import type { StructuredDataPropertyDescriptor } from "../definition/interface/structured-data-property-descriptor.mjs";
import { isRecord } from "../type-guard/is-record.mjs";

function isStructuredDataPropertyDescriptor(value: unknown, property_name: string): asserts value is StructuredDataPropertyDescriptor<unknown>
{
	if (!isRecord(value))
	{
		throw new Error(`There is an invalid property descriptor for "${property_name}".`);
	}
}

export { isStructuredDataPropertyDescriptor };
