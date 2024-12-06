import { strictEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { TypeAssertion } from "../../src/_index.mjs";
import { createErrorTest, getAllValues } from "@vitruvius-labs/testing-ground";

describe("TypeAssertion.assertInstanceOf", (): void => {
	it("should return when given an instance of the given class", (): void => {
		TypeAssertion.assertInstanceOf(new Date(), Date);
	});

	it("should throw when given anything else", (): void => {
		const ALL_VALUES: Array<unknown> = getAllValues();

		for (const ITEM of ALL_VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertInstanceOf(ITEM, Date);
			};

			throws(WRAPPER, createErrorTest());
		}
	});

	it("should support abstract classes", (): void => {
		abstract class Parent {}

		class Child extends Parent {}

		const CHILD: Child = new Child();

		TypeAssertion.assertInstanceOf(CHILD, Parent);
	});

	it("should narrow type in typescript too", (): void => {
		const DUMMY: unknown = new Date(0);

		TypeAssertion.assertInstanceOf(DUMMY, Date);

		strictEqual(DUMMY.getTime(), 0);
	});
});
