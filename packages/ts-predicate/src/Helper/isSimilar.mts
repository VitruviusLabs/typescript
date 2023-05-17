import { isRecord } from "../TypeGuard/isRecord.mjs";

function isSimilar(a: unknown, b: unknown): boolean
{
	if (a === b)
	{
		return true;
	}

	if (Number.isNaN(a) && Number.isNaN(b))
	{
		return true;
	}

	if (isRecord(a) && isRecord(b))
	{
		const KEYS_A: Array<string> = Object.keys(a);
		const KEYS_B: Array<string> = Object.keys(b);

		if (!isSimilar(KEYS_A, KEYS_B))
		{
			return false;
		}

		return KEYS_A.every(
			(key: string): boolean =>
			{
				return isSimilar(a[key], b[key]);
			}
		);
	}

	if (Array.isArray(a) && Array.isArray(b) && a.length === b.length)
	{
		// Stryker disable next-line EqualityOperator: Accessing out of bound values on both arrays
		for (let i: number = 0; i < a.length; ++i)
		{
			if (!isSimilar(a[i], b[i]))
			{
				return false;
			}
		}

		return true;
	}

	return false;
}

export { isSimilar };
