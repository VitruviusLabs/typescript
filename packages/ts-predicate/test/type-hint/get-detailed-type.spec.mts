import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { TypeHint } from "../../src/_index.mjs";
import { type OldClassInstance, Values } from "@vitruvius-labs/testing-ground";
import { anonymousHoneyPot } from "./values/anonymous-honey-pot.mjs";
import { namedHoneyPot } from "./values/named-honey-pot.mjs";
import { HoneyPot } from "./values/class-honey-pot.mjs";

describe("TypeHint.getDetailedType", (): void => {
	it("should return 'undefined' when given undefined", (): void => {
		strictEqual(TypeHint.getDetailedType(undefined), "undefined");
	});

	it("should return 'null' when given null", (): void => {
		strictEqual(TypeHint.getDetailedType(null), "null");
	});

	it("should return 'NaN' when given NaN", (): void => {
		strictEqual(TypeHint.getDetailedType(Number.NaN), "NaN");
	});

	it("should return 'boolean (true)' when given true", (): void => {
		strictEqual(TypeHint.getDetailedType(true), "boolean (true)");
	});

	it("should return 'boolean (false)' when given false", (): void => {
		strictEqual(TypeHint.getDetailedType(false), "boolean (false)");
	});

	it("should return 'number (N)' when given a number", (): void => {
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
	});

	it("should return 'bigint (N)' when given a big int", (): void => {
		strictEqual(TypeHint.getDetailedType(BigInt(0)), "bigint (0)");
		strictEqual(TypeHint.getDetailedType(BigInt(-0)), "bigint (0)");
		strictEqual(TypeHint.getDetailedType(BigInt(1)), "bigint (1)");
		strictEqual(TypeHint.getDetailedType(BigInt(-1)), "bigint (-1)");
		strictEqual(TypeHint.getDetailedType(BigInt(Number.MIN_SAFE_INTEGER + 4)), "bigint (-9007199254740987)");
		strictEqual(TypeHint.getDetailedType(BigInt(Number.MAX_SAFE_INTEGER - 4)), "bigint (9007199254740987)");
		strictEqual(TypeHint.getDetailedType(BigInt(Number.MIN_SAFE_INTEGER - 4)), "bigint (-9007199254740996)");
		strictEqual(TypeHint.getDetailedType(BigInt(Number.MAX_SAFE_INTEGER + 4)), "bigint (9007199254740996)");
	});

	it(`should return 'string ("content")' when given a string with a length up to 36 characters`, (): void => {
		strictEqual(TypeHint.getDetailedType(""), 'string ("")');
		strictEqual(TypeHint.getDetailedType("Hello, World!"), 'string ("Hello, World!")');
		strictEqual(TypeHint.getDetailedType("0".repeat(36)), `string ("${"0".repeat(36)}")`);
	});

	it("should return 'string (N characters)' when given a string with a length greater than 36 characters", (): void => {
		strictEqual(TypeHint.getDetailedType(" ".repeat(37)), "string (37 characters)");
		strictEqual(TypeHint.getDetailedType(" ".repeat(40)), "string (40 characters)");
	});

	it("should return 'symbol (description)' when given a symbol", (): void => {
		strictEqual(TypeHint.getDetailedType(Symbol()), "symbol ()");
		strictEqual(TypeHint.getDetailedType(Symbol(42)), "symbol (42)");
		strictEqual(TypeHint.getDetailedType(Symbol("local")), "symbol (local)");
		strictEqual(TypeHint.getDetailedType(Symbol.for("global")), "symbol (global)");
		strictEqual(TypeHint.getDetailedType(Symbol.iterator), "symbol (Symbol.iterator)");
	});

	it("should return 'array (N items)' when given an array", (): void => {
		strictEqual(TypeHint.getDetailedType([]), "array (0 items)");
		strictEqual(TypeHint.getDetailedType([1, 2, 3]), "array (3 items)");
	});

	it("should return 'anonymous class' when given a class expression", (): void => {
		strictEqual(TypeHint.getDetailedType(Values.AnonymousClass), "anonymous class");
	});

	it("should return 'class Name' when given a class or PascalCase named constructible", (): void => {
		strictEqual(TypeHint.getDetailedType(Values.NamedClass), "class NamedClass");
		strictEqual(TypeHint.getDetailedType(Values.NamedConstructible), "class NamedConstructible");
		strictEqual(TypeHint.getDetailedType(Values.NamedConstructible.Method), "class Method");
	});

	it("should return 'anonymous async generator' when given an anonymous async generator function or method", (): void => {
		strictEqual(TypeHint.getDetailedType(Values.anonymousAsyncGeneratorA), "anonymous async generator");
		strictEqual(TypeHint.getDetailedType(Values.anonymousAsyncGeneratorB), "anonymous async generator");
		strictEqual(TypeHint.getDetailedType(Values.anonymousAsyncGeneratorC), "anonymous async generator");
		strictEqual(TypeHint.getDetailedType(Values.anonymousAsyncGeneratorD), "anonymous async generator");
	});

	it("should return 'async generator name' when given an anonymous async generator function or method", (): void => {
		const DUMMY: Values.NamedClass = new Values.NamedClass();

		strictEqual(TypeHint.getDetailedType(Values.namedAsyncGeneratorA), "async generator namedAsyncGeneratorA");
		strictEqual(TypeHint.getDetailedType(Values.namedAsyncGeneratorB), "async generator namedAsyncGeneratorB");
		strictEqual(TypeHint.getDetailedType(Values.namedAsyncGeneratorC), "async generator namedAsyncGeneratorC");
		strictEqual(TypeHint.getDetailedType(Values.namedAsyncGeneratorD), "async generator namedAsyncGeneratorD");
		strictEqual(TypeHint.getDetailedType(Values.NamedClass.AsyncGeneratorMethodA), "async generator AsyncGeneratorMethodA");
		strictEqual(TypeHint.getDetailedType(Values.NamedClass.AsyncGeneratorMethodB), "async generator AsyncGeneratorMethodB");
		strictEqual(TypeHint.getDetailedType(Values.NamedClass.AsyncGeneratorMethodC), "async generator AsyncGeneratorMethodC");
		strictEqual(TypeHint.getDetailedType(Values.NamedClass.AsyncGeneratorMethodD), "async generator AsyncGeneratorMethodD");
		strictEqual(TypeHint.getDetailedType(DUMMY.asyncGeneratorMethod), "async generator asyncGeneratorMethod");
		strictEqual(TypeHint.getDetailedType(HoneyPot.asyncGeneratorMethod), "async generator asyncGeneratorMethod");
	});

	it("should return 'anonymous async function' when given an anonymous function or method", (): void => {
		strictEqual(TypeHint.getDetailedType(Values.anonymousAsyncCallable), "anonymous async function");
		strictEqual(TypeHint.getDetailedType(Values.anonymousAsyncFunction), "anonymous async function");
	});

	it("should return 'async function name' when given a function or method", (): void => {
		strictEqual(TypeHint.getDetailedType(Values.namedAsyncCallable), "async function namedAsyncCallable");
		strictEqual(TypeHint.getDetailedType(Values.namedAsyncFunction), "async function namedAsyncFunction");
	});

	it("should return 'anonymous generator' when given an anonymous function", (): void => {
		strictEqual(TypeHint.getDetailedType(Values.anonymousGeneratorA), "anonymous generator");
		strictEqual(TypeHint.getDetailedType(Values.anonymousGeneratorB), "anonymous generator");
		strictEqual(TypeHint.getDetailedType(Values.anonymousGeneratorC), "anonymous generator");
		strictEqual(TypeHint.getDetailedType(Values.anonymousGeneratorD), "anonymous generator");
	});

	it("should return 'generator name' when given an anonymous function", (): void => {
		const DUMMY: Values.NamedClass = new Values.NamedClass();

		strictEqual(TypeHint.getDetailedType(Values.namedGeneratorA), "generator namedGeneratorA");
		strictEqual(TypeHint.getDetailedType(Values.namedGeneratorB), "generator namedGeneratorB");
		strictEqual(TypeHint.getDetailedType(Values.namedGeneratorC), "generator namedGeneratorC");
		strictEqual(TypeHint.getDetailedType(Values.namedGeneratorD), "generator namedGeneratorD");
		strictEqual(TypeHint.getDetailedType(Values.NamedClass.GeneratorMethodA), "generator GeneratorMethodA");
		strictEqual(TypeHint.getDetailedType(Values.NamedClass.GeneratorMethodB), "generator GeneratorMethodB");
		strictEqual(TypeHint.getDetailedType(Values.NamedClass.GeneratorMethodC), "generator GeneratorMethodC");
		strictEqual(TypeHint.getDetailedType(Values.NamedClass.GeneratorMethodD), "generator GeneratorMethodD");
		strictEqual(TypeHint.getDetailedType(DUMMY.generatorMethod), "generator generatorMethod");
	});

	it("should return 'anonymous function' when given an anonymous function", (): void => {
		strictEqual(TypeHint.getDetailedType(Values.anonymousCallable), "anonymous function");
		strictEqual(TypeHint.getDetailedType(Values.anonymousFunction), "anonymous function");
		strictEqual(TypeHint.getDetailedType(anonymousHoneyPot), "anonymous function");
	});

	it("should return 'function name' when given a named function", (): void => {
		const DUMMY: Values.NamedClass = new Values.NamedClass();
		const OLD_DUMMY: OldClassInstance = new Values.NamedConstructible();

		strictEqual(TypeHint.getDetailedType(Values.namedCallable), "function namedCallable");
		strictEqual(TypeHint.getDetailedType(Values.namedFunction), "function namedFunction");
		strictEqual(TypeHint.getDetailedType(DUMMY.method), "function method");
		strictEqual(TypeHint.getDetailedType(OLD_DUMMY.method), "function method");
		strictEqual(TypeHint.getDetailedType(namedHoneyPot), "function namedHoneyPot");
		strictEqual(TypeHint.getDetailedType(HoneyPot.method), "function method");
	});

	it("should return 'null-prototype object' when given a null-prototype object", (): void => {
		strictEqual(TypeHint.getDetailedType(Object.create(null)), "null-prototype object");
	});

	it("should return 'generic object' when given a simple object", (): void => {
		strictEqual(TypeHint.getDetailedType({}), "generic object");
		strictEqual(TypeHint.getDetailedType({ alpha: 1 }), "generic object");
	});

	it("should return 'instance of anonymous class' when given an instance of a class expression", (): void => {
		strictEqual(TypeHint.getDetailedType(new Values.AnonymousClass()), "instance of anonymous class");
		strictEqual(TypeHint.getDetailedType(new Values.AnonymousConstructible()), "instance of anonymous class");
	});

	it("should return 'instance of ClassName' when given an instantiated object", (): void => {
		strictEqual(TypeHint.getDetailedType(new Values.NamedClass()), "instance of NamedClass");
		strictEqual(TypeHint.getDetailedType(new Values.NamedConstructible()), "instance of NamedConstructible");
	});
});
