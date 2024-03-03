import type { RecordConstraints, Test } from "../definition/_index.mjs";
import { toError } from "../helper/to-error.mjs";
import { isRecord as guard } from "../type-guard/is-record.mjs";
import { buildRecordConstraints } from "../utils/build-record-constraints.mjs";
import { itemAssertion } from "./utils/item-assertion.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function isRecord<Type>(value: unknown, constraints?: RecordConstraints<Type> | Test<Type>): asserts value is Record<string, Type>
{
	if (!guard(value))
	{
		throw new ValidationError("The value must be a record.");
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
						new ValidationError(
							`The property "${key}" has an incorrect value.`,
							[toError(error)]
						)
					);
				}
			}
		);

		if (ERRORS.length > 0)
		{
			throw new ValidationError("The value is a record, but some properties are incorrect.", ERRORS);
		}
	}
}

export { isRecord };
