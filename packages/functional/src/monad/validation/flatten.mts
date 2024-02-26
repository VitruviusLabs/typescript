import type { ValidationInterface } from "./definition/interface/validation.interface.mjs";

function flatten<A>(value: ValidationInterface<ValidationInterface<A>>): ValidationInterface<A>
{
	return {
		content: value.content.content,
		errors: [...value.content.errors, ...value.errors],
	};
}

export { flatten };
