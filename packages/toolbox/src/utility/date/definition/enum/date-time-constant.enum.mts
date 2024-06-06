/**
 * Constants for calculations.
 *
 * @internal
*/
const enum DateTimeConstantEnum
{
	/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
	PADDING_LENGTH = 2,
	DAY_1 = 1,
	DAY_4 = 4,
	DAY_28 = 28,
	DAY_31 = 31,
	HOUR_MINUTES_COUNT = 60,
	WEEK_DAY_COUNT = 7,
	SHORT_MONTH_DAY_COUNT = 30,
	LONG_MONTH_DAY_COUNT = 31,
	SHORT_FEBRUARY_DAY_COUNT = 28,
	LONG_FEBRUARY_DAY_COUNT = 29,
	SHORT_YEAR_WEEK_COUNT = 52,
	LONG_YEAR_WEEK_COUNT = 53,
	LONG_YEAR_DAY_COUNT = 366,
	YEAR_4 = 4,
	YEAR_100 = 100,
	YEAR_400 = 400,
	/* eslint-enable @typescript-eslint/no-duplicate-enum-values */
}

export { DateTimeConstantEnum };
