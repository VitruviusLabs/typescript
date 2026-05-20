import type { ErrorConstructorType } from "../definition/type/error-constructor.type.mjs";

function validateError(value: unknown, error_constructor: ErrorConstructorType): asserts value is Error
{
	if (!(value instanceof error_constructor))
	{
		throw new Error(`An instance of ${error_constructor.name} must be thrown.`);
	}

	if (value.message.length === 0)
	{
		throw new Error("An error must have a message.");
	}
}

export { validateError };
