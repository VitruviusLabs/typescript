import type { StructuredDataDescriptor } from "../../src/_index.mjs";
import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";
import { getStructuredDataPropertyDescriptor } from "../../src/utils/get-structured-data-property-descriptor.mjs";
import { isString } from "../../src/type-guard/is-string.mjs";
import { isNumber } from "../../src/type-guard/is-number.mjs";

describe("TypeGuard / common/utils / getTypeAssertionStructuredDataDescriptor", (): void => {
	it("should return the corresponding property descriptor", (): void => {
		interface Dummy
		{
			foo: number;
			bar?: string;
			qux: boolean;
		}

		const DESCRIPTOR: StructuredDataDescriptor<Dummy> = {
			foo: {
				test: isNumber,
			},
			bar: {
				test: isString,
				optional: true,
			},
			qux: {
				ignore: true,
			},
		};

		const PROPERTY_DESCRIPTOR_FOO: unknown = getStructuredDataPropertyDescriptor(DESCRIPTOR, "foo");
		const PROPERTY_DESCRIPTOR_BAR: unknown = getStructuredDataPropertyDescriptor(DESCRIPTOR, "bar");
		const PROPERTY_DESCRIPTOR_QUX: unknown = getStructuredDataPropertyDescriptor(DESCRIPTOR, "qux");

		deepStrictEqual(PROPERTY_DESCRIPTOR_FOO, DESCRIPTOR.foo);
		deepStrictEqual(PROPERTY_DESCRIPTOR_BAR, DESCRIPTOR.bar);
		deepStrictEqual(PROPERTY_DESCRIPTOR_QUX, DESCRIPTOR.qux);
	});

	it("should wrap test into a property descriptor", (): void => {
		interface Dummy
		{
			foo: number;
			bar: string;
		}

		const DESCRIPTOR: StructuredDataDescriptor<Dummy> = {
			foo: isNumber,
			bar: isString,
		};

		const PROPERTY_DESCRIPTOR_FOO: unknown = getStructuredDataPropertyDescriptor(DESCRIPTOR, "foo");
		const PROPERTY_DESCRIPTOR_BAR: unknown = getStructuredDataPropertyDescriptor(DESCRIPTOR, "bar");

		deepStrictEqual(PROPERTY_DESCRIPTOR_FOO, { test: DESCRIPTOR.foo });
		deepStrictEqual(PROPERTY_DESCRIPTOR_BAR, { test: DESCRIPTOR.bar });
	});
});
