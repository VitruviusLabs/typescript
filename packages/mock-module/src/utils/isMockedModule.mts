import { TypeGuard } from "@vitruvius-lab/ts-predicate";

function isMockedModule<MockType>(value: unknown, module_identifier: string): asserts value is MockType
{
	if (!TypeGuard.isObject(value))
	{
		throw new Error(`An error occurred when mocking ${module_identifier}`);
	}
}

export { isMockedModule };
