import type { JSONValueType } from "./definition/type/json-value.type.mjs";
import { isString } from "@vitruvius-labs/ts-predicate/type-guard";

function jsonDeserialize(serialized_data: string): JSONValueType
{
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return -- JSON.parse can return anything
	return JSON.parse(
		serialized_data,
		// @ts-expect-error: Unused key parameter
		(key: string, value: unknown): unknown =>
		{
			if (isString(value) && /^-?\d+n$/.test(value))
			{
				return BigInt(value.slice(0, -1));
			}

			return value;
		}
	);
}

export { jsonDeserialize };
