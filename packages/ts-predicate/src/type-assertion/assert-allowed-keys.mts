import { ValidationError } from "./utils/validation-error.mjs";

function assertAllowedKeys(value: object, allowed_keys: Array<string>): void
{
	const FORBIDDEN_PROPERTIES: Array<string> = Object.keys(value).filter(
		(key: string): boolean =>
		{
			return !allowed_keys.includes(key);
		}
	);

	if (FORBIDDEN_PROPERTIES.length > 0)
	{
		throw new ValidationError(`The value must not have the properties "${FORBIDDEN_PROPERTIES.join('", "')}".`);
	}
}

export { assertAllowedKeys };
