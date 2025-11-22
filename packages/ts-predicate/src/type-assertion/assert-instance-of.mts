import type { AbstractConstructorOf } from "../helper/definition/type/abstract-constructor-of.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertInstanceOf<T extends object>(value: unknown, constructor_class: AbstractConstructorOf<T>): asserts value is T
{
	if (!(value instanceof constructor_class))
	{
		throw new ValidationError(`The value must be an instance of ${constructor_class.name}.`);
	}
}

export { assertInstanceOf };
