import type { ValidationInterface } from "./definition/interface/validation.interface.mjs";
import { isValid } from "./is-valid.mjs";

function flatMap<A>(callable: (content: A) => ValidationInterface<A>): (value: ValidationInterface<A>) => ValidationInterface<A>
{
	return (value: ValidationInterface<A>): ValidationInterface<A> =>
	{
		if (isValid(value))
		{
			const RESULT: ValidationInterface<A> = callable(value.content);

			return {
				content: value.content,
				errors: [...RESULT.errors],
			};
		}

		return value;
	};
}

export { flatMap };
