import type { SecretType } from "../definition/type/secret.type.mjs";
import { isString } from "@vitruvius-labs/ts-predicate/type-guard";

/** @internal */
function validateSecret(secret: SecretType): void
{
	if (isString(secret))
	{
		if (secret.length === 0)
		{
			throw new Error("Invalid secret.");
		}
	}
	else if (ArrayBuffer.isView(secret))
	{
		if (secret.byteLength === 0)
		{
			throw new Error("Invalid secret.");
		}
	}
}

export { validateSecret };
