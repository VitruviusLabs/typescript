import type { AbstractConstructorOf } from "../helper/definition/type/abstract-constructor-of.mjs";
import { isConstructor } from "../type-guard/is-constructor.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertConstructor<Type extends AbstractConstructorOf<object>>(value: unknown): asserts value is Type
{
	if (!isConstructor(value))
	{
		throw new ValidationError("The value must be a constructor.");
	}
}

export { assertConstructor };
