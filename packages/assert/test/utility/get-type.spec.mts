import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { getType } from "../../src/utility/get-type.mjs";

describe("getType", (): void => {
	it('should return "undefined" for undefined', (): void => {
		strictEqual(getType(undefined), "undefined");
	});

	it('should return "null" for null', (): void => {
		strictEqual(getType(null), "null");
	});

	it('should return "false" for false', (): void => {
		strictEqual(getType(false), "false");
	});

	it('should return "true" for true', (): void => {
		strictEqual(getType(true), "true");
	});

	it('should return "NaN" for NaN', (): void => {
		strictEqual(getType(NaN), "NaN");
	});

	it('should return "+Infinity" for +Infinity', (): void => {
		strictEqual(getType(Number.POSITIVE_INFINITY), "+Infinity");
	});

	it('should return "-Infinity" for -Infinity', (): void => {
		strictEqual(getType(Number.NEGATIVE_INFINITY), "-Infinity");
	});

	it('should return "an integer" for a safe integer', (): void => {
		strictEqual(getType(0), "an integer");
		strictEqual(getType(1), "an integer");
		strictEqual(getType(-1), "an integer");
	});

	it('should return "a number" for a finite number', (): void => {
		strictEqual(getType(0.1), "a number");
		strictEqual(getType(-0.1), "a number");
	});

	it('should return "a bigint" for a bigint', (): void => {
		strictEqual(getType(0n), "a bigint");
		strictEqual(getType(1n), "a bigint");
		strictEqual(getType(-1n), "a bigint");
	});

	it('should return "an empty string" for an empty string', (): void => {
		strictEqual(getType(""), "an empty string");
	});

	it('should return "a string" for a string', (): void => {
		strictEqual(getType("Lorem ipsum"), "a string");
	});

	it('should return "a symbol" for a symbol', (): void => {
		strictEqual(getType(Symbol("test")), "a symbol");
		strictEqual(getType(Symbol.iterator), "a symbol");
	});

	it('should return "a function" for a function', (): void => {
		// eslint-disable-next-line prefer-arrow-callback -- Test
		strictEqual(getType(function(): void {}), "a function");
		// eslint-disable-next-line prefer-arrow-callback -- Test
		strictEqual(getType(function named(): void {}), "a function");
		strictEqual(getType((): void => {}), "a function");
		strictEqual(getType(class {}), "a function");
		strictEqual(getType(class Named {}), "a function");
		strictEqual(getType(function* (): Generator {}), "a function");
		strictEqual(getType(function* named(): Generator {}), "a function");
	});

	it('should return "a null-prototype object" for a null-prototype object', (): void => {
		strictEqual(getType(Object.create(null)), "a null-prototype object");
	});

	it('should return "an object" for an object', (): void => {
		strictEqual(getType({}), "an object");
	});

	it('should return "an instance of ClassName" for an instance of a named class', (): void => {
		strictEqual(getType(new Date()), "an instance of Date");
		strictEqual(getType(new Map()), "an instance of Map");
		strictEqual(getType(new Set()), "an instance of Set");
	});

	it('should return "an instance of an anonymous class" for an instance of an unamed class', (): void => {
		strictEqual(getType(new class {}()), "an instance of an anonymous class");
	});
});
