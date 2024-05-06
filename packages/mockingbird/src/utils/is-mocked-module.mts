import { isObject } from "@vitruvius-labs/ts-predicate/type-guard";

function isMockedModule<MockType>(value: unknown, module_identifier: string): asserts value is MockType
{
	if (!isObject(value))
	{
		throw new Error(`An error occurred when mocking ${module_identifier}.`);
	}
}

export { isMockedModule };
