import { isObject as guard } from "../type-guard/is-object.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function isObject(value: unknown): asserts value is object
{
	if (!guard(value))
	{
		throw new ValidationError("The value must be an object.");
	}
}

export { isObject };
