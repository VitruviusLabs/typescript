import type { ValidationInterface } from "./definition/interface/validation.interface.mjs";
import type { ValidInterface } from "./definition/interface/valid.interface.mjs";

function isValid<A>(value: ValidationInterface<A>): value is ValidInterface<A>
{
	return Object.hasOwn(value, "content") && Object.hasOwn(value, "errors") && value.errors.length === 0;
}

export { isValid };
