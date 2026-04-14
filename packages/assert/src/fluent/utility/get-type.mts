function getType(value: unknown): string
{
	switch (typeof value)
	{
		case "undefined":
			return "undefined";

		case "boolean":
			return value ? "true" : "false";

		case "number":
			if (Number.isNaN(value))
			{
				return "NaN";
			}

			if (value === Number.POSITIVE_INFINITY)
			{
				return "+Infinity";
			}

			if (value === Number.NEGATIVE_INFINITY)
			{
				return "-Infinity";
			}

			if (Number.isSafeInteger(value))
			{
				return "an integer";
			}

			return "a number";

		case "bigint":
			return "a bigint";

		case "string":
			if (value.length === 0)
			{
				return "an empty string";
			}

			return "a string";

		case "symbol":
			return "a symbol";

		case "function":
			return "a function";

		case "object":
		{
			if (value === null)
			{
				return "null";
			}

			// eslint-disable-next-line @ts/no-unsafe-assignment -- Prototype is badly typed
			const PROTOTYPE: object | null = Object.getPrototypeOf(value);

			if (PROTOTYPE === null)
			{
				return "a null-prototype object";
			}

			if (PROTOTYPE.constructor === Object)
			{
				return "an object";
			}

			const CLASS_NAME: string = PROTOTYPE.constructor.name;

			if (CLASS_NAME.length > 0)
			{
				return `an instance of ${CLASS_NAME}`;
			}

			return "an instance of an anonymous class";
		}
	}
}

export { getType };
