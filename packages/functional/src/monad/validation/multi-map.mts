import type { ValidationInterface } from "./definition/interface/validation.interface.mjs";
import { isValid } from "./is-valid.mjs";

function multiMap<A>(callables: ReadonlyArray<(content: A) => Error | undefined>): (value: ValidationInterface<A>) => ValidationInterface<A>
{
	return (value: ValidationInterface<A>): ValidationInterface<A> =>
	{
		if (isValid(value))
		{
			const ERRORS: Array<Error> = [];

			callables.forEach(
				(callable: (content: A) => Error | undefined): void =>
				{
					const RESULT: Error | undefined = callable(value.content);

					if (RESULT !== undefined)
					{
						ERRORS.push(RESULT);
					}
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

export { multiMap };
