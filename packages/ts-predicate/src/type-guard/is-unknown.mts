// @ts-expect-error -- Unused parameter is intended
function isUnknown(value: unknown): value is unknown
{
	return true;
}

export { isUnknown };
