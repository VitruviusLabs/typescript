/**
 * @privateRemarks
 * Enumerability determines which properties will be compared
**/
function fixError(error: Error): Error
{
	["message", "cause", "errors", "stack"].forEach(
		(key: string): void =>
		{
			const DESCRIPTOR: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(error, key);

			if (DESCRIPTOR === undefined)
			{
				return;
			}

			DESCRIPTOR.enumerable = key !== "stack";

			Object.defineProperty(error, key, DESCRIPTOR);
		}
	);

	return error;
}

export { fixError };
