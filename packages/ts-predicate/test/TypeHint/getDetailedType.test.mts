import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { TypeHint } from "../../src/index.mjs";

import { BaseType, DummyClass, OldDummyClass, getValues } from "../common/getValues.mjs";

import
{
	ANONYMOUS_ASYNC_CALLABLE,
	ANONYMOUS_ASYNC_FUNCTION,
	ANONYMOUS_CALLABLE,
	ANONYMOUS_CLASS,
	ANONYMOUS_CONSTRUCTIBLE,
	ANONYMOUS_FUNCTION,
	ANONYMOUS_TRAP_DUMMY,
	GENERATOR_A,
	GENERATOR_B,
	GENERATOR_C,
	GENERATOR_D,
	alpha,
	beta,
	namedGenerator1,
	namedGenerator2,
	namedGenerator3,
	namedGenerator4,
	trapDummy
} from "../common/specialValues.mjs";

import type { OldClassInstance } from "../common/types/OldClassInstance.mjs";

describe(
	"TypeHint.getDetailedType",
	(): void =>
	{
		it(
			'should return "undefined" when given undefined',
			(): void =>
			{
				strictEqual(TypeHint.getDetailedType(undefined), "undefined");
			}
		);

		it(
			'should return "null" when given null',
			(): void =>
			{
				strictEqual(TypeHint.getDetailedType(null), "null");
			}
		);

		it(
			'should return "NaN" when given NaN',
			(): void =>
			{
				strictEqual(TypeHint.getDetailedType(Number.NaN), "NaN");
			}
		);

		it(
			'should return "boolean (true)" when given true',
			(): void =>
			{
				strictEqual(TypeHint.getDetailedType(true), "boolean (true)");
			}
		);

		it(
			'should return "boolean (false)" when given false',
			(): void =>
			{
				strictEqual(TypeHint.getDetailedType(false), "boolean (false)");
			}
		);

		it(
			'should return "number (N)" when given a number',
			(): void =>
			{
				strictEqual(TypeHint.getDetailedType(0), "number (0)");
				strictEqual(TypeHint.getDetailedType(-0), "number (0)");
				strictEqual(TypeHint.getDetailedType(1), "number (1)");
				strictEqual(TypeHint.getDetailedType(-1), "number (-1)");
				strictEqual(TypeHint.getDetailedType(Number.MIN_SAFE_INTEGER + 4), "number (-9007199254740987)");
				strictEqual(TypeHint.getDetailedType(Number.MAX_SAFE_INTEGER - 4), "number (9007199254740987)");
				strictEqual(TypeHint.getDetailedType(Number.MIN_SAFE_INTEGER - 4), "number (-9007199254740996)");
				strictEqual(TypeHint.getDetailedType(Number.MAX_SAFE_INTEGER + 4), "number (9007199254740996)");
				strictEqual(TypeHint.getDetailedType(Number.MIN_VALUE), "number (5e-324)");
				strictEqual(TypeHint.getDetailedType(-Number.MIN_VALUE), "number (-5e-324)");
				strictEqual(TypeHint.getDetailedType(Number.MAX_VALUE), "number (1.7976931348623157e+308)");
				strictEqual(TypeHint.getDetailedType(-Number.MAX_VALUE), "number (-1.7976931348623157e+308)");
				strictEqual(TypeHint.getDetailedType(Number.POSITIVE_INFINITY), "number (Infinity)");
				strictEqual(TypeHint.getDetailedType(Number.NEGATIVE_INFINITY), "number (-Infinity)");
			}
		);

		it(
			'should return "bigint (N)" when given a big int',
			(): void =>
			{
				strictEqual(TypeHint.getDetailedType(BigInt(0)), "bigint (0)");
				strictEqual(TypeHint.getDetailedType(BigInt(-0)), "bigint (0)");
				strictEqual(TypeHint.getDetailedType(BigInt(1)), "bigint (1)");
				strictEqual(TypeHint.getDetailedType(BigInt(-1)), "bigint (-1)");
				strictEqual(TypeHint.getDetailedType(BigInt(Number.MIN_SAFE_INTEGER + 4)), "bigint (-9007199254740987)");
				strictEqual(TypeHint.getDetailedType(BigInt(Number.MAX_SAFE_INTEGER - 4)), "bigint (9007199254740987)");
				strictEqual(TypeHint.getDetailedType(BigInt(Number.MIN_SAFE_INTEGER - 4)), "bigint (-9007199254740996)");
				strictEqual(TypeHint.getDetailedType(BigInt(Number.MAX_SAFE_INTEGER + 4)), "bigint (9007199254740996)");
			}
		);

		it(
			'should return "string (N characters)" when given a string',
			(): void =>
			{
				strictEqual(TypeHint.getDetailedType(""), "string (0 characters)");
				strictEqual(TypeHint.getDetailedType("Hello, World!"), "string (13 characters)");
			}
		);

		it(
			'should return "symbol (description)" when given a symbol',
			(): void =>
			{
				strictEqual(TypeHint.getDetailedType(Symbol()), "symbol ()");
				strictEqual(TypeHint.getDetailedType(Symbol(42)), "symbol (42)");
				strictEqual(TypeHint.getDetailedType(Symbol("local")), "symbol (local)");
				strictEqual(TypeHint.getDetailedType(Symbol.for("global")), "symbol (global)");
				strictEqual(TypeHint.getDetailedType(Symbol.iterator), "symbol (Symbol.iterator)");
			}
		);

		it(
			'should return "array (N items)" when given an array',
			(): void =>
			{
				strictEqual(TypeHint.getDetailedType([]), "array (0 items)");
				strictEqual(TypeHint.getDetailedType([1, 2, 3]), "array (3 items)");
			}
		);

		it(
			'should return "anonymous class" when given a class expression',
			(): void =>
			{
				strictEqual(TypeHint.getDetailedType(class { }), "anonymous class");
			}
		);

		it(
			'should return "class Name" when given a class',
			(): void =>
			{
				strictEqual(TypeHint.getDetailedType(DummyClass), "class DummyClass");
				strictEqual(TypeHint.getDetailedType(OldDummyClass), "class OldDummyClass");
			}
		);

		it(
			'should return "anonymous function" when given an anonymous function',
			(): void =>
			{
				const OLD_DUMMY: OldClassInstance = new OldDummyClass();

				const VALUES: Array<unknown> = [
					ANONYMOUS_CALLABLE,
					ANONYMOUS_ASYNC_CALLABLE,
					ANONYMOUS_FUNCTION,
					ANONYMOUS_ASYNC_FUNCTION,
					OldDummyClass.Method,
					OldDummyClass.AsyncMethod,
					OLD_DUMMY.method,
					OLD_DUMMY.asyncMethod,
					ANONYMOUS_TRAP_DUMMY,
				];

				for (const ITEM of VALUES)
				{
					strictEqual(TypeHint.getDetailedType(ITEM), "anonymous function");
				}
			}
		);

		it(
			'should return "function name" when given a named function',
			(): void =>
			{
				strictEqual(TypeHint.getDetailedType(alpha), "function alpha");
				strictEqual(TypeHint.getDetailedType(beta), "function beta");
				strictEqual(TypeHint.getDetailedType(trapDummy), "function trapDummy");
				strictEqual(TypeHint.getDetailedType(Array.from), "function from");
				strictEqual(TypeHint.getDetailedType([].map), "function map");
			}
		);

		it(
			'should return "anonymous generator" when given an anonymous generator',
			(): void =>
			{
				const VALUES: Array<unknown> = [
					GENERATOR_A,
					GENERATOR_B,
					GENERATOR_C,
					GENERATOR_D,
				];

				for (const ITEM of VALUES)
				{
					strictEqual(TypeHint.getDetailedType(ITEM), "anonymous generator");
				}
			}
		);

		it(
			'should return "generator name" when given a named generator',
			(): void =>
			{
				strictEqual(TypeHint.getDetailedType(namedGenerator1), "generator namedGenerator1");
				strictEqual(TypeHint.getDetailedType(namedGenerator2), "generator namedGenerator2");
				strictEqual(TypeHint.getDetailedType(namedGenerator3), "generator namedGenerator3");
				strictEqual(TypeHint.getDetailedType(namedGenerator4), "generator namedGenerator4");
			}
		);

		it(
			'should return "method name" when given a method',
			(): void =>
			{
				const DUMMY: DummyClass = new DummyClass();

				strictEqual(TypeHint.getDetailedType(DummyClass.Method), "method Method");
				strictEqual(TypeHint.getDetailedType(DummyClass.AsyncMethod), "method AsyncMethod");
				strictEqual(TypeHint.getDetailedType(DUMMY.method), "method method");
				strictEqual(TypeHint.getDetailedType(DUMMY.asyncMethod), "method asyncMethod");
			}
		);

		it(
			'should return "anonymous object" when given a record-like object',
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.RECORD);

				for (const ITEM of VALUES)
				{
					strictEqual(TypeHint.getDetailedType(ITEM), "anonymous object");
				}
			}
		);

		it(
			'should return "object anonymous class" when given an instance of a class expression',
			(): void =>
			{
				const VALUES: Array<unknown> = [
					new ANONYMOUS_CLASS(),
					// @ts-expect-error: old notation
					new ANONYMOUS_CONSTRUCTIBLE(),
				];

				for (const ITEM of VALUES)
				{
					strictEqual(TypeHint.getDetailedType(ITEM), "object anonymous class");
				}
			}
		);

		it(
			'should return "object ClassName" when given an instantiated object',
			(): void =>
			{
				const DUMMY: DummyClass = new DummyClass();

				strictEqual(TypeHint.getDetailedType(DUMMY), "object DummyClass");
			}
		);
	}
);
