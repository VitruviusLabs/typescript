import { randomUUID } from "node:crypto";

import { dummyDependency } from "./dummy-dependency.mjs";

function dummy()
{
	return dummyDependency(randomUUID());
}

export { dummy };
