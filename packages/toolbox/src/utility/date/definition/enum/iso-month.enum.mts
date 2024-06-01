/**
 * List of months
 *
 * @remarks
 * - Numberered from 1 to 12 as per ISO 8601,
 * - Do not use in the Date constructor, use MonthEnum instead
 */
const enum ISOMonthEnum
{
	JANUARY = 1,
	FEBRUARY = 2,
	MARCH = 3,
	APRIL = 4,
	MAY = 5,
	JUNE = 6,
	JULY = 7,
	AUGUST = 8,
	SEPTEMBER = 9,
	OCTOBER = 10,
	NOVEMBER = 11,
	DECEMBER = 12,
}

export { ISOMonthEnum };
