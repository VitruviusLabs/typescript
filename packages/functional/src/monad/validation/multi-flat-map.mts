import type { ValidationInterface } from "./definition/interface/validation.interface.mjs";
import { isValid } from "./is-valid.mjs";

function multiFlatMap<A>(callables: ReadonlyArray<(content: A) => ValidationInterface<A>>): (value: ValidationInterface<A>) => ValidationInterface<A>
{
	return (value: ValidationInterface<A>): ValidationInterface<A> =>
	{
		if (isValid(value))
		{
			const ERRORS: Array<Error> = [];

			callables.forEach(
				(callable: (content: A) => ValidationInterface<A>): void =>
				{
					const RESULT: ValidationInterface<A> = callable(value.content);

					ERRORS.push(...RESULT.errors);
				}
			);

			return {
				content: value.content,
				errors: ERRORS,
			};
		}

		return value;
	};
}

export { multiFlatMap };
