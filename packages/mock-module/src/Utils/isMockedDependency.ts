import { TypeGuard } from "@vitruvius-lab/ts-predicate";

import type { MockedModule } from "../Type/MockedModule.js";

function isMockedDependency(value: unknown): value is MockedModule
{
	return TypeGuard.isRecord(value);
}

export { isMockedDependency };
