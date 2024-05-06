import { isObject } from "../type-guard/is-object.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertObject(value: unknown): asserts value is object
{
	if (!isObject(value))
	{
		throw new ValidationError("The value must be an object.");
	}
}

export { assertObject };
