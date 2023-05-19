function testError(value: unknown): true
{
	if (!(value instanceof Error))
	{
		throw new Error("It must throw an instance of Error.");
	}

	if (value.message.length === 0)
	{
		throw new Error("An Error message must not be empty.");
	}

	return true;
}

function testErrorWithCause(value: unknown): true
{
	if (!(value instanceof Error))
	{
		throw new Error("It must throw an instance of Error.");
	}

	if (value.message.length === 0)
	{
		throw new Error("An Error message must not be empty.");
	}

	if (value.cause === undefined)
	{
		throw new Error("It must have a cause.");
	}

	if (!(value.cause instanceof Error))
	{
		throw new Error("The cause must be an instance of Error.");
	}

	if (value.cause.message.length === 0)
	{
		throw new Error("An Error message must not be empty.");
	}

	return true;
}

function testAggregateError(value: unknown): true
{
	if (!(value instanceof AggregateError))
	{
		throw new Error("It must throw an instance of AggregateError.");
	}

	if (value.message.length === 0)
	{
		throw new Error("An Error message must not be empty.");
	}

	if (value.errors.length === 0)
	{
		throw new Error("An AggregateError must have errors.");
	}

	return true;
}

export { testAggregateError, testError, testErrorWithCause };
