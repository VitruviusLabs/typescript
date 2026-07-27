import type { UUID } from "node:crypto";
import { RequiredTypeDefinition } from "../required/required-type-definition.mjs";
import { assertUUIDv4 } from "./predicate/assert-uuid-v4.mjs";

class UUIDv4TypeDefinition extends RequiredTypeDefinition<UUID>
{
	// eslint-disable-next-line @ts/class-methods-use-this
	public assertType(value: unknown): asserts value is UUID
	{
		assertUUIDv4(value);
	}
}

export { UUIDv4TypeDefinition };
