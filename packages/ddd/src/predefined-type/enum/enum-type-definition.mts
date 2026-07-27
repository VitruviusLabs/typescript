import { assertEnumValue } from "@vitruvius-labs/ts-predicate";
import { RequiredTypeDefinition } from "../required/required-type-definition.mjs";

abstract class EnumTypeDefinition<T extends number | string> extends RequiredTypeDefinition<T>
{
	public abstract getValues(): ReadonlyArray<T>;

	public assertType(value: unknown): asserts value is Date
	{
		assertEnumValue(value, this.getValues());
	}
}

export { EnumTypeDefinition };
