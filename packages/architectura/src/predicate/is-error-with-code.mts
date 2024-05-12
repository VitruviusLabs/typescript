import type { ErrorWithCodeInterface } from "../definition/interface/error-with-code.interface.mjs";
import { hasProperty, isString } from "@vitruvius-labs/ts-predicate/type-guard";

function isErrorWithCode(value: unknown): value is ErrorWithCodeInterface
{
	return value instanceof Error && hasProperty(value, "code", isString);
}

export { isErrorWithCode };
