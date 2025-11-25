import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { getName } from "../../src/_index.mjs";
import { GroupType, type OldClassInstance, Values, getValues } from "@vitruvius-labs/testing-ground";

describe("getName", (): void => {
	it("should return the name of a given function, generator function, method, or class", (): void => {
		const DUMMY: Values.NamedClass = new Values.NamedClass();
		const OLD_DUMMY: OldClassInstance = new Values.NamedConstructible();

		strictEqual(getName(Values.namedAsyncCallable), "namedAsyncCallable");
		strictEqual(getName(Values.namedAsyncFunction), "namedAsyncFunction");
		strictEqual(getName(Values.namedCallable), "namedCallable");
		strictEqual(getName(Values.namedFunction), "namedFunction");
		strictEqual(getName(Values.namedGeneratorA), "namedGeneratorA");
		strictEqual(getName(Values.namedGeneratorB), "namedGeneratorB");
		strictEqual(getName(Values.namedGeneratorC), "namedGeneratorC");
		strictEqual(getName(Values.namedGeneratorD), "namedGeneratorD");
		strictEqual(getName(Values.NamedClass.AsyncMethod), "AsyncMethod");
		strictEqual(getName(Values.NamedClass.Method), "Method");
		strictEqual(getName(Values.NamedConstructible.AsyncMethod), "AsyncMethod");
		strictEqual(getName(Values.NamedConstructible.Method), "Method");
		strictEqual(getName(DUMMY.asyncMethod), "asyncMethod");
		strictEqual(getName(DUMMY.method), "method");
		strictEqual(getName(OLD_DUMMY.asyncMethod), "asyncMethod");
		strictEqual(getName(OLD_DUMMY.method), "method");
	});

	it("should return the name of the constructor of a given object", (): void => {
		const DUMMY: Values.NamedClass = new Values.NamedClass();
		const OLD_DUMMY: OldClassInstance = new Values.NamedConstructible();

		strictEqual(getName([]), "Array");
		strictEqual(getName({}), "Object");
		strictEqual(getName(DUMMY), "NamedClass");
		strictEqual(getName(OLD_DUMMY), "NamedConstructible");
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
			strictEqual(getName(ITEM), "");
		}
	});

	it("should return undefined when given anything else", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.PRIMITIVE, GroupType.SYMBOL);

		for (const ITEM of VALUES)
		{
			strictEqual(getName(ITEM), undefined);
		}
	});
});
