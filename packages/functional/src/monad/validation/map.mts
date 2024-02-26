import type { ValidationInterface } from "./definition/interface/validation.interface.mjs";
import { isValid } from "./is-valid.mjs";

function map<A>(callable: (content: A) => Error | undefined): (value: ValidationInterface<A>) => ValidationInterface<A>
{
	return (value: ValidationInterface<A>): ValidationInterface<A> =>
	{
		if (isValid(value))
		{
			const RESULT: Error | undefined = callable(value.content);

			if (RESULT === undefined)
			{
				return value;
			}

			return {
				content: value.content,
				errors: [RESULT],
			};
		}

		return value;
	};
}

export { map };
