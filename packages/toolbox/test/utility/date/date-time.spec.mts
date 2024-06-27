import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, strictEqual } from "node:assert";
import { type SinonFakeTimers, type SinonStub, stub, useFakeTimers } from "sinon";
import { DateTime } from "../../../src/_index.mjs";

describe("DateTime", (): void => {
	const LONG_YEARS: Array<number> = [2004, 2009, 2015, 2020, 2026, 2032, 2037, 2043, 2048, 2054, 2060, 2065, 2071, 2076, 2082, 2088, 2093, 2099];

	const CLOCK: SinonFakeTimers = useFakeTimers({ toFake: ["Date"] });
	const SET_YEAR_STUB: SinonStub = stub(DateTime.prototype, "setUTCFullYear");
	const SET_MONTH_STUB: SinonStub = stub(DateTime.prototype, "setUTCMonth");
	const SET_DAY_STUB: SinonStub = stub(DateTime.prototype, "setUTCDate");
	const SET_HOURS_STUB: SinonStub = stub(DateTime.prototype, "setUTCHours");
	const SET_MINUTES_STUB: SinonStub = stub(DateTime.prototype, "setUTCMinutes");
	const SET_SECONDS_STUB: SinonStub = stub(DateTime.prototype, "setUTCSeconds");
	const SET_MILLISECONDS_STUB: SinonStub = stub(DateTime.prototype, "setUTCMilliseconds");
	const GET_HOURS_STUB: SinonStub = stub(DateTime.prototype, "getUTCHours");
	const GET_MINUTES_STUB: SinonStub = stub(DateTime.prototype, "getUTCMinutes");
	const GET_SECONDS_STUB: SinonStub = stub(DateTime.prototype, "getUTCSeconds");
	const GET_MILLISECONDS_STUB: SinonStub = stub(DateTime.prototype, "getUTCMilliseconds");
	const GET_TIMEZONE_OFFSET_STUB: SinonStub = stub(DateTime.prototype, "getTimezoneOffset");

	beforeEach((): void => {
		CLOCK.reset();
		SET_YEAR_STUB.reset();
		SET_YEAR_STUB.callThrough();
		SET_MONTH_STUB.reset();
		SET_MONTH_STUB.callThrough();
		SET_DAY_STUB.reset();
		SET_DAY_STUB.callThrough();
		SET_HOURS_STUB.reset();
		SET_HOURS_STUB.callThrough();
		SET_MINUTES_STUB.reset();
		SET_MINUTES_STUB.callThrough();
		SET_SECONDS_STUB.reset();
		SET_SECONDS_STUB.callThrough();
		SET_MILLISECONDS_STUB.reset();
		SET_MILLISECONDS_STUB.callThrough();
		GET_HOURS_STUB.reset();
		GET_HOURS_STUB.callThrough();
		GET_MINUTES_STUB.reset();
		GET_MINUTES_STUB.callThrough();
		GET_SECONDS_STUB.reset();
		GET_SECONDS_STUB.callThrough();
		GET_MILLISECONDS_STUB.reset();
		GET_MILLISECONDS_STUB.callThrough();
		GET_TIMEZONE_OFFSET_STUB.reset();
		GET_TIMEZONE_OFFSET_STUB.throws();
	});

	after((): void => {
		CLOCK.restore();
		SET_YEAR_STUB.restore();
		SET_MONTH_STUB.restore();
		SET_DAY_STUB.restore();
		SET_HOURS_STUB.restore();
		SET_MINUTES_STUB.restore();
		SET_SECONDS_STUB.restore();
		SET_MILLISECONDS_STUB.restore();
		GET_HOURS_STUB.restore();
		GET_MINUTES_STUB.restore();
		GET_SECONDS_STUB.restore();
		GET_MILLISECONDS_STUB.restore();
		GET_TIMEZONE_OFFSET_STUB.restore();
	});

	describe("GetISOTimestamp", (): void => {
		it("should return the correct timestamp", (): void => {
			for (let year: number = 2010; year <= 2040; ++year)
			{
				for (let month: number = 1; month <= 12; ++month)
				{
					for (let day: number = 1; day <= 28; ++day)
					{
						strictEqual(DateTime.GetISOTimestamp(year, month, day), Date.UTC(year, month - 1, day));
					}
				}
			}
		});
	});

	describe("GetISOFiscalTimestamp", (): void => {
		it("should return the correct timestamp", (): void => {
			strictEqual(DateTime.GetISOFiscalTimestamp(2010, 1, 1), 1262563200000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2011, 1, 1), 1294012800000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2012, 1, 1), 1325462400000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2013, 1, 1), 1356912000000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2014, 1, 1), 1388361600000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2015, 1, 1), 1419811200000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2016, 1, 1), 1451865600000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2017, 1, 1), 1483315200000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2018, 1, 1), 1514764800000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2019, 1, 1), 1546214400000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2020, 1, 1), 1577664000000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2021, 1, 1), 1609718400000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2022, 1, 1), 1641168000000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2023, 1, 1), 1672617600000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2024, 1, 1), 1704067200000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2025, 1, 1), 1735516800000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2026, 1, 1), 1766966400000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2027, 1, 1), 1799020800000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2028, 1, 1), 1830470400000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2029, 1, 1), 1861920000000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2030, 1, 1), 1893369600000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2031, 1, 1), 1924819200000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2032, 1, 1), 1956268800000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2033, 1, 1), 1988323200000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2034, 1, 1), 2019772800000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2035, 1, 1), 2051222400000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2036, 1, 1), 2082672000000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2037, 1, 1), 2114121600000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2038, 1, 1), 2146176000000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2039, 1, 1), 2177625600000);
			strictEqual(DateTime.GetISOFiscalTimestamp(2040, 1, 1), 2209075200000);
		});
	});

	describe("Create", (): void => {
		it("should create a new DateTime instance (default)", (): void => {
			deepStrictEqual(DateTime.Create(), new DateTime(0));
			CLOCK.tick(1000);
			deepStrictEqual(DateTime.Create(), new DateTime(1000));
			CLOCK.tick(25363800000 - 1000);
			deepStrictEqual(DateTime.Create(), new DateTime(25363800000));
		});
	});

	describe("CreateFrom", (): void => {
		it("should create a new DateTime instance (timestamp)", (): void => {
			deepStrictEqual(DateTime.CreateFrom(0), new DateTime(0));
			deepStrictEqual(DateTime.CreateFrom(1000), new DateTime(1000));
			deepStrictEqual(DateTime.CreateFrom(25363800000), new DateTime(25363800000));
		});

		it("should create a new DateTime instance (formatted date)", (): void => {
			deepStrictEqual(DateTime.CreateFrom("1970-01-01T00:00:00.000Z"), new DateTime(0));
			deepStrictEqual(DateTime.CreateFrom("1970-01-01T00:00:01.000Z"), new DateTime(1000));
			deepStrictEqual(DateTime.CreateFrom("1970-10-21T13:30:00Z"), new DateTime(25363800000));
		});

		it("should create a new DateTime instance (instance of Date)", (): void => {
			deepStrictEqual(DateTime.CreateFrom(new Date(0)), new DateTime(0));
			deepStrictEqual(DateTime.CreateFrom(new Date(1000)), new DateTime(1000));
			deepStrictEqual(DateTime.CreateFrom(new Date(25363800000)), new DateTime(25363800000));
		});

		it("should create a new DateTime instance (instance of DateTime)", (): void => {
			deepStrictEqual(DateTime.CreateFrom(new DateTime(0)), new DateTime(0));
			deepStrictEqual(DateTime.CreateFrom(new DateTime(1000)), new DateTime(1000));
			deepStrictEqual(DateTime.CreateFrom(new DateTime(25363800000)), new DateTime(25363800000));
		});
	});

	describe("CreateISO", (): void => {
		it("should create a new DateTime instance (ISO)", (): void => {
			deepStrictEqual(DateTime.CreateISO(1970, 1, 1), new DateTime(0));
			deepStrictEqual(DateTime.CreateISO(1970, 1, 1, 0, 0, 1), new DateTime(1000));
			deepStrictEqual(DateTime.CreateISO(1970, 1, 1, 0, 0, 0, 1000), new DateTime(1000));
			deepStrictEqual(DateTime.CreateISO(1970, 10, 21, 13, 30, 0), new DateTime(25363800000));
		});
	});

	describe("CreateISOFiscal", (): void => {
		it("should create a new DateTime instance (ISO fiscal)", (): void => {
			deepStrictEqual(DateTime.CreateISOFiscal(1970, 1, 4, 0, 0, 1), new DateTime("1970-01-01T00:00:01.000Z"));
			deepStrictEqual(DateTime.CreateISOFiscal(1970, 1, 4, 0, 0, 0, 1000), new DateTime("1970-01-01T00:00:01.000Z"));
			deepStrictEqual(DateTime.CreateISOFiscal(1970, 1, 4, 12, 30, 0), new DateTime("1970-01-01T12:30:00.000Z"));
			deepStrictEqual(DateTime.CreateISOFiscal(1970, 11, 6), new DateTime("1970-03-14T00:00:00.000Z"));
			deepStrictEqual(DateTime.CreateISOFiscal(1970, 30, 4, 13, 30, 0, 117), new DateTime("1970-07-23T13:30:00.117Z"));
		});
	});

	describe("CreateISOFiscalYearFirstDay", (): void => {
		it("should create a new instance with the correct first day of the fiscal year", (): void => {
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2000), new DateTime("2000-01-03T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2001), new DateTime("2001-01-01T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2002), new DateTime("2001-12-31T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2003), new DateTime("2002-12-30T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2004), new DateTime("2003-12-29T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2005), new DateTime("2005-01-03T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2006), new DateTime("2006-01-02T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2007), new DateTime("2007-01-01T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2008), new DateTime("2007-12-31T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2009), new DateTime("2008-12-29T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2010), new DateTime("2010-01-04T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2011), new DateTime("2011-01-03T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2012), new DateTime("2012-01-02T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2013), new DateTime("2012-12-31T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2014), new DateTime("2013-12-30T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2015), new DateTime("2014-12-29T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2016), new DateTime("2016-01-04T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2017), new DateTime("2017-01-02T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2018), new DateTime("2018-01-01T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2019), new DateTime("2018-12-31T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2020), new DateTime("2019-12-30T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2021), new DateTime("2021-01-04T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2022), new DateTime("2022-01-03T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2023), new DateTime("2023-01-02T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2024), new DateTime("2024-01-01T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2025), new DateTime("2024-12-30T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2026), new DateTime("2025-12-29T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2027), new DateTime("2027-01-04T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2028), new DateTime("2028-01-03T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2029), new DateTime("2029-01-01T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearFirstDay(2030), new DateTime("2029-12-31T00:00:00Z"));
		});
	});

	describe("CreateISOFiscalYearLastDay", (): void => {
		it("should create a new instance with the correct last day of the fiscal year", (): void => {
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2000), new DateTime("2000-12-31T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2001), new DateTime("2001-12-30T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2002), new DateTime("2002-12-29T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2003), new DateTime("2003-12-28T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2004), new DateTime("2005-01-02T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2005), new DateTime("2006-01-01T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2006), new DateTime("2006-12-31T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2007), new DateTime("2007-12-30T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2008), new DateTime("2008-12-28T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2009), new DateTime("2010-01-03T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2010), new DateTime("2011-01-02T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2011), new DateTime("2012-01-01T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2012), new DateTime("2012-12-30T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2013), new DateTime("2013-12-29T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2014), new DateTime("2014-12-28T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2015), new DateTime("2016-01-03T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2016), new DateTime("2017-01-01T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2017), new DateTime("2017-12-31T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2018), new DateTime("2018-12-30T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2019), new DateTime("2019-12-29T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2020), new DateTime("2021-01-03T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2021), new DateTime("2022-01-02T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2022), new DateTime("2023-01-01T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2023), new DateTime("2023-12-31T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2024), new DateTime("2024-12-29T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2025), new DateTime("2025-12-28T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2026), new DateTime("2027-01-03T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2027), new DateTime("2028-01-02T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2028), new DateTime("2028-12-31T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2029), new DateTime("2029-12-30T00:00:00Z"));
			deepStrictEqual(DateTime.CreateISOFiscalYearLastDay(2030), new DateTime("2030-12-29T00:00:00Z"));
		});
	});

	describe("getTimestamp", (): void => {
		it("should return the timestamp", (): void => {
			deepStrictEqual(DateTime.CreateFrom(0).getTimestamp(), 0);
			deepStrictEqual(DateTime.CreateFrom(1).getTimestamp(), 1);
			deepStrictEqual(DateTime.CreateFrom(2).getTimestamp(), 2);
		});
	});

	describe("getISOYear", (): void => {
		it("should return the year", (): void => {
			for (let year: number = 2000; year <= 2030; ++year)
			{
				strictEqual(DateTime.CreateISO(year, 1, 1).getISOYear(), year);
				strictEqual(DateTime.CreateISO(year, 12, 31).getISOYear(), year);
			}
		});
	});

	describe("setISOYear", (): void => {
		it("should set the year", (): void => {
			const DATE: DateTime = DateTime.Create();

			DATE.setISOYear(1970);
			DATE.setISOYear(2000);
			DATE.setISOYear(2020);

			strictEqual(SET_YEAR_STUB.callCount, 3, "'setUTCFullYear' should have been called");
			deepStrictEqual(SET_YEAR_STUB.firstCall.args, [1970]);
			deepStrictEqual(SET_YEAR_STUB.secondCall.args, [2000]);
			deepStrictEqual(SET_YEAR_STUB.thirdCall.args, [2020]);
		});
	});

	describe("getISOMonth", (): void => {
		it("should return the month", (): void => {
			for (let year: number = 2020; year <= 2030; ++year)
			{
				for (let month: number = 1; month <= 12; ++month)
				{
					strictEqual(DateTime.CreateISO(year, month, 1).getISOMonth(), month);
					strictEqual(DateTime.CreateISO(year, month, 28).getISOMonth(), month);
				}
			}
		});
	});

	describe("setISOMonth", (): void => {
		it("should set the month", (): void => {
			const DATE: DateTime = DateTime.Create();

			DATE.setISOMonth(1);
			DATE.setISOMonth(9);
			DATE.setISOMonth(12);

			strictEqual(SET_MONTH_STUB.callCount, 3, "'setUTCMonth' should have been called");
			deepStrictEqual(SET_MONTH_STUB.firstCall.args, [0]);
			deepStrictEqual(SET_MONTH_STUB.secondCall.args, [8]);
			deepStrictEqual(SET_MONTH_STUB.thirdCall.args, [11]);
		});
	});

	describe("getISODay", (): void => {
		it("should return the day of the month", (): void => {
			for (let year: number = 2020; year <= 2030; ++year)
			{
				for (let month: number = 1; month <= 12; ++month)
				{
					for (let day: number = 1; day <= 28; ++day)
					{
						strictEqual(DateTime.CreateISO(year, month, day).getISODay(), day);
					}
				}
			}
		});
	});

	describe("setISODay", (): void => {
		it("should set the day of the month", (): void => {
			const DATE: DateTime = DateTime.Create();

			DATE.setISODay(1);
			DATE.setISODay(14);
			DATE.setISODay(28);

			strictEqual(SET_DAY_STUB.callCount, 3, "'setUTCDate' should have been called");
			deepStrictEqual(SET_DAY_STUB.firstCall.args, [1]);
			deepStrictEqual(SET_DAY_STUB.secondCall.args, [14]);
			deepStrictEqual(SET_DAY_STUB.thirdCall.args, [28]);
		});
	});

	describe("getISOWeekDay", (): void => {
		it("should return the day of the week", (): void => {
			strictEqual(DateTime.CreateISO(2001, 1, 1).getISOWeekDay(), 1);
			strictEqual(DateTime.CreateISO(2001, 1, 2).getISOWeekDay(), 2);
			strictEqual(DateTime.CreateISO(2001, 1, 3).getISOWeekDay(), 3);
			strictEqual(DateTime.CreateISO(2001, 1, 4).getISOWeekDay(), 4);
			strictEqual(DateTime.CreateISO(2001, 1, 5).getISOWeekDay(), 5);
			strictEqual(DateTime.CreateISO(2001, 1, 6).getISOWeekDay(), 6);
			strictEqual(DateTime.CreateISO(2001, 1, 7).getISOWeekDay(), 7);
		});
	});

	describe("getISOOrdinal", (): void => {
		it("should return the day of the year", (): void => {
			strictEqual(DateTime.CreateISO(2020, 1, 1).getISOOrdinal(), 1);
			strictEqual(DateTime.CreateISO(2021, 1, 1).getISOOrdinal(), 1);
			strictEqual(DateTime.CreateISO(2020, 3, 1).getISOOrdinal(), 61);
			strictEqual(DateTime.CreateISO(2021, 3, 1).getISOOrdinal(), 60);
			strictEqual(DateTime.CreateISO(2020, 12, 31).getISOOrdinal(), 366);
			strictEqual(DateTime.CreateISO(2021, 12, 31).getISOOrdinal(), 365);
		});
	});

	describe("getISOYearLength", (): void => {
		it("should return the number of days in the year", (): void => {
			const LEAP_YEARS: Array<number> = [2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040];

			for (let year: number = 2000; year <= 2040; ++year)
			{
				const YEAR_LENGTH: number = LEAP_YEARS.includes(year) ? 366 : 365;

				strictEqual(DateTime.CreateISO(year, 1, 1).getISOYearLength(), YEAR_LENGTH);
				strictEqual(DateTime.CreateISO(year, 5, 5).getISOYearLength(), YEAR_LENGTH);
				strictEqual(DateTime.CreateISO(year, 12, 31).getISOYearLength(), YEAR_LENGTH);
			}
		});
	});

	describe("isLeapISOYear", (): void => {
		it("should return false, unless the year is a leap year then it should return true", (): void => {
			const LEAP_YEARS: Array<number> = [2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040];

			for (let year: number = 2000; year <= 2040; ++year)
			{
				const LEAP_YEAR: boolean = LEAP_YEARS.includes(year);

				strictEqual(DateTime.CreateISO(year, 1, 1).isLeapISOYear(), LEAP_YEAR);
				strictEqual(DateTime.CreateISO(year, 5, 5).isLeapISOYear(), LEAP_YEAR);
				strictEqual(DateTime.CreateISO(year, 12, 31).isLeapISOYear(), LEAP_YEAR);
			}
		});
	});

	describe("getISOMonthLength", (): void => {
		it("should return the number of days in the month", (): void => {
			for (let year: number = 2020; year <= 2030; ++year)
			{
				strictEqual(DateTime.CreateISO(year, 1, 10).getISOMonthLength(), 31);
				strictEqual(DateTime.CreateISO(year, 3, 10).getISOMonthLength(), 31);
				strictEqual(DateTime.CreateISO(year, 4, 10).getISOMonthLength(), 30);
				strictEqual(DateTime.CreateISO(year, 5, 10).getISOMonthLength(), 31);
				strictEqual(DateTime.CreateISO(year, 6, 10).getISOMonthLength(), 30);
				strictEqual(DateTime.CreateISO(year, 7, 10).getISOMonthLength(), 31);
				strictEqual(DateTime.CreateISO(year, 8, 10).getISOMonthLength(), 31);
				strictEqual(DateTime.CreateISO(year, 9, 10).getISOMonthLength(), 30);
				strictEqual(DateTime.CreateISO(year, 10, 10).getISOMonthLength(), 31);
				strictEqual(DateTime.CreateISO(year, 11, 10).getISOMonthLength(), 30);
				strictEqual(DateTime.CreateISO(year, 12, 10).getISOMonthLength(), 31);
			}
		});

		it("should return the number of days in february according to leap year", (): void => {
			const LEAP_YEARS: Array<number> = [2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040];

			for (let year: number = 2000; year <= 2040; ++year)
			{
				const FEBRUARY_LENGTH: number = LEAP_YEARS.includes(year) ? 29 : 28;

				strictEqual(DateTime.CreateISO(year, 2, 10).getISOMonthLength(), FEBRUARY_LENGTH);
			}
		});
	});

	describe("getISOFiscalYear", (): void => {
		it("should return the fiscal year", (): void => {
			/* 2020-2021 */
			strictEqual(DateTime.CreateISO(2020, 12, 31).getISOFiscalYear(), 2020);
			strictEqual(DateTime.CreateISO(2021, 1, 1).getISOFiscalYear(), 2020);
			strictEqual(DateTime.CreateISO(2021, 1, 3).getISOFiscalYear(), 2020);
			strictEqual(DateTime.CreateISO(2021, 1, 4).getISOFiscalYear(), 2021);
			/* 2021-2022 */
			strictEqual(DateTime.CreateISO(2021, 12, 31).getISOFiscalYear(), 2021);
			strictEqual(DateTime.CreateISO(2022, 1, 1).getISOFiscalYear(), 2021);
			strictEqual(DateTime.CreateISO(2022, 1, 2).getISOFiscalYear(), 2021);
			strictEqual(DateTime.CreateISO(2022, 1, 3).getISOFiscalYear(), 2022);
			/* 2022-2023 */
			strictEqual(DateTime.CreateISO(2022, 12, 31).getISOFiscalYear(), 2022);
			strictEqual(DateTime.CreateISO(2023, 1, 1).getISOFiscalYear(), 2022);
			strictEqual(DateTime.CreateISO(2023, 1, 2).getISOFiscalYear(), 2023);
			/* 2023-2024 */
			strictEqual(DateTime.CreateISO(2023, 12, 31).getISOFiscalYear(), 2023);
			strictEqual(DateTime.CreateISO(2024, 1, 1).getISOFiscalYear(), 2024);
			/* 2024-2025 */
			strictEqual(DateTime.CreateISO(2024, 12, 29).getISOFiscalYear(), 2024);
			strictEqual(DateTime.CreateISO(2024, 12, 30).getISOFiscalYear(), 2025);
			strictEqual(DateTime.CreateISO(2024, 12, 31).getISOFiscalYear(), 2025);
			strictEqual(DateTime.CreateISO(2025, 1, 1).getISOFiscalYear(), 2025);
			/* 2025-2026 */
			strictEqual(DateTime.CreateISO(2025, 12, 28).getISOFiscalYear(), 2025);
			strictEqual(DateTime.CreateISO(2025, 12, 29).getISOFiscalYear(), 2026);
			strictEqual(DateTime.CreateISO(2025, 12, 30).getISOFiscalYear(), 2026);
			strictEqual(DateTime.CreateISO(2025, 12, 31).getISOFiscalYear(), 2026);
			strictEqual(DateTime.CreateISO(2026, 1, 1).getISOFiscalYear(), 2026);
			/* 2026-2027 */
			strictEqual(DateTime.CreateISO(2026, 12, 31).getISOFiscalYear(), 2026);
			strictEqual(DateTime.CreateISO(2027, 1, 1).getISOFiscalYear(), 2026);
			strictEqual(DateTime.CreateISO(2027, 1, 2).getISOFiscalYear(), 2026);
			strictEqual(DateTime.CreateISO(2027, 1, 3).getISOFiscalYear(), 2026);
			strictEqual(DateTime.CreateISO(2027, 1, 4).getISOFiscalYear(), 2027);
			/* 2027-2028 */
			strictEqual(DateTime.CreateISO(2027, 12, 31).getISOFiscalYear(), 2027);
			strictEqual(DateTime.CreateISO(2028, 1, 1).getISOFiscalYear(), 2027);
			strictEqual(DateTime.CreateISO(2028, 1, 2).getISOFiscalYear(), 2027);
			strictEqual(DateTime.CreateISO(2028, 1, 3).getISOFiscalYear(), 2028);
			/* 2028-2029 */
			strictEqual(DateTime.CreateISO(2028, 12, 31).getISOFiscalYear(), 2028);
			strictEqual(DateTime.CreateISO(2029, 1, 1).getISOFiscalYear(), 2029);
			/* 2029-2030 */
			strictEqual(DateTime.CreateISO(2029, 12, 30).getISOFiscalYear(), 2029);
			strictEqual(DateTime.CreateISO(2029, 12, 31).getISOFiscalYear(), 2030);
			strictEqual(DateTime.CreateISO(2030, 1, 1).getISOFiscalYear(), 2030);
		});
	});

	describe("setISOFiscalYear", (): void => {
		it("should set the fiscal year", (): void => {
			const DATE_1: DateTime = DateTime.CreateISOFiscal(2024, 1, 1);
			const DATE_2: DateTime = DateTime.CreateISOFiscal(2024, 10, 3);
			const DATE_3: DateTime = DateTime.CreateISOFiscal(2024, 30, 5);
			const DATE_4: DateTime = DateTime.CreateISOFiscal(2024, 50, 7);

			DATE_1.setISOFiscalYear(1970);
			DATE_2.setISOFiscalYear(1970);
			DATE_3.setISOFiscalYear(1970);
			DATE_4.setISOFiscalYear(1970);

			deepStrictEqual(DATE_1, DateTime.CreateISOFiscal(1970, 1, 1));
			deepStrictEqual(DATE_2, DateTime.CreateISOFiscal(1970, 10, 3));
			deepStrictEqual(DATE_3, DateTime.CreateISOFiscal(1970, 30, 5));
			deepStrictEqual(DATE_4, DateTime.CreateISOFiscal(1970, 50, 7));
		});
	});

	describe("getISOFiscalWeek", (): void => {
		it("should return the fiscal week", (): void => {
			for (let year: number = 2000; year <= 2040; ++year)
			{
				strictEqual(DateTime.CreateISO(year, 1, 4).getISOFiscalWeek(), 1);
				strictEqual(DateTime.CreateISOFiscal(year, 10, 4).getISOFiscalWeek(), 10);
			}

			for (let day: number = 1; day <= 7; ++day)
			{
				strictEqual(DateTime.CreateISO(2001, 1, day).getISOFiscalWeek(), 1);
				strictEqual(DateTime.CreateISO(2001, 10, day).getISOFiscalWeek(), 40);
				strictEqual(DateTime.CreateISO(2024, 1, day).getISOFiscalWeek(), 1);
				strictEqual(DateTime.CreateISO(2024, 4, day).getISOFiscalWeek(), 14);
			}
		});
	});

	describe("setISOFiscalWeek", (): void => {
		it("should set the fiscal week", (): void => {
			const DATE_1: DateTime = DateTime.CreateISOFiscal(2024, 1, 1);
			const DATE_2: DateTime = DateTime.CreateISOFiscal(2024, 10, 3);
			const DATE_3: DateTime = DateTime.CreateISOFiscal(2024, 30, 5);
			const DATE_4: DateTime = DateTime.CreateISOFiscal(2024, 50, 7);

			DATE_1.setISOFiscalWeek(5);
			DATE_2.setISOFiscalWeek(5);
			DATE_3.setISOFiscalWeek(5);
			DATE_4.setISOFiscalWeek(5);

			deepStrictEqual(DATE_1, DateTime.CreateISOFiscal(2024, 5, 1));
			deepStrictEqual(DATE_2, DateTime.CreateISOFiscal(2024, 5, 3));
			deepStrictEqual(DATE_3, DateTime.CreateISOFiscal(2024, 5, 5));
			deepStrictEqual(DATE_4, DateTime.CreateISOFiscal(2024, 5, 7));
		});
	});

	describe("getISOFiscalDay", (): void => {
		it("should return the day of the fiscal week", (): void => {
			strictEqual(DateTime.CreateISO(2001, 1, 1).getISOFiscalDay(), 1);
			strictEqual(DateTime.CreateISO(2001, 1, 2).getISOFiscalDay(), 2);
			strictEqual(DateTime.CreateISO(2001, 1, 3).getISOFiscalDay(), 3);
			strictEqual(DateTime.CreateISO(2001, 1, 4).getISOFiscalDay(), 4);
			strictEqual(DateTime.CreateISO(2001, 1, 5).getISOFiscalDay(), 5);
			strictEqual(DateTime.CreateISO(2001, 1, 6).getISOFiscalDay(), 6);
			strictEqual(DateTime.CreateISO(2001, 1, 7).getISOFiscalDay(), 7);
		});
	});

	describe("setISOFiscalDay", (): void => {
		it("should set the fiscal day", (): void => {
			const DATE_1: DateTime = DateTime.CreateISOFiscal(2024, 1, 1);
			const DATE_2: DateTime = DateTime.CreateISOFiscal(2024, 10, 3);
			const DATE_3: DateTime = DateTime.CreateISOFiscal(2024, 30, 5);
			const DATE_4: DateTime = DateTime.CreateISOFiscal(2024, 50, 7);

			DATE_1.setISOFiscalDay(7);
			DATE_2.setISOFiscalDay(7);
			DATE_3.setISOFiscalDay(1);
			DATE_4.setISOFiscalDay(1);

			deepStrictEqual(DATE_1, DateTime.CreateISOFiscal(2024, 1, 7));
			deepStrictEqual(DATE_2, DateTime.CreateISOFiscal(2024, 10, 7));
			deepStrictEqual(DATE_3, DateTime.CreateISOFiscal(2024, 30, 1));
			deepStrictEqual(DATE_4, DateTime.CreateISOFiscal(2024, 50, 1));
		});
	});

	describe("getISOFiscalOrdinal", (): void => {
		it("should return the day of the fiscal year", (): void => {
			/* 2020-2021 */
			strictEqual(DateTime.CreateISO(2020, 12, 31).getISOFiscalOrdinal(), 368);
			strictEqual(DateTime.CreateISO(2021, 1, 1).getISOFiscalOrdinal(), 369);
			strictEqual(DateTime.CreateISO(2021, 1, 2).getISOFiscalOrdinal(), 370);
			strictEqual(DateTime.CreateISO(2021, 1, 3).getISOFiscalOrdinal(), 371);
			strictEqual(DateTime.CreateISO(2021, 1, 4).getISOFiscalOrdinal(), 1);
			/* 2021-2022 */
			strictEqual(DateTime.CreateISO(2021, 12, 31).getISOFiscalOrdinal(), 362);
			strictEqual(DateTime.CreateISO(2022, 1, 1).getISOFiscalOrdinal(), 363);
			strictEqual(DateTime.CreateISO(2022, 1, 2).getISOFiscalOrdinal(), 364);
			strictEqual(DateTime.CreateISO(2022, 1, 3).getISOFiscalOrdinal(), 1);
			/* 2022-2023 */
			strictEqual(DateTime.CreateISO(2022, 12, 31).getISOFiscalOrdinal(), 363);
			strictEqual(DateTime.CreateISO(2023, 1, 1).getISOFiscalOrdinal(), 364);
			strictEqual(DateTime.CreateISO(2023, 1, 2).getISOFiscalOrdinal(), 1);
			/* 2023-2024 */
			strictEqual(DateTime.CreateISO(2023, 12, 31).getISOFiscalOrdinal(), 364);
			strictEqual(DateTime.CreateISO(2024, 1, 1).getISOFiscalOrdinal(), 1);
			/* 2024-2025 */
			strictEqual(DateTime.CreateISO(2024, 12, 29).getISOFiscalOrdinal(), 364);
			strictEqual(DateTime.CreateISO(2024, 12, 30).getISOFiscalOrdinal(), 1);
			strictEqual(DateTime.CreateISO(2024, 12, 31).getISOFiscalOrdinal(), 2);
			strictEqual(DateTime.CreateISO(2025, 1, 1).getISOFiscalOrdinal(), 3);
			/* 2025-2026 */
			strictEqual(DateTime.CreateISO(2025, 12, 28).getISOFiscalOrdinal(), 364);
			strictEqual(DateTime.CreateISO(2025, 12, 29).getISOFiscalOrdinal(), 1);
			strictEqual(DateTime.CreateISO(2025, 12, 30).getISOFiscalOrdinal(), 2);
			strictEqual(DateTime.CreateISO(2025, 12, 31).getISOFiscalOrdinal(), 3);
			strictEqual(DateTime.CreateISO(2026, 1, 1).getISOFiscalOrdinal(), 4);
			/* 2026-2027 */
			strictEqual(DateTime.CreateISO(2026, 12, 31).getISOFiscalOrdinal(), 368);
			strictEqual(DateTime.CreateISO(2027, 1, 1).getISOFiscalOrdinal(), 369);
			strictEqual(DateTime.CreateISO(2027, 1, 2).getISOFiscalOrdinal(), 370);
			strictEqual(DateTime.CreateISO(2027, 1, 3).getISOFiscalOrdinal(), 371);
			strictEqual(DateTime.CreateISO(2027, 1, 4).getISOFiscalOrdinal(), 1);
			/* 2027-2028 */
			strictEqual(DateTime.CreateISO(2027, 12, 31).getISOFiscalOrdinal(), 362);
			strictEqual(DateTime.CreateISO(2028, 1, 1).getISOFiscalOrdinal(), 363);
			strictEqual(DateTime.CreateISO(2028, 1, 2).getISOFiscalOrdinal(), 364);
			strictEqual(DateTime.CreateISO(2028, 1, 3).getISOFiscalOrdinal(), 1);
			/* 2028-2029 */
			strictEqual(DateTime.CreateISO(2028, 12, 31).getISOFiscalOrdinal(), 364);
			strictEqual(DateTime.CreateISO(2029, 1, 1).getISOFiscalOrdinal(), 1);
			/* 2029-2030 */
			strictEqual(DateTime.CreateISO(2029, 12, 30).getISOFiscalOrdinal(), 364);
			strictEqual(DateTime.CreateISO(2029, 12, 31).getISOFiscalOrdinal(), 1);
			strictEqual(DateTime.CreateISO(2030, 1, 1).getISOFiscalOrdinal(), 2);
		});
	});

	describe("getISOFiscalYearLength", (): void => {
		it("should return 53 if the fiscal year is a long year, or 52 otherwise", (): void => {
			for (let year: number = 2000; year <= 2100; ++year)
			{
				const WEEK_COUNT: number = LONG_YEARS.includes(year) ? 53 : 52;

				strictEqual(DateTime.CreateISO(year, 1, 5).getISOFiscalYearLength(), WEEK_COUNT);
			}
		});
	});

	describe("isLongISOFiscalYear", (): void => {
		it("should return 53 if the fiscal year is a long year, or 52 otherwise", (): void => {
			for (let year: number = 2000; year <= 2100; ++year)
			{
				const IS_LONG: boolean = LONG_YEARS.includes(year);

				strictEqual(DateTime.CreateISO(year, 1, 5).isLongISOFiscalYear(), IS_LONG);
			}
		});
	});

	describe("getISOHours", (): void => {
		it("should return the hours", (): void => {
			strictEqual(DateTime.CreateFrom("2000-01-01T00:00:00.000Z").getISOHours(), 0);
			strictEqual(DateTime.CreateFrom("2000-01-01T11:00:00.000Z").getISOHours(), 11);
			strictEqual(DateTime.CreateFrom("2000-01-01T20:00:00.000Z").getISOHours(), 20);

			strictEqual(GET_HOURS_STUB.callCount, 3, "'getUTCHours' should have been called");
		});
	});

	describe("setISOHours", (): void => {
		it("should set the hours", (): void => {
			DateTime.Create().setISOHours(0);
			DateTime.Create().setISOHours(11);
			DateTime.Create().setISOHours(20);

			strictEqual(SET_HOURS_STUB.callCount, 3, "'setUTCHours' should have been called");
			deepStrictEqual(SET_HOURS_STUB.firstCall.args, [0]);
			deepStrictEqual(SET_HOURS_STUB.secondCall.args, [11]);
			deepStrictEqual(SET_HOURS_STUB.thirdCall.args, [20]);
		});
	});

	describe("getISOMinutes", (): void => {
		it("should return the minutes", (): void => {
			strictEqual(DateTime.CreateFrom("2000-01-01T00:00:00.000Z").getISOMinutes(), 0);
			strictEqual(DateTime.CreateFrom("2000-01-01T00:11:00.000Z").getISOMinutes(), 11);
			strictEqual(DateTime.CreateFrom("2000-01-01T00:20:00.000Z").getISOMinutes(), 20);

			strictEqual(GET_MINUTES_STUB.callCount, 3, "'getUTCMinutes' should have been called");
		});
	});

	describe("setISOMinutes", (): void => {
		it("should set the minutes", (): void => {
			DateTime.Create().setISOMinutes(0);
			DateTime.Create().setISOMinutes(11);
			DateTime.Create().setISOMinutes(20);

			strictEqual(SET_MINUTES_STUB.callCount, 3, "'setUTCMinutes' should have been called");
			deepStrictEqual(SET_MINUTES_STUB.firstCall.args, [0]);
			deepStrictEqual(SET_MINUTES_STUB.secondCall.args, [11]);
			deepStrictEqual(SET_MINUTES_STUB.thirdCall.args, [20]);
		});
	});

	describe("getISOSeconds", (): void => {
		it("should return the seconds", (): void => {
			strictEqual(DateTime.CreateFrom("2000-01-01T00:00:00.000Z").getISOSeconds(), 0);
			strictEqual(DateTime.CreateFrom("2000-01-01T00:00:11.000Z").getISOSeconds(), 11);
			strictEqual(DateTime.CreateFrom("2000-01-01T00:00:20.000Z").getISOSeconds(), 20);

			strictEqual(GET_SECONDS_STUB.callCount, 3, "'getUTCSeconds' should have been called");
		});
	});

	describe("setISOSeconds", (): void => {
		it("should set the seconds", (): void => {
			DateTime.Create().setISOSeconds(0);
			DateTime.Create().setISOSeconds(11);
			DateTime.Create().setISOSeconds(20);

			strictEqual(SET_SECONDS_STUB.callCount, 3, "'setUTCSeconds' should have been called");
			deepStrictEqual(SET_SECONDS_STUB.firstCall.args, [0]);
			deepStrictEqual(SET_SECONDS_STUB.secondCall.args, [11]);
			deepStrictEqual(SET_SECONDS_STUB.thirdCall.args, [20]);
		});
	});

	describe("getISOMilliseconds", (): void => {
		it("should return the milliseconds", (): void => {
			strictEqual(DateTime.CreateFrom("2000-01-01T00:00:00.000Z").getISOMilliseconds(), 0);
			strictEqual(DateTime.CreateFrom("2000-01-01T00:00:00.011Z").getISOMilliseconds(), 11);
			strictEqual(DateTime.CreateFrom("2000-01-01T00:00:00.020Z").getISOMilliseconds(), 20);

			strictEqual(GET_MILLISECONDS_STUB.callCount, 3, "'getUTCMilliseconds' should have been called");
		});
	});

	describe("setISOMilliseconds", (): void => {
		it("should set the milliseconds", (): void => {
			DateTime.Create().setISOMilliseconds(0);
			DateTime.Create().setISOMilliseconds(11);
			DateTime.Create().setISOMilliseconds(20);

			strictEqual(SET_MILLISECONDS_STUB.callCount, 3, "'setUTCMilliseconds' should have been called");
			deepStrictEqual(SET_MILLISECONDS_STUB.firstCall.args, [0]);
			deepStrictEqual(SET_MILLISECONDS_STUB.secondCall.args, [11]);
			deepStrictEqual(SET_MILLISECONDS_STUB.thirdCall.args, [20]);
		});
	});

	describe("getISOMidnight", (): void => {
		it("should return a new DateTime with the time at midnight", (): void => {
			deepStrictEqual(DateTime.CreateFrom("2000-01-01T12:34:56.912Z").getISOMidnight(), new DateTime("2000-01-01T00:00:00.000Z"));
			deepStrictEqual(DateTime.CreateFrom("2000-10-20T12:34:56.912Z").getISOMidnight(), new DateTime("2000-10-20T00:00:00.000Z"));
			deepStrictEqual(DateTime.CreateFrom("2010-01-01T12:34:56.912Z").getISOMidnight(), new DateTime("2010-01-01T00:00:00.000Z"));
			deepStrictEqual(DateTime.CreateFrom("2020-10-20T12:34:56.912Z").getISOMidnight(), new DateTime("2020-10-20T00:00:00.000Z"));
		});
	});

	describe("getISODifferenceInDays", (): void => {
		it("should return the difference in days", (): void => {
			strictEqual(DateTime.CreateISO(2020, 1, 1).getISODifferenceInDays(DateTime.CreateISO(2020, 1, 1)), 0);
			strictEqual(DateTime.CreateISO(2020, 1, 2).getISODifferenceInDays(DateTime.CreateISO(2020, 1, 1)), 1);
			strictEqual(DateTime.CreateISO(2020, 1, 1).getISODifferenceInDays(DateTime.CreateISO(2020, 1, 2)), -1);
			strictEqual(DateTime.CreateISO(2020, 12, 31).getISODifferenceInDays(DateTime.CreateISO(2020, 1, 1)), 365);
			strictEqual(DateTime.CreateISO(2021, 12, 31).getISODifferenceInDays(DateTime.CreateISO(2021, 1, 1)), 364);
			strictEqual(DateTime.CreateISO(2020, 1, 1).getISODifferenceInDays(DateTime.CreateISO(2020, 12, 31)), -365);
			strictEqual(DateTime.CreateISO(2021, 1, 1).getISODifferenceInDays(DateTime.CreateISO(2021, 12, 31)), -364);
		});
	});

	describe("getISODateTime", (): void => {
		it("should return the formatted date and time", (): void => {
			strictEqual(DateTime.CreateFrom("2000-01-01T00:00:00.000Z").getISODateTime(), "2000-01-01 00:00:00");
			strictEqual(DateTime.CreateFrom("2000-10-20T12:34:56.912Z").getISODateTime(), "2000-10-20 12:34:56");
			strictEqual(DateTime.CreateFrom("2010-01-01T20:45:00.000Z").getISODateTime(), "2010-01-01 20:45:00");
			strictEqual(DateTime.CreateFrom("2020-10-20T16:00:00.000Z").getISODateTime(), "2020-10-20 16:00:00");
		});
	});

	describe("getISODate", (): void => {
		it("should return the formatted date", (): void => {
			strictEqual(DateTime.CreateFrom("2000-01-01T00:00:00.000Z").getISODate(), "2000-01-01");
			strictEqual(DateTime.CreateFrom("2000-10-20T12:34:56.912Z").getISODate(), "2000-10-20");
			strictEqual(DateTime.CreateFrom("2010-01-01T20:45:00.000Z").getISODate(), "2010-01-01");
			strictEqual(DateTime.CreateFrom("2020-10-20T16:00:00.000Z").getISODate(), "2020-10-20");
		});
	});

	describe("getISOTime", (): void => {
		it("should return the formatted time", (): void => {
			strictEqual(DateTime.CreateFrom("2000-01-01T00:00:00.000Z").getISOTime(), "00:00:00");
			strictEqual(DateTime.CreateFrom("2000-10-20T12:34:56.912Z").getISOTime(), "12:34:56");
			strictEqual(DateTime.CreateFrom("2010-01-01T20:45:00.000Z").getISOTime(), "20:45:00");
			strictEqual(DateTime.CreateFrom("2020-10-20T16:00:00.000Z").getISOTime(), "16:00:00");
		});
	});

	describe("getISOTag", (): void => {
		it("should return the formatted tag", (): void => {
			strictEqual(DateTime.CreateFrom("2000-01-01T00:00:00.000Z").getISOTag(), "2000-01-01_00-00-00");
			strictEqual(DateTime.CreateFrom("2000-10-20T12:34:56.912Z").getISOTag(), "2000-10-20_12-34-56");
			strictEqual(DateTime.CreateFrom("2010-01-01T20:45:00.000Z").getISOTag(), "2010-01-01_20-45-00");
			strictEqual(DateTime.CreateFrom("2020-10-20T16:00:00.000Z").getISOTag(), "2020-10-20_16-00-00");
		});
	});

	describe("getTimezone", (): void => {
		it("should return the timezone (CET)", (): void => {
			GET_TIMEZONE_OFFSET_STUB.onFirstCall().returns(-60);
			GET_TIMEZONE_OFFSET_STUB.onSecondCall().returns(-120);
			GET_TIMEZONE_OFFSET_STUB.onThirdCall().returns(210);
			strictEqual(DateTime.Create().getTimezone(), "+01:00");
			strictEqual(DateTime.Create().getTimezone(), "+02:00");
			strictEqual(DateTime.Create().getTimezone(), "-03:30");
		});
	});

	describe("format", (): void => {
		it("should replace 'Y' by the year", (): void => {
			strictEqual(DateTime.CreateFrom("2000-03-07T01:02:03.017Z").format("Y"), "2000");
			strictEqual(DateTime.CreateFrom("2000-10-20T12:34:56.912Z").format("Y"), "2000");
		});

		it("should replace 'm' by the month (padded)", (): void => {
			strictEqual(DateTime.CreateFrom("2000-03-07T01:02:03.017Z").format("m"), "03");
			strictEqual(DateTime.CreateFrom("2000-10-20T12:34:56.912Z").format("m"), "10");
		});

		it("should replace 'd' by the day (padded)", (): void => {
			strictEqual(DateTime.CreateFrom("2000-03-07T01:02:03.017Z").format("d"), "07");
			strictEqual(DateTime.CreateFrom("2000-10-20T12:34:56.912Z").format("d"), "20");
		});

		it("should replace 'H' by the hours (padded)", (): void => {
			strictEqual(DateTime.CreateFrom("2000-03-07T01:02:03.017Z").format("H"), "01");
			strictEqual(DateTime.CreateFrom("2000-10-20T12:34:56.912Z").format("H"), "12");
		});

		it("should replace 'i' by the minutes (padded)", (): void => {
			strictEqual(DateTime.CreateFrom("2000-03-07T01:02:03.017Z").format("i"), "02");
			strictEqual(DateTime.CreateFrom("2000-10-20T12:34:56.912Z").format("i"), "34");
		});

		it("should replace 's' by the seconds (padded)", (): void => {
			strictEqual(DateTime.CreateFrom("2000-03-07T01:02:03.017Z").format("s"), "03");
			strictEqual(DateTime.CreateFrom("2000-10-20T12:34:56.912Z").format("s"), "56");
		});

		it("should return the expected format", (): void => {
			const EXPECTED: string = "10/2000/20/20 34 20-12-34 5656";

			strictEqual(DateTime.CreateFrom("2000-10-20T12:34:56.912Z").format("m/Y/d/d i d-H-i ss"), EXPECTED);
		});
	});
});
