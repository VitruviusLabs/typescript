import type { ArrayConstraints, Test } from "../definition/_index.mjs";
import { isArray } from "../type-guard/is-array.mjs";
import { buildArrayConstraints } from "../utils/build-array-constraints.mjs";
import { itemAssertion } from "./utils/item-assertion.mjs";
import { ValidationError } from "./utils/validation-error.mjs";
import { rethrowUnexpectedError } from "../utils/rethrow-unexpected-error.mjs";

function assertArray<Type>(value: unknown, constraints?: ArrayConstraints<Type> | Test<Type>): asserts value is Array<Type>
{
	const CONSTRAINTS: ArrayConstraints<Type> | undefined = buildArrayConstraints(constraints);

	if (!isArray(value))
	{
		throw new ValidationError("The value is not an array.");
	}

	if (CONSTRAINTS === undefined)
	{
		return;
	}

	const ERRORS: Array<ValidationError> = [];

	if (CONSTRAINTS.minLength !== undefined && value.length < CONSTRAINTS.minLength)
	{
		if (CONSTRAINTS.minLength === 1)
		{
			ERRORS.push(
				new ValidationError("It must not be empty.")
			);
		}
		else
		{
			ERRORS.push(
				new ValidationError(`It must have at least ${CONSTRAINTS.minLength.toFixed(0)} items.`)
			);
		}
	}

	if (CONSTRAINTS.itemTest !== undefined)
	{
		const GUARD: Test<Type> = CONSTRAINTS.itemTest;

		value.forEach(
			(item: unknown, index: number): void =>
			{
				try
				{
					itemAssertion(item, GUARD);
				}
				catch (error: unknown)
				{
					rethrowUnexpectedError(error);

					ERRORS.push(
						new ValidationError(
							`The value at index ${index.toFixed(0)} is incorrect.`,
							[error]
						)
					);
				}
			}
		);
	}

	if (ERRORS.length > 0)
	{
		throw new ValidationError("The value is an array, but its content is incorrect.", ERRORS);
	}
}

export { assertArray };
