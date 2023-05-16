import { strictEqual } from "assert";

import { describe, it } from "node:test";

import { getBaseType } from "../../src/TypeHint/getBaseType.js";

import { BaseType, DummyClass, GroupType, OldDummyClass, getValues } from "../common/utils.js";

const DUMMY = new DummyClass();
const OLD_DUMMY = new OldDummyClass();

function trapDummy()
{
	// eslint-disable-next-line @typescript-eslint/naming-convention -- Old class notation
	function TrapDummyClass() { }

	function* trapDummyGenerator()
	{
		yield 1;
	}

	// @ts-ignore
	new TrapDummyClass();
	trapDummyGenerator();
}

describe(
	"TypeHint / getBaseType",
	(): void =>
	{
		it(
			'should return "undefined" when given undefined',
			(): void =>
			{
				strictEqual(getBaseType(undefined), "undefined");
			}
		);

		it(
			'should return "null" when given null',
			(): void =>
			{
				strictEqual(getBaseType(null), "null");
			}
		);

		it(
			'should return "NaN" when given NaN',
			(): void =>
			{
				strictEqual(getBaseType(Number.NaN), "NaN");
			}
		);

		it(
			'should return "boolean" when given a boolean',
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.BOOLEAN);

				for (const ITEM of VALUES)
				{
					strictEqual(getBaseType(ITEM), "boolean");
				}
			}
		);

		it(
			'should return "number" when given a number',
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.NUMBER);

				for (const ITEM of VALUES)
				{
					strictEqual(getBaseType(ITEM), "number");
				}
			}
		);

		it(
			'should return "string" when given a string',
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.STRING);

				for (const ITEM of VALUES)
				{
					strictEqual(getBaseType(ITEM), "string");
				}
			}
		);

		it(
			'should return "symbol" when given a symbol',
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.SYMBOL);

				for (const ITEM of VALUES)
				{
					strictEqual(getBaseType(ITEM), "symbol");
				}
			}
		);

		it(
			'should return "array" when given an array',
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.ARRAY);

				for (const ITEM of VALUES)
				{
					strictEqual(getBaseType(ITEM), "array");
				}
			}
		);

		it(
			'should return "class" when given a constructor',
			(): void =>
			{
				const VALUES: Array<unknown> = [
					class { },
					DummyClass,
					OldDummyClass,
				];

				for (const ITEM of VALUES)
				{
					strictEqual(getBaseType(ITEM), "class");
				}
			}
		);

		it(
			'should return "generator" when given a generator function',
			(): void =>
			{
				function* generator1()
				{
					yield 1;
				}

				function* generator2()
				{
					yield 1;
				}

				function* generator3()
				{
					yield 1;
				}

				function* generator4()
				{
					yield 1;
				}

				const VALUES: Array<unknown> = [
					generator1,
					generator2,
					generator3,
					generator4,
					function* ()
					{
						yield 1;
					},
					function* ()
					{
						yield 1;
					},
					function* ()
					{
						yield 1;
					},
					function* ()
					{
						yield 1;
					},
				];

				for (const ITEM of VALUES)
				{
					strictEqual(getBaseType(ITEM), "generator");
				}
			}
		);

		it(
			'should return "function" when given a function or method',
			(): void =>
			{
				const VALUES: Array<unknown> = [
					function () { },
					async function () { },
					(): void => { },
					async (): Promise<void> => { },
					DummyClass.Method,
					DummyClass.AsyncMethod,
					DUMMY.method,
					DUMMY.asyncMethod,
					OldDummyClass.Method,
					OldDummyClass.AsyncMethod,
					OLD_DUMMY.method,
					OLD_DUMMY.asyncMethod,
					trapDummy
				];

				for (const ITEM of VALUES)
				{
					strictEqual(getBaseType(ITEM), "function");
				}
			}
		);

		it(
			'should return "object" when given an object',
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.RECORD, BaseType.INSTANTIATED);

				for (const ITEM of VALUES)
				{
					strictEqual(getBaseType(ITEM), "object");
				}
			}
		);
	}
);
