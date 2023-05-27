import { isRecord as guard } from "../TypeGuard/isRecord.mjs";

import { buildRecordConstraints } from "../utils/buildRecordConstraints.mjs";

import { buildError } from "./utils/buildError.mjs";

import { itemAssertion } from "./utils/itemAssertion.mjs";

import type { RecordConstraints, Test } from "../types/_index.mjs";

function isRecord<Type>(value: unknown, constraints?: RecordConstraints<Type> | Test<Type>): asserts value is Record<string, Type>
{
	if (!guard(value))
	{
		throw new Error("The value must be a record.");
	}

	const CONSTRAINTS: RecordConstraints<Type> | undefined = buildRecordConstraints(constraints);

	if (CONSTRAINTS === undefined)
	{
		return;
	}

	if (CONSTRAINTS.itemTest !== undefined)
	{
		const ERRORS: Array<Error> = [];

		const GUARD: Test<Type> = CONSTRAINTS.itemTest;

		Object.keys(value).forEach(
			(key: string): void =>
			{
				try
				{
					const VALUE: unknown = value[key];

					itemAssertion(VALUE, GUARD);
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
