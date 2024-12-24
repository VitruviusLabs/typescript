/**
 * @privateRemarks
 * Allows returning an arbitrary value with an arbitrary type for testing purposes
 */
function createValue<T>(value?: unknown): T
{
	// @ts-expect-error: For testing purposes
	return value;
}

export { createValue };
