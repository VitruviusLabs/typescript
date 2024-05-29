import { splitOnce } from "@vitruvius-labs/toolbox";

/**
 * Parses a string of quality values.
 *
 * @remarks
 * - Order values by weight in descending order.
 * - Preserve order of values with the same weight.
 * - Default weight is 1.
 */
function parseQualityValues(input: string): Array<string>
{
	interface QualityValueInterface
	{
		value: string;
		weight: number;
		index: number;
	}

	if (input === "")
	{
		return [];
	}

	return input
		.split(",")
		.map(
			(serialized_value: string, index: number): QualityValueInterface =>
			{
				const TRIMMED_VALUE: string = serialized_value.trim();

				const [VALUE, WEIGHT]: [string, string] = splitOnce(";q=", TRIMMED_VALUE);

				return {
					value: VALUE,
					weight: WEIGHT === "" ? 1 : parseFloat(WEIGHT),
					index: index,
				};
			}
		)
		.sort(
			(a: QualityValueInterface, z: QualityValueInterface): number =>
			{
				if (a.weight === z.weight)
				{
					return a.index - z.index;
				}

				return z.weight - a.weight;
			}
		)
		.map(
			(quality_value: QualityValueInterface): string =>
			{
				return quality_value.value;
			}
		);
}

export { parseQualityValues };
