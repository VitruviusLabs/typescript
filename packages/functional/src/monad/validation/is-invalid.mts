import type { InvalidInterface } from "./definition/interface/invalid.interface.mjs";
import type { ValidationInterface } from "./definition/interface/validation.interface.mjs";

function isInvalid<A>(value: ValidationInterface<A>): value is InvalidInterface<A>
{
	return Object.hasOwn(value, "content") && Object.hasOwn(value, "errors") && value.errors.length > 0;
}

export { isInvalid };
