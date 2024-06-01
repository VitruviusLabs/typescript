/**
 * Useful numbers for extracting date and/or time from ISO strings
 */
const enum DateTimeFormatEnum
{
	/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
	ISO_DATE_START = 0,
	ISO_DATE_END = 10,
	ISO_TIME_START = 11,
	ISO_TIME_END = 19,
	ISO_DATETIME_START = 0,
	ISO_DATETIME_END = 19,
	/* eslint-enable @typescript-eslint/no-duplicate-enum-values */
}

export { DateTimeFormatEnum };
