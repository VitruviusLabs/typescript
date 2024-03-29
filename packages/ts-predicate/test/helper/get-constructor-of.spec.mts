import { strictEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { Helper } from "../../src/_index.mjs";
import { createErrorTest } from "@vitruvius-labs/testing-ground";

describe("Helper.getConstructorOf", (): void => {
	it("should return the constructor of the given object", (): void => {
		strictEqual(Helper.getConstructorOf(new Date()), Date);
		strictEqual(Helper.getConstructorOf(new Map()), Map);
		strictEqual(Helper.getConstructorOf(new Set()), Set);
	});

	it("should throw when given an object without prototype", (): void => {
		const WRAPPER = (): void =>
		{
			Helper.getConstructorOf(Object.create(null));
		};

		throws(WRAPPER, createErrorTest("The value has no prototype."));
	});

	it("should throw when given an object without constructor", (): void => {
		const WRAPPER = (): void =>
		{
			Helper.getConstructorOf(Object.create(Object.create(null)));
		};

		throws(WRAPPER, createErrorTest("The value has no constructor."));
	});
});
