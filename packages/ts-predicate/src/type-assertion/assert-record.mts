import type { RecordConstraints, Test } from "../definition/_index.mjs";
import { isRecord } from "../type-guard/is-record.mjs";
import { buildRecordConstraints } from "../utils/build-record-constraints.mjs";
import { rethrowUnexpectedError } from "../utils/rethrow-unexpected-error.mjs";
import { itemAssertion } from "./utils/item-assertion.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertRecord<Type>(value: unknown, constraints?: RecordConstraints<Type> | Test<Type>): asserts value is Record<string, Type>
{
	if (!isRecord(value))
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
		const ERRORS: Array<ValidationError> = [];

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
					rethrowUnexpectedError(error);

					ERRORS.push(
						new ValidationError(
							`The property "${key}" has an incorrect value.`,
							[error]
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

export { assertRecord };
