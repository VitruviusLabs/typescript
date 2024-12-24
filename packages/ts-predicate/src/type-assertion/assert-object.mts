import { isObject } from "../type-guard/is-object.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertObject<Type>(value: Type): asserts value is Type & object
{
	if (!isObject(value))
	{
		throw new ValidationError("The value must be an object.");
	}
}

export { assertObject };
