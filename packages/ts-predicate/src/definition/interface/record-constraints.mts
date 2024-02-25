import type { Test } from "../type/test.mjs";

interface RecordConstraints<Type>
{
	itemTest?: Test<Type>;
}

export type { RecordConstraints };
