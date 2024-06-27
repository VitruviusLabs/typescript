import { DateTimeFormatEnum } from "./definition/enum/date-time-format.enum.mjs";
import { DateTimeConstantEnum } from "./definition/enum/date-time-constant.enum.mjs";
import { ISOWeekDayEnum } from "./definition/enum/iso-week-day.enum.mjs";
import { ISOMonthEnum } from "./definition/enum/iso-month.enum.mjs";
import { MillisecondEnum } from "./definition/enum/millisecond.enum.mjs";

/**
 * Date with extra functionality
 *
 * @remarks
 * Prefer DateTime.CreateISO() over the DateTime constructor.
 * For compatibility with the Date constructor the month parameter is 0-based.
 */
class DateTime extends Date
{
	/**
	 * Generate the UTC-0 timestamp
	 */
	// eslint-disable-next-line @ts/max-params -- Consistent with Date constructor
	public static GetISOTimestamp(
		year: number,
		month: ISOMonthEnum | number,
		day: number,
		hours?: number,
		minutes?: number,
		seconds?: number,
		milliseconds?: number
	): number
	{
		const TIMESTAMP: number = Date.UTC(
			year,
			month - 1,
			day,
			hours ?? 0,
			minutes ?? 0,
			seconds ?? 0,
			milliseconds ?? 0
		);

		return TIMESTAMP;
	}

	/**
	 * Generate the UTC-0 timestamp
	 */
	// eslint-disable-next-line @ts/max-params -- Consistent with Date constructor
	public static GetISOFiscalTimestamp(
		year: number,
		week: number,
		week_day: ISOWeekDayEnum | number,
		hours?: number,
		minutes?: number,
		seconds?: number,
		milliseconds?: number
	): number
	{
		const DATE: DateTime = DateTime.CreateISOFiscalYearFirstDay(year);

		const FISCAL_ORDINAL: number = (week - 1) * DateTimeConstantEnum.WEEK_DAY_COUNT + week_day;

		const TIMESTAMP: number = DateTime.GetISOTimestamp(
			DATE.getISOYear(),
			DATE.getISOMonth(),
			DATE.getISODay() - 1 + FISCAL_ORDINAL,
			hours,
			minutes,
			seconds,
			milliseconds
		);

		return TIMESTAMP;
	}

	/**
	 * Creates a new DateTime object
	 */
	public static Create(): DateTime
	{
		/* new Date(undefined) creates an Invalid Date */
		/* Date.now() is called for compatibility with Sinon Fake Timers */
		return new DateTime(Date.now());
	}

	/**
	 * Creates a new DateTime object
	 */
	public static CreateFrom(date: Date): DateTime;
	public static CreateFrom(timestamp: number): DateTime;
	public static CreateFrom(formatted_date: string): DateTime;

	public static CreateFrom(value: Date | number | string): DateTime
	{
		return new DateTime(value);
	}

	/**
	 * Creates a new DateTime object
	 *
	 * @remarks
	 * - All values are presumed to be in UTC-0
	 */
	// eslint-disable-next-line @ts/max-params -- Consistent with Date constructor
	public static CreateISO(
		year: number,
		month: ISOMonthEnum | number,
		day: number,
		hours?: number,
		minutes?: number,
		seconds?: number,
		milliseconds?: number
	): DateTime
	{
		return new DateTime(DateTime.GetISOTimestamp(year, month, day, hours, minutes, seconds, milliseconds));
	}

	/**
	 * Creates a new DateTime object
	 *
	 * @remarks
	 * - All values are presumed to be in UTC-0
	 */
	// eslint-disable-next-line @ts/max-params -- Consistent with Date constructor
	public static CreateISOFiscal(
		year: number,
		week: number,
		week_day: ISOWeekDayEnum | number,
		hours?: number,
		minutes?: number,
		seconds?: number,
		milliseconds?: number
	): DateTime
	{
		return new DateTime(DateTime.GetISOFiscalTimestamp(year, week, week_day, hours, minutes, seconds, milliseconds));
	}

