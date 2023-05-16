import { expect } from "chai";

import { describe, it } from "mocha";

import { getDetailedType } from "../../src/TypeHint/getDetailedType.js";

import { BaseType, DummyClass, OldDummyClass, getValues } from "../Utils.js";

const DUMMY = new DummyClass();
const OLD_DUMMY = new OldDummyClass();

function trapDummy()
{
	// eslint-disable-next-line @typescript-eslint/naming-convention -- Old class notation
	function TrapDummyClass() {}

	function* trapDummyGenerator()
	{
		yield 1;
	}

	// @ts-ignore
	new TrapDummyClass();
	trapDummyGenerator();
}

describe(
	"TypeHint / getDetailedType",
	(): void =>
	{
		it(
			"should return \"undefined\" when given undefined",
			(): void =>
			{
				expect(getDetailedType(undefined)).to.equal("undefined");
			}
		);

		it(
			"should return \"null\" when given null",
			(): void =>
			{
				expect(getDetailedType(null)).to.equal("null");
			}
		);

		it(
			"should return \"NaN\" when given NaN",
			(): void =>
			{
				expect(getDetailedType(Number.NaN)).to.equal("NaN");
			}
		);

		it(
			"should return \"boolean (true)\" when given true",
			(): void =>
			{
				expect(getDetailedType(true)).to.equal("boolean (true)");
			}
		);

		it(
			"should return \"boolean (false)\" when given false",
			(): void =>
			{
				expect(getDetailedType(false)).to.equal("boolean (false)");
			}
		);

		it(
			"should return \"number\" when given a number",
			(): void =>
			{
				expect(getDetailedType(0)).to.equal("number (0)");
				expect(getDetailedType(-0)).to.equal("number (0)");
				expect(getDetailedType(1)).to.equal("number (1)");
				expect(getDetailedType(-1)).to.equal("number (-1)");
				expect(getDetailedType(Number.MIN_SAFE_INTEGER + 4)).to.equal("number (-9007199254740987)");
				expect(getDetailedType(Number.MAX_SAFE_INTEGER - 4)).to.equal("number (9007199254740987)");
				expect(getDetailedType(Number.MIN_SAFE_INTEGER - 4)).to.equal("number (-9007199254740996)");
				expect(getDetailedType(Number.MAX_SAFE_INTEGER + 4)).to.equal("number (9007199254740996)");
				expect(getDetailedType(Number.MIN_VALUE)).to.equal("number (5e-324)");
				expect(getDetailedType(-Number.MIN_VALUE)).to.equal("number (-5e-324)");
				expect(getDetailedType(Number.MAX_VALUE)).to.equal("number (1.7976931348623157e+308)");
				expect(getDetailedType(-Number.MAX_VALUE)).to.equal("number (-1.7976931348623157e+308)");
				expect(getDetailedType(Number.POSITIVE_INFINITY)).to.equal("number (Infinity)");
				expect(getDetailedType(Number.NEGATIVE_INFINITY)).to.equal("number (-Infinity)");
			}
		);

		it(
			"should return \"string (N characters)\" when given a string",
			(): void =>
			{
				expect(getDetailedType("")).to.equal("string (0 characters)");
				expect(getDetailedType("Hello, World!")).to.equal("string (13 characters)");
			}
		);

		it(
			"should return \"symbol (description)\" when given a symbol",
			(): void =>
			{
				expect(getDetailedType(Symbol())).to.equal("symbol ()");
				expect(getDetailedType(Symbol(42))).to.equal("symbol (42)");
				expect(getDetailedType(Symbol("local"))).to.equal("symbol (local)");
				expect(getDetailedType(Symbol.for("global"))).to.equal("symbol (global)");
				expect(getDetailedType(Symbol.iterator)).to.equal("symbol (Symbol.iterator)");
			}
		);

		it(
			"should return \"array (N items)\" when given an array",
			(): void =>
			{
				expect(getDetailedType([])).to.equal("array (0 items)");
				expect(getDetailedType([1, 2, 3])).to.equal("array (3 items)");
			}
		);

		it(
			"should return \"anonymous class\" when given a class expression",
			(): void =>
			{
				expect(getDetailedType(class
				{})).to.equal("anonymous class");
			}
		);

		it(
			"should return \"class Name\" when given a class",
			(): void =>
			{
				expect(getDetailedType(DummyClass)).to.equal("class DummyClass");
				expect(getDetailedType(OldDummyClass)).to.equal("class OldDummyClass");
			}
		);

		it(
			"should return \"anonymous function\" when given an anonymous function",
			(): void =>
			{
				const VALUES: Array<unknown> = [
					(): void => {},
					async (): Promise<void> => {},
					function () {},
					async function () {},
					OldDummyClass.Method,
					OldDummyClass.AsyncMethod,
					// @ts-expect-error: old class notation
					OLD_DUMMY.method,
					// @ts-expect-error: old class notation
					OLD_DUMMY.asyncMethod,
					// anonymous version of trapDummy
					function ()
					{
						// eslint-disable-next-line @typescript-eslint/naming-convention -- Old class notation
						function TrapDummyClass() {}

						function* trapDummyGenerator()
						{
							yield 1;
						}

						// @ts-ignore
						new TrapDummyClass();
						trapDummyGenerator();
					}
				];

				for (const ITEM of VALUES)
				{
					expect(getDetailedType(ITEM)).to.equal("anonymous function");
				}
			}
		);

		it(
			"should return \"function name\" when given a named function",
			(): void =>
			{
				function alpha() {}

				async function beta() {}

				expect(getDetailedType(alpha)).to.equal("function alpha");
				expect(getDetailedType(beta)).to.equal("function beta");
				expect(getDetailedType(trapDummy)).to.equal("function trapDummy");
				// Not using class notation
				expect(getDetailedType(Array.from)).to.equal("function from");
				expect(getDetailedType([].map)).to.equal("function map");
			}
		);

		it(
			"should return \"anonymous generator\" when given an anonymous generator",
			(): void =>
			{
				const VALUES: Array<unknown> = [
					function*()
					{
						yield 1;
					},
					function* ()
					{
						yield 1;
					},
					function *()
					{
						yield 1;
					},
					function * ()
					{
						yield 1;
					},
				];

				for (const ITEM of VALUES)
				{
					expect(getDetailedType(ITEM)).to.equal("anonymous generator");
				}
			}
		);

		it(
			"should return \"generator name\" when given a named generator",
			(): void =>
			{
				function*generator1()
				{
					yield 1;
				}

				function* generator2()
				{
					yield 1;
				}

				function *generator3()
				{
					yield 1;
				}

				function * generator4()
				{
					yield 1;
				}

				expect(getDetailedType(generator1)).to.equal("generator generator1");
				expect(getDetailedType(generator2)).to.equal("generator generator2");
				expect(getDetailedType(generator3)).to.equal("generator generator3");
				expect(getDetailedType(generator4)).to.equal("generator generator4");
			}
		);

		it(
			"should return \"method name\" when given a method",
			(): void =>
			{
				expect(getDetailedType(DummyClass.Method)).to.equal("method Method");
				expect(getDetailedType(DummyClass.AsyncMethod)).to.equal("method AsyncMethod");
				expect(getDetailedType(DUMMY.method)).to.equal("method method");
				expect(getDetailedType(DUMMY.asyncMethod)).to.equal("method asyncMethod");
			}
		);

		it(
			"should return \"anonymous object\" when given a record-like object",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.RECORD);

				for (const ITEM of VALUES)
				{
					expect(getDetailedType(ITEM)).to.equal("anonymous object");
				}
			}
		);

		it(
			"should return \"object anonymous class\" when given an instance of a class expression",
			(): void =>
			{
				const VALUES: Array<unknown> = [
					// @ts-ignore
					new (function () {})(),
					new (class {})(),
				];

				for (const ITEM of VALUES)
				{
					expect(getDetailedType(ITEM)).to.equal("object anonymous class");
				}
			}
		);

		it(
			"should return \"object ClassName\" when given an instantiated object",
			(): void =>
			{
				expect(getDetailedType(DUMMY)).to.equal("object DummyClass");
			}
		);
	}
);
