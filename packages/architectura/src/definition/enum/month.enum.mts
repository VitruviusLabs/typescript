/**
 * List of months
 *
 * @remarks
 * Does not number month from 1 to 12 as the ISO standard,
 * but from 0 to 11 as the Date constructor expects
 */
const enum MonthEnum
{
	JANUARY = 0,
	FEBRUARY = 1,
	MARCH = 2,
	APRIL = 3,
	MAY = 4,
	JUNE = 5,
	JULY = 6,
	AUGUST = 7,
	SEPTEMBER = 8,
	OCTOBER = 9,
	NOVEMBER = 10,
	DECEMBER = 11,
}

export { MonthEnum };
