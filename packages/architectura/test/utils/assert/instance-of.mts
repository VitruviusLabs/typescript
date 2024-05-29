import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";
import { doesNotThrow } from "node:assert";
import { assertInstanceOf } from "@vitruvius-labs/ts-predicate/type-assertion";
import { getDetailedType } from "@vitruvius-labs/ts-predicate/type-hint";

function instanceOf<T extends object>(value: unknown, expected: ConstructorOf<T>): asserts value is T
{
	doesNotThrow(
		(): void => { assertInstanceOf(value, expected); },
		`Expected value to be an instance of ${expected.name}, but instead got ${getDetailedType(value)}.`
	);
}

export { instanceOf };
