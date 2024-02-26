import type { ValidationErrorsType } from "../type/validation-errors.type.mjs";

interface ValidationMatchInterface<A, B, C>
{
	ifInvalid: (errors: ValidationErrorsType) => B;
	ifValid: (content: A) => C;
}

export type { ValidationMatchInterface };
