/**
 * Values for converting a duration into milliseconds.
 *
 * @remarks
 * - Months and years are not included as they have varying lengths
 */
const enum MillisecondEnum
{
	SECOND = 1_000,
	MINUTE = 60_000,
	HOUR = 3_600_000,
	DAY = 86_400_000,
	WEEK = 604_800_000,
}

export { MillisecondEnum };
