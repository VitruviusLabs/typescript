import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { getDetailedType } from "../../src/_index.mjs";
import { type OldClassInstance, Values } from "@vitruvius-labs/testing-ground";
import { anonymousHoneyPot } from "./values/anonymous-honey-pot.mjs";
import { namedHoneyPot } from "./values/named-honey-pot.mjs";
import { HoneyPot } from "./values/class-honey-pot.mjs";

describe("getDetailedType", (): void => {
	it("should return 'undefined' when given undefined", (): void => {
		strictEqual(getDetailedType(undefined), "undefined");
	});

	it("should return 'null' when given null", (): void => {
		strictEqual(getDetailedType(null), "null");
	});

	it("should return 'NaN' when given NaN", (): void => {
		strictEqual(getDetailedType(Number.NaN), "NaN");
	});

	it("should return 'boolean (true)' when given true", (): void => {
		strictEqual(getDetailedType(true), "boolean (true)");
	});

	it("should return 'boolean (false)' when given false", (): void => {
		strictEqual(getDetailedType(false), "boolean (false)");
	});

	it("should return 'number (N)' when given a number", (): void => {
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
	});

	it("should return 'bigint (N)' when given a big int", (): void => {
		strictEqual(getDetailedType(BigInt(0)), "bigint (0)");
		strictEqual(getDetailedType(BigInt(-0)), "bigint (0)");
		strictEqual(getDetailedType(BigInt(1)), "bigint (1)");
		strictEqual(getDetailedType(BigInt(-1)), "bigint (-1)");
		strictEqual(getDetailedType(BigInt(Number.MIN_SAFE_INTEGER + 4)), "bigint (-9007199254740987)");
		strictEqual(getDetailedType(BigInt(Number.MAX_SAFE_INTEGER - 4)), "bigint (9007199254740987)");
		strictEqual(getDetailedType(BigInt(Number.MIN_SAFE_INTEGER - 4)), "bigint (-9007199254740996)");
		strictEqual(getDetailedType(BigInt(Number.MAX_SAFE_INTEGER + 4)), "bigint (9007199254740996)");
	});

	// eslint-disable-next-line @style/quotes -- Mixed quotes
	it(`should return 'string ("content")' when given a string with a length up to 36 characters`, (): void => {
		strictEqual(getDetailedType(""), 'string ("")');
		strictEqual(getDetailedType("Hello, World!"), 'string ("Hello, World!")');
		strictEqual(getDetailedType("0".repeat(36)), `string ("${"0".repeat(36)}")`);
	});

	it("should return 'string (N characters)' when given a string with a length greater than 36 characters", (): void => {
		strictEqual(getDetailedType(" ".repeat(37)), "string (37 characters)");
		strictEqual(getDetailedType(" ".repeat(40)), "string (40 characters)");
	});

	it("should return 'symbol (description)' when given a symbol", (): void => {
		strictEqual(getDetailedType(Symbol()), "symbol ()");
		strictEqual(getDetailedType(Symbol(42)), "symbol (42)");
		strictEqual(getDetailedType(Symbol("local")), "symbol (local)");
		strictEqual(getDetailedType(Symbol.for("global")), "symbol (global)");
		strictEqual(getDetailedType(Symbol.iterator), "symbol (Symbol.iterator)");
	});

	it("should return 'array (N items)' when given an array", (): void => {
		strictEqual(getDetailedType([]), "array (0 items)");
		strictEqual(getDetailedType([1, 2, 3]), "array (3 items)");
	});

	it("should return 'anonymous class' when given a class expression", (): void => {
		strictEqual(getDetailedType(Values.AnonymousClass), "anonymous class");
	});

	it("should return 'class Name' when given a class or PascalCase named constructible", (): void => {
		strictEqual(getDetailedType(Values.NamedClass), "class NamedClass");
		strictEqual(getDetailedType(Values.NamedConstructible), "class NamedConstructible");
		strictEqual(getDetailedType(Values.NamedConstructible.Method), "class Method");
	});

	it("should return 'anonymous async generator' when given an anonymous async generator function or method", (): void => {
		strictEqual(getDetailedType(Values.anonymousAsyncGeneratorA), "anonymous async generator");
		strictEqual(getDetailedType(Values.anonymousAsyncGeneratorB), "anonymous async generator");
		strictEqual(getDetailedType(Values.anonymousAsyncGeneratorC), "anonymous async generator");
		strictEqual(getDetailedType(Values.anonymousAsyncGeneratorD), "anonymous async generator");
	});

	it("should return 'async generator name' when given an anonymous async generator function or method", (): void => {
		const DUMMY: Values.NamedClass = new Values.NamedClass();

		strictEqual(getDetailedType(Values.namedAsyncGeneratorA), "async generator namedAsyncGeneratorA");
		strictEqual(getDetailedType(Values.namedAsyncGeneratorB), "async generator namedAsyncGeneratorB");
		strictEqual(getDetailedType(Values.namedAsyncGeneratorC), "async generator namedAsyncGeneratorC");
		strictEqual(getDetailedType(Values.namedAsyncGeneratorD), "async generator namedAsyncGeneratorD");
		strictEqual(getDetailedType(Values.NamedClass.AsyncGeneratorMethodA), "async generator AsyncGeneratorMethodA");
		strictEqual(getDetailedType(Values.NamedClass.AsyncGeneratorMethodB), "async generator AsyncGeneratorMethodB");
		strictEqual(getDetailedType(Values.NamedClass.AsyncGeneratorMethodC), "async generator AsyncGeneratorMethodC");
		strictEqual(getDetailedType(Values.NamedClass.AsyncGeneratorMethodD), "async generator AsyncGeneratorMethodD");
		strictEqual(getDetailedType(DUMMY.asyncGeneratorMethod), "async generator asyncGeneratorMethod");
		strictEqual(getDetailedType(HoneyPot.asyncGeneratorMethod), "async generator asyncGeneratorMethod");
	});

	it("should return 'anonymous async function' when given an anonymous function or method", (): void => {
		strictEqual(getDetailedType(Values.anonymousAsyncCallable), "anonymous async function");
		strictEqual(getDetailedType(Values.anonymousAsyncFunction), "anonymous async function");
	});

	it("should return 'async function name' when given a function or method", (): void => {
		strictEqual(getDetailedType(Values.namedAsyncCallable), "async function namedAsyncCallable");
		strictEqual(getDetailedType(Values.namedAsyncFunction), "async function namedAsyncFunction");
	});

	it("should return 'anonymous generator' when given an anonymous function", (): void => {
		strictEqual(getDetailedType(Values.anonymousGeneratorA), "anonymous generator");
		strictEqual(getDetailedType(Values.anonymousGeneratorB), "anonymous generator");
		strictEqual(getDetailedType(Values.anonymousGeneratorC), "anonymous generator");
		strictEqual(getDetailedType(Values.anonymousGeneratorD), "anonymous generator");
	});

	it("should return 'generator name' when given an anonymous function", (): void => {
		const DUMMY: Values.NamedClass = new Values.NamedClass();

		strictEqual(getDetailedType(Values.namedGeneratorA), "generator namedGeneratorA");
		strictEqual(getDetailedType(Values.namedGeneratorB), "generator namedGeneratorB");
		strictEqual(getDetailedType(Values.namedGeneratorC), "generator namedGeneratorC");
		strictEqual(getDetailedType(Values.namedGeneratorD), "generator namedGeneratorD");
		strictEqual(getDetailedType(Values.NamedClass.GeneratorMethodA), "generator GeneratorMethodA");
		strictEqual(getDetailedType(Values.NamedClass.GeneratorMethodB), "generator GeneratorMethodB");
		strictEqual(getDetailedType(Values.NamedClass.GeneratorMethodC), "generator GeneratorMethodC");
		strictEqual(getDetailedType(Values.NamedClass.GeneratorMethodD), "generator GeneratorMethodD");
		strictEqual(getDetailedType(DUMMY.generatorMethod), "generator generatorMethod");
	});

	it("should return 'anonymous function' when given an anonymous function", (): void => {
		strictEqual(getDetailedType(Values.anonymousCallable), "anonymous function");
		strictEqual(getDetailedType(Values.anonymousFunction), "anonymous function");
		strictEqual(getDetailedType(anonymousHoneyPot), "anonymous function");
	});

	it("should return 'function name' when given a named function", (): void => {
		const DUMMY: Values.NamedClass = new Values.NamedClass();
		const OLD_DUMMY: OldClassInstance = new Values.NamedConstructible();

		strictEqual(getDetailedType(Values.namedCallable), "function namedCallable");
		strictEqual(getDetailedType(Values.namedFunction), "function namedFunction");
		strictEqual(getDetailedType(DUMMY.method), "function method");
		strictEqual(getDetailedType(OLD_DUMMY.method), "function method");
		strictEqual(getDetailedType(namedHoneyPot), "function namedHoneyPot");
		strictEqual(getDetailedType(HoneyPot.method), "function method");
	});

	it("should return 'null-prototype object' when given a null-prototype object", (): void => {
		strictEqual(getDetailedType(Object.create(null)), "null-prototype object");
	});

	it("should return 'generic object' when given a simple object", (): void => {
		strictEqual(getDetailedType({}), "generic object");
		strictEqual(getDetailedType({ alpha: 1 }), "generic object");
	});

	it("should return 'instance of anonymous class' when given an instance of a class expression", (): void => {
		strictEqual(getDetailedType(new Values.AnonymousClass()), "instance of anonymous class");
		strictEqual(getDetailedType(new Values.AnonymousConstructible()), "instance of anonymous class");
	});

	it("should return 'instance of ClassName' when given an instantiated object", (): void => {
		strictEqual(getDetailedType(new Values.NamedClass()), "instance of NamedClass");
		strictEqual(getDetailedType(new Values.NamedConstructible()), "instance of NamedConstructible");
	});
});
