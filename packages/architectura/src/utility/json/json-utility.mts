import { isBigInt, isString } from "@vitruvius-labs/ts-predicate/type-guard";
import type { JSONValueType } from "./definition/type/json-value.type.mjs";

class JSONUtility
{
	public static Encode(data: symbol | undefined): undefined;
	public static Encode(data: bigint | boolean | number | object | string | null): string;
	public static Encode(data: unknown): string | undefined;
	public static Encode(data: unknown): string | undefined
	{
		return JSON.stringify(
			data,
			// @ts-expect-error: key is unused
			(key: string, value: unknown): unknown =>
			{
				if (isBigInt(value))
				{
					return `${value.toString()}n`;
				}

				return value;
			}
		);
	}

	public static Parse(serialized_data: string): JSONValueType
	{
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return -- JSON.parse can return anything
		return JSON.parse(
			serialized_data,
			// @ts-expect-error: key is unused
			(key: string, value: unknown): unknown =>
			{
				if (isString(value) && /^\d+n$/.test(value))
				{
					return BigInt(value.slice(0, -1));
				}

				return value;
			}
		);
	}
}

export { JSONUtility };
