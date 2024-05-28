import { isBigInt } from "@vitruvius-labs/ts-predicate/type-guard";

function jsonSerialize(data: symbol | undefined): undefined;
function jsonSerialize(data: bigint | boolean | number | object | string | null): string;
function jsonSerialize(data: unknown): string | undefined;

function jsonSerialize(data: unknown): string | undefined
{
	return JSON.stringify(
		data,
		// @ts-expect-error: Unused key parameter
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

export { jsonSerialize };
