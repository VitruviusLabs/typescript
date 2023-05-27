import type { Test } from "./Test.mjs";

interface RecordConstraints<Type>
{
	itemTest?: Test<Type>;
}

export type { RecordConstraints };
