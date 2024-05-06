import type { Test } from "../definition/type/test.mjs";
import { itemAssertion } from "./utils/item-assertion.mjs";
import { ValidationError } from "./utils/validation-error.mjs";
import { rethrowUnexpectedError } from "../utils/rethrow-unexpected-error.mjs";

function assertUnion<T1, T2>(value: unknown, tests: [Test<T1>, Test<T2>]): asserts value is T1 | T2;
function assertUnion<T1, T2, T3>(value: unknown, tests: [Test<T1>, Test<T2>, Test<T3>]): asserts value is T1 | T2 | T3;
function assertUnion<T1, T2, T3, T4>(value: unknown, tests: [Test<T1>, Test<T2>, Test<T3>, Test<T4>]): asserts value is T1 | T2 | T3 | T4;
function assertUnion<T1, T2, T3, T4, T5>(value: unknown, tests: [Test<T1>, Test<T2>, Test<T3>, Test<T4>, Test<T5>]): asserts value is T1 | T2 | T3 | T4 | T5;

function assertUnion(value: unknown, tests: Array<Test<unknown>>): asserts value is unknown
{
	const errors: Array<ValidationError> = [];

	for (const test of tests)
	{
		try
		{
			itemAssertion(value, test);
		}
		catch (error: unknown)
		{
			rethrowUnexpectedError(error);

			errors.push(error);
		}
	}

	if (errors.length === tests.length)
	{
		throw new ValidationError("The value does not match any of the types.", errors);
	}
}

export { assertUnion };
