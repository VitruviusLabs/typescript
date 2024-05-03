import type { Test } from "../definition/type/test.mjs";
import type { StructuredDataDescriptor } from "../definition/interface/structured-data-descriptor.mjs";
import type { StructuredDataPropertyDescriptor } from "../definition/type/structured-data-property-descriptor.mjs";

function getStructuredDataPropertyDescriptor<Type>(descriptor: StructuredDataDescriptor<Type> | Test<NonNullable<Type>>, key: string): StructuredDataPropertyDescriptor<unknown>
{
	// @ts-expect-error: Key mapping
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- It is safe
	const property_descriptor: StructuredDataPropertyDescriptor<unknown> = descriptor[key];

	if (typeof property_descriptor === "function")
	{
		return {
			test: property_descriptor,
		};
	}

	return property_descriptor;
}

export { getStructuredDataPropertyDescriptor };
