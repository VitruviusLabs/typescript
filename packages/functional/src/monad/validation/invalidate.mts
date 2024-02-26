import { convertIntoError } from "../../helper/convert-into-error.mjs";
import type { InvalidInterface } from "./definition/interface/invalid.interface.mjs";
import type { ValidationInterface } from "./definition/interface/validation.interface.mjs";

function invalidate<A>(value: ValidationInterface<A>, reason: Error | string): InvalidInterface<A>
{
	return {
		content: value.content,
		// @ts-expect-error: readonly
		errors: [...value.errors, convertIntoError(reason)],
	};
}

export { invalidate };
