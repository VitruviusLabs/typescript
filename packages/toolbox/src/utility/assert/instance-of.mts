import { fail } from "node:assert";
import { type ConstructorOf, getDetailedType, isInstanceOf } from "@vitruvius-labs/ts-predicate";

/**
 * Asserts that a value is an instance of the expected class.
 */
function instanceOf<T extends object>(value: unknown, expected: ConstructorOf<T>): asserts value is T
{
	if (!isInstanceOf(value, expected))
	{
		fail(`Expected value to be an instance of ${expected.name}, but instead got ${getDetailedType(value)}.`);
	}
}

export { instanceOf };
