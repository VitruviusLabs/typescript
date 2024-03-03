import type { Test } from "../../definition/_index.mjs";
import { ValidationError } from "./validation-error.mjs";

function itemAssertion<Type>(value: unknown, callable: Test<Type>): asserts value is Type
{
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- assertion return undefined
	const SUCCESS: boolean = callable(value) ?? true;

	if (!SUCCESS)
	{
		throw new ValidationError("There is no information on why the value is incorrect.");
	}
}

export { itemAssertion };
