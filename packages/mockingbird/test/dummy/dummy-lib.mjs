import { randomUUID } from "node:crypto";

import { dummyDependency } from "./dummyDependency.mjs";

function dummy()
{
	return dummyDependency(randomUUID());
}

export { dummy };
