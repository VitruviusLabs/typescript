import { expect } from "chai";

import { describe, it } from "mocha";

import { getName } from "../../src/TypeHint/getName.js";

import { DummyClass, GroupType, OldDummyClass, getInvertedValues } from "../Utils.js";

const DUMMY = new DummyClass();

describe(
	"TypeHint / getName",
	(): void =>
	{
		it(
			"should return the name of a given function, generator function, method, or class",
			(): void =>
			{
				function dummyFunction() {}

				function* dummyGenerator()
				{
					yield 1;
				}

				expect(getName(dummyFunction)).to.equal("dummyFunction");
				expect(getName(dummyGenerator)).to.equal("dummyGenerator");
				expect(getName(DummyClass.Method)).to.equal("Method");
				expect(getName(DummyClass)).to.equal("DummyClass");
				expect(getName(OldDummyClass)).to.equal("OldDummyClass");
			}
		);

		it(
			"should return the name of the constructor of a given object",
			(): void =>
			{
				expect(getName([])).to.equal("Array");
				expect(getName({})).to.equal("Object");
				expect(getName(DUMMY)).to.equal("DummyClass");
			}
		);

		it(
			"should return an empty string if when given a value that has no name",
			(): void =>
			{
				const VALUES: Array<unknown> = [
					// @ts-ignore
					new (function () {})(),
					Object.create(null),
					new (class {})(),
					(): void => {},
					function () {},
					function* () { yield 1; },
					class {}
				];

				for (const ITEM of VALUES)
				{
					expect(getName(ITEM)).to.equal("");
				}
			}
		);

		it(
			"should return undefined when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.FUNCTION_CLASS, GroupType.OBJECT);

				for (const ITEM of VALUES)
				{
					expect(getName(ITEM)).to.equal(undefined);
				}
			}
		);
	}
);
