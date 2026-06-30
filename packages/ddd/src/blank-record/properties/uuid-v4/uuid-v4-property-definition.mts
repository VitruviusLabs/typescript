import type { UUID } from "node:crypto";
import { BasePropertyDefinition } from "../../../base/auxiliary/property-definition/base-property-definition.mjs";
import { UUIDv4TypeDefinition } from "./uuid-v4-type-definition.mjs";
import { BlankRecordPropertyEnum } from "../../definition/enum/blank-record-property.enum.mjs";

class UUIDv4PropertyDefinition extends BasePropertyDefinition<UUID>
{
	public constructor()
	{
		super({
			identifier: BlankRecordPropertyEnum.UUID,
			typeDefinition: new UUIDv4TypeDefinition(),
		});
	}
}

export { UUIDv4PropertyDefinition };
