/**
 * @privateRemarks
 * ValidationError is a ts-predicate class that behave like AggregateError
*/
function isValidationError(value: Error): value is AggregateError
{
	return value.constructor.name === "ValidationError";
}

export { isValidationError };
