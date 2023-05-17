import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { getDetailedType } from "../../src/TypeHint/getDetailedType.mjs";

import { BaseType, DummyClass, OldDummyClass, getValues } from "../common/utils.mjs";

import type { OldClassInstance } from "../common/OldClassInstance.mjs";

const DUMMY: DummyClass = new DummyClass();
const OLD_DUMMY: OldClassInstance = new OldDummyClass();

function trapDummy(): void
{
	function TrapDummyClass(): void { }

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Dummy
	function* trapDummyGenerator()
	{
		yield 1;
	}

	// @ts-expect-error: old notation
	new TrapDummyClass();
	trapDummyGenerator();
}

describe(
	"TypeHint / getDetailedType",
	(): void =>
	{
		it(
			'should return "undefined" when given undefined',
			(): void =>
			{
				strictEqual(getDetailedType(undefined), "undefined");
			}
		);

		it(
			'should return "null" when given null',
			(): void =>
			{
				strictEqual(getDetailedType(null), "null");
			}
		);

		it(
			'should return "NaN" when given NaN',
			(): void =>
			{
				strictEqual(getDetailedType(Number.NaN), "NaN");
			}
		);

		it(
			'should return "boolean (true)" when given true',
			(): void =>
			{
				strictEqual(getDetailedType(true), "boolean (true)");
			}
		);

		it(
			'should return "boolean (false)" when given false',
			(): void =>
			{
				strictEqual(getDetailedType(false), "boolean (false)");
			}
		);

		it(
			'should return "number" when given a number',
			(): void =>
			{
				strictEqual(getDetailedType(0), "number (0)");
				strictEqual(getDetailedType(-0), "number (0)");
				strictEqual(getDetailedType(1), "number (1)");
				strictEqual(getDetailedType(-1), "number (-1)");
				strictEqual(getDetailedType(Number.MIN_SAFE_INTEGER + 4), "number (-9007199254740987)");
				strictEqual(getDetailedType(Number.MAX_SAFE_INTEGER - 4), "number (9007199254740987)");
				strictEqual(getDetailedType(Number.MIN_SAFE_INTEGER - 4), "number (-9007199254740996)");
				strictEqual(getDetailedType(Number.MAX_SAFE_INTEGER + 4), "number (9007199254740996)");
				strictEqual(getDetailedType(Number.MIN_VALUE), "number (5e-324)");
				strictEqual(getDetailedType(-Number.MIN_VALUE), "number (-5e-324)");
				strictEqual(getDetailedType(Number.MAX_VALUE), "number (1.7976931348623157e+308)");
				strictEqual(getDetailedType(-Number.MAX_VALUE), "number (-1.7976931348623157e+308)");
				strictEqual(getDetailedType(Number.POSITIVE_INFINITY), "number (Infinity)");
				strictEqual(getDetailedType(Number.NEGATIVE_INFINITY), "number (-Infinity)");
			}
		);

		it(
			'should return "string (N characters)" when given a string',
			(): void =>
			{
				strictEqual(getDetailedType(""), "string (0 characters)");
				strictEqual(getDetailedType("Hello, World!"), "string (13 characters)");
			}
		);

		it(
			'should return "symbol (description)" when given a symbol',
			(): void =>
			{
				strictEqual(getDetailedType(Symbol()), "symbol ()");
				strictEqual(getDetailedType(Symbol(42)), "symbol (42)");
				strictEqual(getDetailedType(Symbol("local")), "symbol (local)");
				strictEqual(getDetailedType(Symbol.for("global")), "symbol (global)");
				strictEqual(getDetailedType(Symbol.iterator), "symbol (Symbol.iterator)");
			}
		);

		it(
			'should return "array (N items)" when given an array',
			(): void =>
			{
				strictEqual(getDetailedType([]), "array (0 items)");
				strictEqual(getDetailedType([1, 2, 3]), "array (3 items)");
			}
		);

		it(
			'should return "anonymous class" when given a class expression',
			(): void =>
			{
				strictEqual(getDetailedType(class { }), "anonymous class");
			}
		);

		it(
			'should return "class Name" when given a class',
			(): void =>
			{
				strictEqual(getDetailedType(DummyClass), "class DummyClass");
				strictEqual(getDetailedType(OldDummyClass), "class OldDummyClass");
			}
		);

		it(
			'should return "anonymous function" when given an anonymous function',
			(): void =>
			{
				const VALUES: Array<unknown> = [
					(): void => { },
					async (): Promise<void> => { },
					function (): void { },
					async function (): Promise<void> { },
					OldDummyClass.Method,
					OldDummyClass.AsyncMethod,
					OLD_DUMMY.method,
					OLD_DUMMY.asyncMethod,
					// anonymous version of trapDummy
					function (): void
					{
						function TrapDummyClass(): void { }

						// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Dummy
						function* trapDummyGenerator()
						{
							yield 1;
						}

						// @ts-expect-error: old notation
						new TrapDummyClass();
						trapDummyGenerator();
					}
				];

				for (const ITEM of VALUES)
				{
					strictEqual(getDetailedType(ITEM), "anonymous function");
				}
			}
		);

		it(
			'should return "function name" when given a named function',
			(): void =>
			{
				function alpha(): void { }

				async function beta(): Promise<void> { }

				strictEqual(getDetailedType(alpha), "function alpha");
				strictEqual(getDetailedType(beta), "function beta");
				strictEqual(getDetailedType(trapDummy), "function trapDummy");
				// Not using class notation
				strictEqual(getDetailedType(Array.from), "function from");
				strictEqual(getDetailedType([].map), "function map");
			}
		);

		it(
			'should return "anonymous generator" when given an anonymous generator',
			(): void =>
			{
				const VALUES: Array<unknown> = [
					// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Dummy
					function* ()
					{
						yield 1;
					},
					// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Dummy
					function* ()
					{
						yield 1;
					},
					// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Dummy
					function* ()
					{
						yield 1;
					},
					// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Dummy
					function* ()
					{
						yield 1;
					},
				];

				for (const ITEM of VALUES)
				{
					strictEqual(getDetailedType(ITEM), "anonymous generator");
				}
			}
		);

		it(
			'should return "generator name" when given a named generator',
			(): void =>
			{
				// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Dummy
				function* generator1()
				{
					yield 1;
				}

				// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Dummy
				function* generator2()
				{
					yield 1;
				}

				// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Dummy
				function* generator3()
				{
					yield 1;
				}

				// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Dummy
				function* generator4()
				{
					yield 1;
				}

				strictEqual(getDetailedType(generator1), "generator generator1");
				strictEqual(getDetailedType(generator2), "generator generator2");
				strictEqual(getDetailedType(generator3), "generator generator3");
				strictEqual(getDetailedType(generator4), "generator generator4");
			}
		);

		it(
			'should return "method name" when given a method',
			(): void =>
			{
				strictEqual(getDetailedType(DummyClass.Method), "method Method");
				strictEqual(getDetailedType(DummyClass.AsyncMethod), "method AsyncMethod");
				strictEqual(getDetailedType(DUMMY.method), "method method");
				strictEqual(getDetailedType(DUMMY.asyncMethod), "method asyncMethod");
			}
		);

		it(
			'should return "anonymous object" when given a record-like object',
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.RECORD);

				for (const ITEM of VALUES)
				{
					strictEqual(getDetailedType(ITEM), "anonymous object");
				}
			}
		);

		it(
			'should return "object anonymous class" when given an instance of a class expression',
			(): void =>
			{
				const VALUES: Array<unknown> = [
					// @ts-expect-error: old notation
					new (function (): void { })(),
					new (class { })(),
				];

				for (const ITEM of VALUES)
				{
					strictEqual(getDetailedType(ITEM), "object anonymous class");
				}
			}
		);

		it(
			'should return "object ClassName" when given an instantiated object',
			(): void =>
			{
				strictEqual(getDetailedType(DUMMY), "object DummyClass");
			}
		);
	}
);
