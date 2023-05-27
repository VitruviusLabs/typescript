import type { RecordConstraints, Test } from "../index.mjs";

function buildRecordConstraints<Type>(constraints: RecordConstraints<Type> | Test<Type> | undefined): RecordConstraints<Type> | undefined
{
	if (typeof constraints === "function")
	{
		return {
			itemTest: constraints
		};
	}

	return constraints;
}

export { buildRecordConstraints };
