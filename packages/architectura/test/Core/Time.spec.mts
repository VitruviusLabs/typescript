
import { default as assert } from "node:assert/strict";

import { describe, it } from "node:test";

import { Time, TimeFormattingEnum } from "../../src/index.mjs";

describe(
	"Time",
	(): void =>
	{
		describe(
			"format",
			(): void =>
			{
				it(
					"should output the year in place of the 'Y' character when the format contains it.",
					(): void =>
					{
						const TIME: Time = new Time();

						const EXPECTED_OUTPUT: string = TIME.getUTCFullYear().toString()
							.padStart(TimeFormattingEnum.DEFAULT_PAD_LENGTH, "0");

						assert.strictEqual(TIME.format("Y"), EXPECTED_OUTPUT);
					}
				);

				it(
					"should output the month in place of the 'm' character when the format contains it.",
					(): void =>
					{
						const TIME: Time = new Time();

						const EXPECTED_OUTPUT: string = (TIME.getUTCMonth() + 1).toString()
							.padStart(TimeFormattingEnum.DEFAULT_PAD_LENGTH, "0");

						assert.strictEqual(TIME.format("m"), EXPECTED_OUTPUT);
					}
				);

				it(
					"should output the day in place of the 'd' character when the format contains it.",
					(): void =>
					{
						const TIME: Time = new Time();

						const EXPECTED_OUTPUT: string = TIME.getUTCDate().toString()
							.padStart(TimeFormattingEnum.DEFAULT_PAD_LENGTH, "0");

						assert.strictEqual(TIME.format("d"), EXPECTED_OUTPUT);
					}
				);

				it(
					"should output the hours in place of the 'H' character when the format contains it.",
					(): void =>
					{
						const TIME: Time = new Time();

						const EXPECTED_OUTPUT: string = TIME.getUTCHours().toString()
							.padStart(TimeFormattingEnum.DEFAULT_PAD_LENGTH, "0");

						assert.strictEqual(TIME.format("H"), EXPECTED_OUTPUT);
					}
				);

				it(
					"should output the minutes in place of the 'i' character when the format contains it.",
					(): void =>
					{
						const TIME: Time = new Time();

						const EXPECTED_OUTPUT: string = TIME.getUTCMinutes().toString()
							.padStart(TimeFormattingEnum.DEFAULT_PAD_LENGTH, "0");

						assert.strictEqual(TIME.format("i"), EXPECTED_OUTPUT);
					}
				);

				it(
					"should output the seconds in place of the 's' character when the format contains it.",
					(): void =>
					{
						const TIME: Time = new Time();

						const EXPECTED_OUTPUT: string = TIME.getUTCSeconds().toString()
							.padStart(TimeFormattingEnum.DEFAULT_PAD_LENGTH, "0");

						assert.strictEqual(TIME.format("s"), EXPECTED_OUTPUT);
					}
				);
			}
		);

		describe(
			"getNumberOfDaysBetween",
			(): void =>
			{
				it(
					"should properly calculate the difference when the input date is in the future.",
					(): void =>
					{
						const TIME: Time = new Time();

						const INPUT_DATE: Date = new Date();

						INPUT_DATE.setDate(INPUT_DATE.getDate() + 1);

						assert.strictEqual(TIME.getNumberOfDaysBetween(INPUT_DATE), -1);
					}
				);

				it(
					"should properly calculate the difference when the input date is in the past.",
					(): void =>
					{
						const TIME: Time = new Time();

						const INPUT_DATE: Date = new Date();

						INPUT_DATE.setDate(INPUT_DATE.getDate() - 1);

						assert.strictEqual(TIME.getNumberOfDaysBetween(INPUT_DATE), 1);
					}
				);
			}
		);
	}
);
