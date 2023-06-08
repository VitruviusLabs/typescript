import { strictEqual } from "assert";

import { describe, it } from "node:test";

import { TypeHint } from "../../src/index.mjs";

import { BaseType, DummyClass, GroupType, OldDummyClass, getValues } from "../common/getValues.mjs";

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
	"TypeHint.getBaseType",
	(): void =>
	{
		it(
			'should return "undefined" when given undefined',
			(): void =>
			{
				strictEqual(TypeHint.getBaseType(undefined), "undefined");
			}
		);

		it(
			'should return "null" when given null',
			(): void =>
			{
				strictEqual(TypeHint.getBaseType(null), "null");
			}
		);

		it(
			'should return "NaN" when given NaN',
			(): void =>
			{
				strictEqual(TypeHint.getBaseType(Number.NaN), "NaN");
			}
		);

		it(
			'should return "boolean" when given a boolean',
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.BOOLEAN);

				for (const ITEM of VALUES)
				{
					strictEqual(TypeHint.getBaseType(ITEM), "boolean");
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
					strictEqual(TypeHint.getBaseType(ITEM), "number");
				}
			}
		);

		it(
			'should return "bigint" when given a big int',
			(): void =>
			{
				strictEqual(TypeHint.getBaseType(BigInt(0)), "bigint");
				strictEqual(TypeHint.getBaseType(BigInt(-0)), "bigint");
				strictEqual(TypeHint.getBaseType(BigInt(1)), "bigint");
				strictEqual(TypeHint.getBaseType(BigInt(-1)), "bigint");
				strictEqual(TypeHint.getBaseType(BigInt(Number.MIN_SAFE_INTEGER + 4)), "bigint");
				strictEqual(TypeHint.getBaseType(BigInt(Number.MAX_SAFE_INTEGER - 4)), "bigint");
				strictEqual(TypeHint.getBaseType(BigInt(Number.MIN_SAFE_INTEGER - 4)), "bigint");
				strictEqual(TypeHint.getBaseType(BigInt(Number.MAX_SAFE_INTEGER + 4)), "bigint");
			}
		);

		it(
			'should return "string" when given a string',
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.STRING);

				for (const ITEM of VALUES)
				{
					strictEqual(TypeHint.getBaseType(ITEM), "string");
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
					strictEqual(TypeHint.getBaseType(ITEM), "symbol");
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
					strictEqual(TypeHint.getBaseType(ITEM), "array");
				}
			}
		);

		it(
			'should return "class" when given a constructor',
			(): void =>
			{
				const VALUES: Array<unknown> = [
					ANONYMOUS_CLASS,
					DummyClass,
					OldDummyClass,
				];

				for (const ITEM of VALUES)
				{
					strictEqual(TypeHint.getBaseType(ITEM), "class");
				}
			}
		);

		it(
			'should return "generator" when given a generator function',
			(): void =>
			{
				const VALUES: Array<unknown> = [
					namedGenerator1,
					namedGenerator2,
					namedGenerator3,
					namedGenerator4,
					GENERATOR_A,
					GENERATOR_B,
					GENERATOR_C,
					GENERATOR_D,
				];

				for (const ITEM of VALUES)
				{
					strictEqual(TypeHint.getBaseType(ITEM), "generator");
				}
			}
		);

		it(
			'should return "function" when given a function or method',
			(): void =>
			{
				const DUMMY: DummyClass = new DummyClass();
				const OLD_DUMMY: OldClassInstance = new OldDummyClass();

				const VALUES: Array<unknown> = [
					ANONYMOUS_CALLABLE,
					ANONYMOUS_ASYNC_CALLABLE,
					ANONYMOUS_FUNCTION,
					ANONYMOUS_ASYNC_FUNCTION,
					ANONYMOUS_CONSTRUCTIBLE,
					ANONYMOUS_TRAP_DUMMY,
					alpha,
					beta,
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
					strictEqual(TypeHint.getBaseType(ITEM), "function");
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
					strictEqual(TypeHint.getBaseType(ITEM), "object");
				}
			}
		);
	}
);
