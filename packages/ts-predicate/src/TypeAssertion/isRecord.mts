import { isRecord as guard } from "../TypeGuard/isRecord.mjs";

import { buildError } from "./utils/buildError.mjs";

import { itemAssertion } from "./utils/itemAssertion.mjs";

import type { Test } from "../types/_index.mjs";

function isRecord<Type>(value: unknown, item_test?: Test<Type>): asserts value is Record<string, Type>
{
	if (!guard(value))
	{
		throw new Error("The value must be a record.");
	}

	if (item_test !== undefined && !Object.values(value).every(item_test))
	{
		const ERRORS: Array<Error> = [];

		Object.keys(value).forEach(
			(key: string): void =>
			{
				try
				{
					const VALUE: unknown = value[key];

					itemAssertion(VALUE, item_test);
				}
				catch (error: unknown)
				{
					ERRORS.push(
						new Error(
							`The property "${key}" has an incorrect value.`,
							{ cause: buildError(error) }
						)
					);
				}
			}
		);

		if (ERRORS.length > 0)
		{
			throw new AggregateError(ERRORS, "The value is a record, but some properties are incorrect.");
		}
	}
}

export { isRecord };
