import type { Test } from "../../definition/_index.mjs";
import { ValidationError } from "./validation-error.mjs";

/** @internal */
function itemAssertion<Type>(value: unknown, callable: Test<Type>): asserts value is Type
{
	const SUCCESS: boolean = callable(value) ?? true;

	if (!SUCCESS)
	{
		throw new ValidationError("There is no information on why the value is incorrect.");
	}
}

export { itemAssertion };
