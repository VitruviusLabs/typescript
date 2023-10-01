import { MillisecondEnum } from "./Time/MillisecondEnum.mjs";

import { TimeFormattingEnum } from "./Time/TimeFormattingEnum.mjs";

class Time extends Date
{
	/**
	 * format
	 * @TODO: Could be improved and expanded.
	 */
	public format(expected_format: string): string
	{
		let output: string = expected_format;

		const RAW_YEAR: number = this.getUTCFullYear();
		const RAW_MONTH: number = this.getUTCMonth() + 1;
		const RAW_DAY: number = this.getUTCDate();
		const RAW_HOURS: number = this.getUTCHours();
		const RAW_MINUTES: number = this.getUTCMinutes();
		const RAW_SECONDS: number = this.getUTCSeconds();

		output = output.replace(/Y/g, RAW_YEAR.toString());
		output = output.replace(/m/g, RAW_MONTH.toString().padStart(TimeFormattingEnum.DEFAULT_PAD_LENGTH, "0"));
		output = output.replace(/d/g, RAW_DAY.toString().padStart(TimeFormattingEnum.DEFAULT_PAD_LENGTH, "0"));
		output = output.replace(/H/g, RAW_HOURS.toString().padStart(TimeFormattingEnum.DEFAULT_PAD_LENGTH, "0"));
		output = output.replace(/i/g, RAW_MINUTES.toString().padStart(TimeFormattingEnum.DEFAULT_PAD_LENGTH, "0"));
		output = output.replace(/s/g, RAW_SECONDS.toString().padStart(TimeFormattingEnum.DEFAULT_PAD_LENGTH, "0"));

		return output;
	}

	/**
	 * getDaysBetween
	 */
	public getNumberOfDaysBetween(date: Date): number
	{
		const MILLISECONDS_DIFFERENCE: number = this.getTime() - date.getTime();
		const DIFFERENCE: number = MILLISECONDS_DIFFERENCE / MillisecondEnum.DAY;

		return Math.round(DIFFERENCE);
	}
}

export { Time };