	public static CreateISOFiscalYearFirstDay(year: number): DateTime
	{
		const DATE: DateTime = DateTime.CreateISO(year, ISOMonthEnum.JANUARY, DateTimeConstantEnum.DAY_4);

		/**
		 * -2: December 29
		 * -1: December 30
		 * +0: December 31
		 * +1: January 1
		 * +2: January 2
		 * +3: January 3
		 * +4: January 4
		 */
		const ADJUSTMENT: number = DateTimeConstantEnum.DAY_4 + ISOWeekDayEnum.MONDAY - DATE.getISOWeekDay();

		DATE.setUTCDate(ADJUSTMENT);

		return DATE;
	}

	public static CreateISOFiscalYearLastDay(year: number): DateTime
	{
		const DATE: DateTime = DateTime.CreateISO(year, ISOMonthEnum.DECEMBER, DateTimeConstantEnum.DAY_28);

		/**
		 * 28: December 28
		 * 29: December 29
		 * 30: December 30
		 * 31: December 31
		 * 32: January 1
		 * 33: January 2
		 * 34: January 3
		 */
		const ADJUSTMENT: number = DateTimeConstantEnum.DAY_28 + ISOWeekDayEnum.SUNDAY - DATE.getISOWeekDay();

		DATE.setUTCDate(ADJUSTMENT);

		return DATE;
	}

	public getTimestamp(): number
	{
		return this.getTime();
	}

	public getISOYear(): number
	{
		return this.getUTCFullYear();
	}

	public setISOYear(year: number): void
	{
		this.setUTCFullYear(year);
	}

	public getISOMonth(): ISOMonthEnum
	{
		return this.getUTCMonth() + 1;
	}

	public setISOMonth(month: number): void
	{
		this.setUTCMonth(month - 1);
	}

	public getISODay(): number
	{
		return this.getUTCDate();
	}

	public setISODay(day: number): void
	{
		this.setUTCDate(day);
	}

	public getISOWeekDay(): ISOWeekDayEnum
	{
		// eslint-disable-next-line @ts/strict-boolean-expressions -- Shorthand
		return this.getUTCDay() || ISOWeekDayEnum.SUNDAY;
	}

	public getISOOrdinal(): number
	{
		const JANUARY_1: DateTime = DateTime.CreateISO(this.getISOYear(), ISOMonthEnum.JANUARY, DateTimeConstantEnum.DAY_1);

		return 1 + this.getISODifferenceInDays(JANUARY_1);
	}

	public getISOYearLength(): number
	{
		const DECEMBER_31: DateTime = DateTime.CreateISO(this.getISOYear(), ISOMonthEnum.DECEMBER, DateTimeConstantEnum.DAY_31);

		return DECEMBER_31.getISOOrdinal();
	}

	public isLeapISOYear(): boolean
	{
		const YEAR: number = this.getISOYear();

		if (YEAR % DateTimeConstantEnum.YEAR_400 === 0)
		{
			return true;
		}

		if (YEAR % DateTimeConstantEnum.YEAR_100 === 0)
		{
			return false;
		}

		return YEAR % DateTimeConstantEnum.YEAR_4 === 0;
	}

	public getISOMonthLength(): number
	{
		switch (this.getISOMonth())
		{
			case ISOMonthEnum.JANUARY:
				return DateTimeConstantEnum.LONG_MONTH_DAY_COUNT;

			case ISOMonthEnum.FEBRUARY:
				return this.isLeapISOYear() ? DateTimeConstantEnum.LONG_FEBRUARY_DAY_COUNT : DateTimeConstantEnum.SHORT_FEBRUARY_DAY_COUNT;

			case ISOMonthEnum.MARCH:
				return DateTimeConstantEnum.LONG_MONTH_DAY_COUNT;

			case ISOMonthEnum.APRIL:
				return DateTimeConstantEnum.SHORT_MONTH_DAY_COUNT;

			case ISOMonthEnum.MAY:
				return DateTimeConstantEnum.LONG_MONTH_DAY_COUNT;

			case ISOMonthEnum.JUNE:
				return DateTimeConstantEnum.SHORT_MONTH_DAY_COUNT;

			case ISOMonthEnum.JULY:
				return DateTimeConstantEnum.LONG_MONTH_DAY_COUNT;

			case ISOMonthEnum.AUGUST:
				return DateTimeConstantEnum.LONG_MONTH_DAY_COUNT;

			case ISOMonthEnum.SEPTEMBER:
				return DateTimeConstantEnum.SHORT_MONTH_DAY_COUNT;

			case ISOMonthEnum.OCTOBER:
				return DateTimeConstantEnum.LONG_MONTH_DAY_COUNT;

			case ISOMonthEnum.NOVEMBER:
				return DateTimeConstantEnum.SHORT_MONTH_DAY_COUNT;

			case ISOMonthEnum.DECEMBER:
				return DateTimeConstantEnum.LONG_MONTH_DAY_COUNT;
		}
	}

