import { deepStrictEqual, strictEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { getConstructorOf } from "../../src/_index.mjs";
import { createErrorTest, createValue } from "@vitruvius-labs/testing-ground";

describe("getConstructorOf", (): void => {
	it("should return the constructor of the given object", (): void => {
		strictEqual(getConstructorOf(new Date()), Date);
		strictEqual(getConstructorOf(new Map()), Map);
		strictEqual(getConstructorOf(new Set()), Set);
	});

	it("should throw when given an object without prototype", (): void => {
		const WRAPPER = (): void =>
		{
			getConstructorOf(Object.create(null));
		};

		throws(WRAPPER, createErrorTest("The value has no prototype."));
	});

	it("should throw when given an object without constructor", (): void => {
		const WRAPPER = (): void =>
		{
			getConstructorOf(Object.create(Object.create(null)));
		};

		throws(WRAPPER, createErrorTest("The value has no constructor."));
	});

	it("should return a constructor that can be instantiated", (): void => {
		const EXPECTED: Date = new Date(0);

		const CONSTRUCTOR: typeof Date = getConstructorOf(EXPECTED);

		const INSTANCE: Date = new CONSTRUCTOR(0);

		deepStrictEqual(INSTANCE, EXPECTED);
	});

	it("should return a constructor that cannot be instantiated if the class is abstract", (): void => {
		throws((): void => {
			abstract class Foo
			{
				protected foo: string;

				public constructor(foo: string)
				{
					this.foo = foo;
				}

				public abstract setFoo(foo: string): void;
				public abstract getFoo(): string;
			}

			const CONSTRUCTOR: typeof Foo = getConstructorOf(createValue<Foo>());

			// @ts-expect-error -- Cannot instantiate abstract class
			new CONSTRUCTOR("foo");
		});
	});
});
