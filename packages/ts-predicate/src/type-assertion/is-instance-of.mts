import type { ConstructorOf } from "../definition/_index.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function isInstanceOf<T extends object>(value: unknown, constructor_class: ConstructorOf<T>): asserts value is InstanceType<typeof constructor_class>
{
	if (!(value instanceof constructor_class))
	{
		throw new ValidationError(`The value is not an instance of ${constructor_class.name}.`);
	}
}

export { isInstanceOf };
