import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";
import { fail } from "node:assert";
import { isInstanceOf } from "@vitruvius-labs/ts-predicate/type-guard";
import { getDetailedType } from "@vitruvius-labs/ts-predicate/type-hint";

function instanceOf<T extends object>(value: unknown, expected: ConstructorOf<T>): asserts value is T
{
	if (!isInstanceOf(value, expected))
	{
		fail(`Expected value to be an instance of ${expected.name}, but instead got ${getDetailedType(value)}.`);
	}
}

export { instanceOf };
