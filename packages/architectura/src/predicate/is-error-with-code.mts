import type { ErrorWithCodeInterface } from "../definition/interface/error-with-code.interface.mjs";
import { hasProperty, isString } from "@vitruvius-labs/ts-predicate/type-guard";

/**
 * NodeJS uses the base Error class to represent errors.,
 * Identify such errors with a code property for TypeScript to allow accessing the code.
 */
function isErrorWithCode(value: unknown): value is ErrorWithCodeInterface
{
	return value instanceof Error && hasProperty(value, "code", isString);
}

export { isErrorWithCode };
