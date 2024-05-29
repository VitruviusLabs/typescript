import { deepStrictEqual, doesNotReject } from "assert";
import { instanceOf } from "./instance-of.mjs";

async function deepStrictResolves(value: unknown, expected: unknown): Promise<void>
{
	instanceOf(value, Promise);
	await doesNotReject(value);
	deepStrictEqual(await value, expected);
}

export { deepStrictResolves };
