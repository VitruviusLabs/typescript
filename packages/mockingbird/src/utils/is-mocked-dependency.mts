import type { MockedDependency } from "../definition/interface/mocked-dependency.mjs";
import { isObject } from "@vitruvius-labs/ts-predicate";

function isMockedDependency(value: unknown, dependency_identifier: string): asserts value is MockedDependency
{
	if (!isObject(value))
	{
		throw new Error(`Invalid mocked module ${dependency_identifier}.`);
	}
}

export { isMockedDependency };
