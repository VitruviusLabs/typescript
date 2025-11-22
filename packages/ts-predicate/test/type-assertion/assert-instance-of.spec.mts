import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { consumeValue, createErrorTest, createValue, getAllValues } from "@vitruvius-labs/testing-ground";
import { assertInstanceOf } from "../../src/_index.mjs";

describe("assertInstanceOf", (): void => {
	it("should return when given an instance of the given class", (): void => {
		const WRAPPER = (): void =>
		{
			assertInstanceOf(new Date(), Date);
		};

		doesNotThrow(WRAPPER);
	});

	it("should throw when given anything else", (): void => {
		const ALL_VALUES: Array<unknown> = getAllValues();

		for (const ITEM of ALL_VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertInstanceOf(ITEM, Date);
			};

			throws(WRAPPER, createErrorTest());
		}
	});

	it("should support abstract classes", (): void => {
		abstract class Parent {}

		class Child extends Parent {}

		const CHILD: Child = new Child();

		assertInstanceOf(CHILD, Parent);
	});

	it("should narrow the type to an instance of constructor (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			assertInstanceOf(VALUE, Date);
			consumeValue<Date>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to an instance of constructor (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: Date | undefined = createValue();

			assertInstanceOf(VALUE, Object);
			consumeValue<Date>(VALUE);
		};

		throws(WRAPPER);
	});
});
