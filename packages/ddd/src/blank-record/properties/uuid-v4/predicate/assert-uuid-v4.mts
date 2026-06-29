import type { UUID } from "node:crypto";
import { ValidationError } from "@vitruvius-labs/ts-predicate";

function assertUUIDv4(value: unknown): asserts value is UUID
{
	if (typeof value !== "string")
	{
		throw new ValidationError("Value is not a UUIDv4.");
	}

	if (!/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/.test(value))
	{
		throw new ValidationError("Value is not a UUIDv4.");
	}
}

export { assertUUIDv4 };
