import { ValidationError } from "@vitruvius-labs/ts-predicate";
import { RequiredTypeDefinition } from "../required/required-type-definition.mjs";

class DateTypeDefinition extends RequiredTypeDefinition<Date>
{
	// eslint-disable-next-line @ts/class-methods-use-this
	public assertType(value: unknown): asserts value is Date
	{
		if (!(value instanceof Date))
		{
			throw new ValidationError("Expected an instance of Date");
		}
	}

	// eslint-disable-next-line @ts/class-methods-use-this, @ts/require-await
	public override async verify(value: Date): Promise<void>
	{
		if (Number.isNaN(value.getTime()))
		{
			throw new ValidationError("Invalid date");
		}
	}
}

export { DateTypeDefinition };