	public getISOFiscalYear(): number
	{
		const YEAR: number = this.getISOYear();
		const FISCAL_YEAR_FIRST_DAY: DateTime = DateTime.CreateISOFiscalYearFirstDay(YEAR);

		if (this.getISODifferenceInDays(FISCAL_YEAR_FIRST_DAY) < 0)
		{
			return YEAR - 1;
		}

		const FISCAL_YEAR_LAST_DAY: DateTime = DateTime.CreateISOFiscalYearLastDay(YEAR);

		if (this.getISODifferenceInDays(FISCAL_YEAR_LAST_DAY) > 0)
		{
			return YEAR + 1;
		}

		return YEAR;
	}

	public setISOFiscalYear(year: number): void
	{
		const DATE: DateTime = DateTime.CreateISOFiscal(year, this.getISOFiscalWeek(), this.getISOFiscalDay());

		this.setISOYear(DATE.getISOYear());
		this.setISOMonth(DATE.getISOMonth());
		this.setISODay(DATE.getISODay());
	}

	public getISOFiscalWeek(): number
	{
		return 1 + Math.floor((this.getISOFiscalOrdinal() - 1) / DateTimeConstantEnum.WEEK_DAY_COUNT);
	}

	public setISOFiscalWeek(week: number): void
	{
		const DATE: DateTime = DateTime.CreateISOFiscal(this.getISOFiscalYear(), week, this.getISOFiscalDay());

		this.setISOYear(DATE.getISOYear());
		this.setISOMonth(DATE.getISOMonth());
		this.setISODay(DATE.getISODay());
	}

	public getISOFiscalDay(): ISOWeekDayEnum
	{
		return this.getISOWeekDay();
	}

	public setISOFiscalDay(day: number): void
	{
		const DATE: DateTime = DateTime.CreateISOFiscal(this.getISOFiscalYear(), this.getISOFiscalWeek(), day);

		this.setISOYear(DATE.getISOYear());
		this.setISOMonth(DATE.getISOMonth());
		this.setISODay(DATE.getISODay());
	}

	public getISOFiscalOrdinal(): number
	{
		const FISCAL_YEAR_FIRST_DAY: DateTime = DateTime.CreateISOFiscalYearFirstDay(this.getISOFiscalYear());

		return 1 + this.getISODifferenceInDays(FISCAL_YEAR_FIRST_DAY);
	}

	public getISOFiscalYearLength(): number
	{
		const FISCAL_YEAR_FIRST_DAY: DateTime = DateTime.CreateISOFiscalYearFirstDay(this.getISOFiscalYear());
		const FISCAL_YEAR_LAST_DAY: DateTime = DateTime.CreateISOFiscalYearLastDay(this.getISOFiscalYear());

		const DAYS: number = 1 + FISCAL_YEAR_LAST_DAY.getISODifferenceInDays(FISCAL_YEAR_FIRST_DAY);

		return Math.round(DAYS / DateTimeConstantEnum.WEEK_DAY_COUNT);
	}

	public isLongISOFiscalYear(): boolean
	{
		const YEAR_FIRST_DAY: DateTime = DateTime.CreateISO(this.getISOFiscalYear(), ISOMonthEnum.JANUARY, 1);
		const WEEK_DAY: number = YEAR_FIRST_DAY.getISOWeekDay();

		if (WEEK_DAY === ISOWeekDayEnum.THURSDAY)
		{
			return true;
		}

		if (YEAR_FIRST_DAY.isLeapISOYear())
		{
			return WEEK_DAY === ISOWeekDayEnum.WEDNESDAY;
		}

		return false;
	}

	public getISOHours(): number
	{
		return this.getUTCHours();
	}

