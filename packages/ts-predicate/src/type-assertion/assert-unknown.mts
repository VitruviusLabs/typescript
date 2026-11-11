// @ts-expect-error: Unused parameter is intended
// eslint-disable-next-line @ts/no-unused-vars -- Unused parameter is intended
function assertUnknown(value: unknown): asserts value is unknown
{
	// Do nothing
}

export { assertUnknown };
