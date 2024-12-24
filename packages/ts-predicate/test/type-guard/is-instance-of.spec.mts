import { doesNotThrow, fail, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { consumeValue, createValue, getAllValues } from "@vitruvius-labs/testing-ground";
import { TypeGuard } from "../../src/_index.mjs";

describe("TypeGuard.isInstanceOf", (): void => {
	it("should return true when given an instance of the given class", (): void => {
		strictEqual(TypeGuard.isInstanceOf(new Date(), Date), true);
	});

	it("should throw when given anything else", (): void => {
		const ALL_VALUES: Array<unknown> = getAllValues();

		for (const ITEM of ALL_VALUES)
		{
			strictEqual(TypeGuard.isInstanceOf(ITEM, Date), false);
		}
	});

	it("should support abstract classes", (): void => {
		abstract class Parent {}

		class Child extends Parent {}

		const CHILD: Child = new Child();

		strictEqual(TypeGuard.isInstanceOf(CHILD, Parent), true);
	});

	it("should narrow type in typescript too", (): void => {
		const DUMMY: unknown = new Date(0);

		if (TypeGuard.isInstanceOf(DUMMY, Date))
		{
			strictEqual(DUMMY.getTime(), 0);
		}
		else
		{
			fail("TypeGuard.isInstanceOf() failed to narrow the type.");
		}
	});

	it("should narrow the type to an instance of constructor (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (TypeGuard.isInstanceOf(VALUE, Date))
			{
				consumeValue<Date>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to an instance of constructor (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: Date | undefined = createValue();

			if (TypeGuard.isInstanceOf(VALUE, Object))
			{
				consumeValue<Date>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
