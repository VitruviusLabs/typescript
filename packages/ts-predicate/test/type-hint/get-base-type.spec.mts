import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { getBaseType } from "../../src/_index.mjs";
import { GroupType, type OldClassInstance, Values, getValues } from "@vitruvius-labs/testing-ground";
import { anonymousHoneyPot } from "./values/anonymous-honey-pot.mjs";
import { namedHoneyPot } from "./values/named-honey-pot.mjs";
import { HoneyPot } from "./values/class-honey-pot.mjs";

describe("getBaseType", (): void => {
	it('should return "undefined" when given undefined', (): void => {
		strictEqual(getBaseType(undefined), "undefined");
	});

	it('should return "null" when given null', (): void => {
		strictEqual(getBaseType(null), "null");
	});

	it('should return "NaN" when given NaN', (): void => {
		strictEqual(getBaseType(Number.NaN), "NaN");
	});

	it('should return "boolean" when given a boolean', (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.BOOLEAN);

		for (const ITEM of VALUES)
		{
			strictEqual(getBaseType(ITEM), "boolean");
		}
	});

	it('should return "number" when given a number', (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			strictEqual(getBaseType(ITEM), "number");
		}
	});

	it('should return "bigint" when given a big int', (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.BIG_INT);

		for (const ITEM of VALUES)
		{
			strictEqual(getBaseType(ITEM), "bigint");
		}
	});

	it('should return "string" when given a string', (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.STRING);

		for (const ITEM of VALUES)
		{
			strictEqual(getBaseType(ITEM), "string");
		}
	});

	it('should return "symbol" when given a symbol', (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.SYMBOL);

		for (const ITEM of VALUES)
		{
			strictEqual(getBaseType(ITEM), "symbol");
		}
	});

	it('should return "array" when given an array', (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.ARRAY);

		for (const ITEM of VALUES)
		{
			strictEqual(getBaseType(ITEM), "array");
		}
	});

	it('should return "class" when given a constructor', (): void => {
		const VALUES: Array<unknown> = [
			Values.AnonymousClass,
			Values.NamedClass,
			Values.NamedConstructible,
		];

		for (const ITEM of VALUES)
		{
			strictEqual(getBaseType(ITEM), "class");
		}
	});

	it('should return "async generator" when given a generator function', (): void => {
		const DUMMY: Values.NamedClass = new Values.NamedClass();

		const VALUES: Array<unknown> = [
			Values.anonymousAsyncGeneratorA,
			Values.anonymousAsyncGeneratorB,
			Values.anonymousAsyncGeneratorC,
			Values.anonymousAsyncGeneratorD,
			Values.namedAsyncGeneratorA,
			Values.namedAsyncGeneratorB,
			Values.namedAsyncGeneratorC,
			Values.namedAsyncGeneratorD,
			Values.NamedClass.AsyncGeneratorMethodA,
			Values.NamedClass.AsyncGeneratorMethodB,
			Values.NamedClass.AsyncGeneratorMethodC,
			Values.NamedClass.AsyncGeneratorMethodD,
			DUMMY.asyncGeneratorMethod,
			HoneyPot.asyncGeneratorMethod,
		];

		for (const ITEM of VALUES)
		{
			strictEqual(getBaseType(ITEM), "async generator");
		}
	});

	it('should return "generator" when given a generator function', (): void => {
		const VALUES: Array<unknown> = [
			Values.anonymousGeneratorA,
			Values.anonymousGeneratorB,
			Values.anonymousGeneratorC,
			Values.anonymousGeneratorD,
			Values.namedGeneratorA,
			Values.namedGeneratorB,
			Values.namedGeneratorC,
			Values.namedGeneratorD,
			Values.NamedClass.GeneratorMethodA,
			Values.NamedClass.GeneratorMethodB,
			Values.NamedClass.GeneratorMethodC,
			Values.NamedClass.GeneratorMethodD,
		];

		for (const ITEM of VALUES)
		{
			strictEqual(getBaseType(ITEM), "generator");
		}
	});

	it('should return "async function" when given a function or method', (): void => {
		const DUMMY: Values.NamedClass = new Values.NamedClass();
		const OLD_DUMMY: OldClassInstance = new Values.NamedConstructible();

		const VALUES: Array<unknown> = [
			Values.anonymousAsyncCallable,
			Values.anonymousAsyncFunction,
			Values.namedAsyncCallable,
			Values.namedAsyncFunction,
			Values.NamedClass.AsyncMethod,
			Values.NamedConstructible.AsyncMethod,
			DUMMY.asyncMethod,
			OLD_DUMMY.asyncMethod,
		];

		for (const ITEM of VALUES)
		{
			strictEqual(getBaseType(ITEM), "async function");
		}
	});

	it('should return "function" when given a function or method', (): void => {
		const DUMMY: Values.NamedClass = new Values.NamedClass();
		const OLD_DUMMY: OldClassInstance = new Values.NamedConstructible();

		const VALUES: Array<unknown> = [
			Values.anonymousCallable,
			Values.anonymousFunction,
			Values.namedCallable,
			Values.namedFunction,
			Values.NamedClass.Method,
			DUMMY.method,
			OLD_DUMMY.method,
			anonymousHoneyPot,
			namedHoneyPot,
			HoneyPot.method,
		];

		for (const ITEM of VALUES)
		{
			strictEqual(getBaseType(ITEM), "function");
		}
	});

	it('should return "object" when given an object', (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.OBJECT);

		for (const ITEM of VALUES)
		{
			strictEqual(getBaseType(ITEM), "object");
		}
	});
});