	public setISOHours(hours: number): void
	{
		this.setUTCHours(hours);
	}

	public getISOMinutes(): number
	{
		return this.getUTCMinutes();
	}

	public setISOMinutes(minutes: number): void
	{
		this.setUTCMinutes(minutes);
	}

	public getISOSeconds(): number
	{
		return this.getUTCSeconds();
	}

	public setISOSeconds(seconds: number): void
	{
		this.setUTCSeconds(seconds);
	}

	public getISOMilliseconds(): number
	{
		return this.getUTCMilliseconds();
	}

	public setISOMilliseconds(milliseconds: number): void
	{
		this.setUTCMilliseconds(milliseconds);
	}

	public getISOMidnight(): DateTime
	{
		return DateTime.CreateISO(this.getISOYear(), this.getISOMonth(), this.getISODay());
	}

	public getISODifferenceInDays(date: Date): number
	{
		const DATE_MIDNIGHT: DateTime = DateTime.CreateISO(
			date.getUTCFullYear(),
			date.getUTCMonth() + 1,
			date.getUTCDate()
		);

		const MILLISECONDS_DIFFERENCE: number = this.getISOMidnight().getTime() - DATE_MIDNIGHT.getTime();

		return Math.round(MILLISECONDS_DIFFERENCE / MillisecondEnum.DAY);
	}

	public getISODateTime(): string
	{
		return this.toISOString().slice(DateTimeFormatEnum.ISO_DATETIME_START, DateTimeFormatEnum.ISO_DATETIME_END).replace("T", " ");
	}

	public getISODate(): string
	{
		return this.toISOString().slice(DateTimeFormatEnum.ISO_DATE_START, DateTimeFormatEnum.ISO_DATE_END);
	}

	public getISOTime(): string
	{
		return this.toISOString().slice(DateTimeFormatEnum.ISO_TIME_START, DateTimeFormatEnum.ISO_TIME_END);
	}

	public getISOTag(): string
	{
		return this.getISODateTime().replace(" ", "_").replaceAll(":", "-");
	}

	public getTimezone(): string
	{
		const TIMEZONE_OFFSET: number = this.getTimezoneOffset();
		const TIMEZONE_ABS_OFFSET: number = Math.abs(TIMEZONE_OFFSET);

		const HOURS: number = Math.floor(TIMEZONE_ABS_OFFSET / DateTimeConstantEnum.HOUR_MINUTES_COUNT);
		const MINUTES: number = TIMEZONE_ABS_OFFSET - HOURS * DateTimeConstantEnum.HOUR_MINUTES_COUNT;

		const SIGN: string = TIMEZONE_OFFSET > 0 ? "-" : "+";
		const PADDED_HOURS: string = HOURS.toFixed(0).padStart(DateTimeConstantEnum.PADDING_LENGTH, "0");
		const PADDED_MINUTES: string = MINUTES.toFixed(0).padStart(DateTimeConstantEnum.PADDING_LENGTH, "0");

		return `${SIGN}${PADDED_HOURS}:${PADDED_MINUTES}`;
	}

	public format(expected_format: string): string
	{
		const YEAR: string = this.getISOYear().toFixed(0);
		const MONTH: string = this.getISOMonth().toFixed(0).padStart(DateTimeConstantEnum.PADDING_LENGTH, "0");
		const DAY: string = this.getISODay().toFixed(0).padStart(DateTimeConstantEnum.PADDING_LENGTH, "0");
		const HOURS: string = this.getISOHours().toFixed(0).padStart(DateTimeConstantEnum.PADDING_LENGTH, "0");
		const MINUTES: string = this.getISOMinutes().toFixed(0).padStart(DateTimeConstantEnum.PADDING_LENGTH, "0");
		const SECONDS: string = this.getISOSeconds().toFixed(0).padStart(DateTimeConstantEnum.PADDING_LENGTH, "0");

		let output: string = expected_format;

		output = output.replaceAll(/Y/g, YEAR);
		output = output.replaceAll(/m/g, MONTH);
		output = output.replaceAll(/d/g, DAY);
		output = output.replaceAll(/H/g, HOURS);
		output = output.replaceAll(/i/g, MINUTES);
		output = output.replaceAll(/s/g, SECONDS);

		return output;
	}
}

export { DateTime };
