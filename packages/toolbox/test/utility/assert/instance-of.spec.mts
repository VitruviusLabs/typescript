import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { instanceOf } from "../../../src/_index.mjs";

describe("instanceOf", (): void => {
	it("should return if the value is an instance of the expected constructor", (): void => {
		doesNotThrow((): void => { instanceOf(new Date(), Date); });
		doesNotThrow((): void => { instanceOf(new Date(), Object); });
	});

	it("should throw if the value is not an instance of the expected constructor", (): void => {
		throws((): void => { instanceOf({}, Date); });
		throws((): void => { instanceOf(Object.create(null), Date); });
	});
});
