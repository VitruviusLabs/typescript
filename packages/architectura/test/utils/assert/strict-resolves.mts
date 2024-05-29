import { doesNotReject, strictEqual } from "assert";
import { instanceOf } from "./instance-of.mjs";

async function strictResolves(value: unknown, expected: unknown): Promise<void>
{
	instanceOf(value, Promise);
	await doesNotReject(value);
	strictEqual(await value, expected);
}

export { strictResolves };
