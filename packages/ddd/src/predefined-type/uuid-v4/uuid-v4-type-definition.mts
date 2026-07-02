import type { UUID } from "node:crypto";
import { BaseRequiredTypeDefinition } from "../../base/auxiliary/type-definition/base-required-type-definition.mjs";
import { assertUUIDv4 } from "./predicate/assert-uuid-v4.mjs";

class UUIDv4TypeDefinition extends BaseRequiredTypeDefinition<UUID>
{
	// eslint-disable-next-line @ts/class-methods-use-this
	public assertType(value: unknown): asserts value is UUID
	{
		assertUUIDv4(value);
	}
}

export { UUIDv4TypeDefinition };
