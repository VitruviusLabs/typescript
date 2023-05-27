import { isArray as guard } from "../TypeGuard/isArray.mjs";

import { buildArrayConstraints } from "../utils/buildArrayConstraints.mjs";

import { buildError } from "./utils/buildError.mjs";

import { itemAssertion } from "./utils/itemAssertion.mjs";

import type { ArrayConstraints, Test } from "../types/_index.mjs";

function isArray<Type>(value: unknown, constraints?: ArrayConstraints<Type> | Test<Type>): asserts value is Array<Type>
{
	if (!guard(value))
	{
		throw new Error("The value is not an array.");
	}

	const CONSTRAINTS: ArrayConstraints<Type> | undefined = buildArrayConstraints(constraints);

	if (CONSTRAINTS === undefined)
	{
		return;
	}

	const ERRORS: Array<Error> = [];

	if (CONSTRAINTS.minLength !== undefined && value.length < CONSTRAINTS.minLength)
	{
		if (CONSTRAINTS.minLength === 1)
		{
			ERRORS.push(
				new Error("It must not be empty.")
			);
		}
		else
		{
			ERRORS.push(
				new Error(`It must have at least ${CONSTRAINTS.minLength.toFixed(0)} items.`)
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
					ERRORS.push(
						new Error(
							`The value at index ${index.toFixed(0)} is incorrect.`,
							{ cause: buildError(error) }
						)
					);
				}
			}
		);
	}

	if (ERRORS.length > 0)
	{
		throw new AggregateError(ERRORS, "The value is an array, but its content is incorrect.");
	}
}

export { isArray };
