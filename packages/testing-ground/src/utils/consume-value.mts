/**
 * @privateRemarks
 * Requires a value with an arbitrary type for testing purposes
 */
// @ts-expect-error: Requires the value to be a specific type for testing purposes
// eslint-disable-next-line @ts/no-unused-vars -- Requires the value to be a specific type for testing purposes
function consumeValue<T>(value: T): void
{
	// Pretend to do something with the value
}

export { consumeValue };
