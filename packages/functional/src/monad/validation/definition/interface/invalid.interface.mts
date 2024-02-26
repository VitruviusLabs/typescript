import type { ValidationErrorsType } from "../type/validation-errors.type.mjs";
import type { ValidationInterface } from "./validation.interface.mjs";

interface InvalidInterface<A> extends ValidationInterface<A>
{
	readonly errors: ValidationErrorsType;
}

export type { InvalidInterface };
