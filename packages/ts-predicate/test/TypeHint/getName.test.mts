import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { getName } from "../../src/TypeHint/getName.mjs";

import { DummyClass, GroupType, OldDummyClass, getInvertedValues } from "../common/getValues.mjs";

const DUMMY: DummyClass = new DummyClass();

describe(
	"TypeHint / getName",
	(): void =>
	{
		it(
			"should return the name of a given function, generator function, method, or class",
			(): void =>
			{
				function dummyFunction(): void { }

				// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Dummy
				function* dummyGenerator()
				{
					yield 1;
				}

				strictEqual(getName(dummyFunction), "dummyFunction");
				strictEqual(getName(dummyGenerator), "dummyGenerator");
				strictEqual(getName(DummyClass.Method), "Method");
				strictEqual(getName(DummyClass), "DummyClass");
				strictEqual(getName(OldDummyClass), "OldDummyClass");
			}
		);

		it(
			"should return the name of the constructor of a given object",
			(): void =>
			{
				strictEqual(getName([]), "Array");
				strictEqual(getName({}), "Object");
				strictEqual(getName(DUMMY), "DummyClass");
			}
		);

		it(
			"should return an empty string if when given a value that has no name",
			(): void =>
			{
				const VALUES: Array<unknown> = [
					// @ts-expect-error: old notation
					new (function (): void { })(),
					Object.create(null),
					new (class { })(),
					(): void => { },
					function (): void { },
					// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Dummy
					function* () { yield 1; },
					class { }
				];

				for (const ITEM of VALUES)
				{
					strictEqual(getName(ITEM), "");
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
					strictEqual(getName(ITEM), undefined);
				}
			}
		);
	}
);
