import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { TypeHint } from "../../src/_index.mjs";
import { GroupType, type OldClassInstance, Values, getValues } from "@vitruvius-labs/testing-ground";

describe("TypeHint.getName", (): void => {
	it("should return the name of a given function, generator function, method, or class", (): void => {
		const DUMMY: Values.NamedClass = new Values.NamedClass();
		const OLD_DUMMY: OldClassInstance = new Values.NamedConstructible();

		strictEqual(TypeHint.getName(Values.namedAsyncCallable), "namedAsyncCallable");
		strictEqual(TypeHint.getName(Values.namedAsyncFunction), "namedAsyncFunction");
		strictEqual(TypeHint.getName(Values.namedCallable), "namedCallable");
		strictEqual(TypeHint.getName(Values.namedFunction), "namedFunction");
		strictEqual(TypeHint.getName(Values.namedGeneratorA), "namedGeneratorA");
		strictEqual(TypeHint.getName(Values.namedGeneratorB), "namedGeneratorB");
		strictEqual(TypeHint.getName(Values.namedGeneratorC), "namedGeneratorC");
		strictEqual(TypeHint.getName(Values.namedGeneratorD), "namedGeneratorD");
		strictEqual(TypeHint.getName(Values.NamedClass.AsyncMethod), "AsyncMethod");
		strictEqual(TypeHint.getName(Values.NamedClass.Method), "Method");
		strictEqual(TypeHint.getName(Values.NamedConstructible.AsyncMethod), "AsyncMethod");
		strictEqual(TypeHint.getName(Values.NamedConstructible.Method), "Method");
		strictEqual(TypeHint.getName(DUMMY.asyncMethod), "asyncMethod");
		strictEqual(TypeHint.getName(DUMMY.method), "method");
		strictEqual(TypeHint.getName(OLD_DUMMY.asyncMethod), "asyncMethod");
		strictEqual(TypeHint.getName(OLD_DUMMY.method), "method");
	});

	it("should return the name of the constructor of a given object", (): void => {
		const DUMMY: Values.NamedClass = new Values.NamedClass();
		const OLD_DUMMY: OldClassInstance = new Values.NamedConstructible();

		strictEqual(TypeHint.getName([]), "Array");
		strictEqual(TypeHint.getName({}), "Object");
		strictEqual(TypeHint.getName(DUMMY), "NamedClass");
		strictEqual(TypeHint.getName(OLD_DUMMY), "NamedConstructible");
	});

	it("should return an empty string when given a value that has no name", (): void => {
		const VALUES: Array<unknown> = [
			Values.anonymousAsyncFunction,
			Values.anonymousCallable,
			Values.anonymousFunction,
			Values.anonymousGeneratorA,
			Values.anonymousGeneratorB,
			Values.anonymousGeneratorC,
			Values.anonymousGeneratorD,
			Values.AnonymousClass,
			Values.AnonymousConstructible,
			new Values.AnonymousClass(),
			new Values.AnonymousConstructible(),
			Object.create(null),
		];

		for (const ITEM of VALUES)
		{
			strictEqual(TypeHint.getName(ITEM), "");
		}
	});

	it("should return undefined when given anything else", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.PRIMITIVE, GroupType.SYMBOL);

		for (const ITEM of VALUES)
		{
			strictEqual(TypeHint.getName(ITEM), undefined);
		}
	});
});
