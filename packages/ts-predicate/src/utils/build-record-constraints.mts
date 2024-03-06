import type { RecordConstraints } from "../definition/interface/record-constraints.mjs";
import type { Test } from "../definition/type/test.mjs";

function buildRecordConstraints<Type>(constraints: RecordConstraints<Type> | Test<Type> | undefined): RecordConstraints<Type> | undefined
{
	if (typeof constraints === "function")
	{
		return {
			itemTest: constraints,
		};
	}

	return constraints;
}

export { buildRecordConstraints };
