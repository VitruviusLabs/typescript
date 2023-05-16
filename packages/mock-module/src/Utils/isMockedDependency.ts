import { TypeGuard } from "@vitruvius-lab/ts-predicate";

import type { MockedDependency } from "../Type/MockedDependency.js";

function isMockedDependency(value: unknown, dependency_identifier: string): asserts value is MockedDependency
{
	if (!TypeGuard.isObject(value))
	{
		throw new Error(`Invalid mocked module ${dependency_identifier}`);
	}
}

export { isMockedDependency };
