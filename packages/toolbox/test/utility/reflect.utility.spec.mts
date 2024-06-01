import { deepStrictEqual, strictEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { type SinonStub, stub } from "sinon";
import { ReflectUtility } from "../../src/_index.mjs";

describe("ReflectUtility", (): void => {
	describe("Get", (): void => {
		it("should throw if the specified property doesn't exists", (): void => {
			const DUMMY: object = {};

			throws((): void => { ReflectUtility.Get(DUMMY, "key"); });
		});

		it("should return the value of the specified property", (): void => {
			const DUMMY: object = {
				key: "value",
			};

			strictEqual(ReflectUtility.Get(DUMMY, "key"), "value");
		});
	});

	describe("Set", (): void => {
		it("should throw if the specified property doesn't exists", (): void => {
			const DUMMY: object = {};

			throws((): void => { ReflectUtility.Set(DUMMY, "key", "value"); });
		});

		it("should set the value of the specified property", (): void => {
			const DUMMY: { key: string | undefined } = { key: undefined };

			ReflectUtility.Set(DUMMY, "key", "value");

			strictEqual(DUMMY.key, "value");
		});
	});

	describe("Call", (): void => {
		it("should throw if the specified member doesn't exists", (): void => {
			const DUMMY: object = {};

			throws((): void => { ReflectUtility.Call(DUMMY, "key"); });
		});

		it("should throw if the specified member is not a method", (): void => {
			const DUMMY: object = {
				key: "value",
			};

			throws((): void => { ReflectUtility.Call(DUMMY, "key"); });
		});

		it("should call the specified method with the provided arguments", (): void => {
			const STUB: SinonStub = stub();

			STUB.returns(6);

			const DUMMY: object = {
				add: STUB,
			};

			const RESULT: unknown = ReflectUtility.Call(DUMMY, "add", 1, 2, 3);

			strictEqual(STUB.callCount, 1, "The method should be called exactly once");
			deepStrictEqual(STUB.firstCall.args, [1, 2, 3]);
			strictEqual(RESULT, 6);
		});
	});

	describe("Apply", (): void => {
		it("should throw if the specified member doesn't exists", (): void => {
			const DUMMY: object = {};

			throws((): void => { ReflectUtility.Apply(DUMMY, "key", []); });
		});

		it("should throw if the specified member is not a method", (): void => {
			const DUMMY: object = {
				key: "value",
			};

			throws((): void => { ReflectUtility.Apply(DUMMY, "key", []); });
		});

		it("should call the specified method with the provided arguments", (): void => {
			const STUB: SinonStub = stub();

			STUB.returns(6);

			const DUMMY: object = {
				add: STUB,
			};

			const RESULT: unknown = ReflectUtility.Apply(DUMMY, "add", [1, 2, 3]);

			strictEqual(STUB.callCount, 1, "The method should be called exactly once");
			deepStrictEqual(STUB.firstCall.args, [1, 2, 3]);
			strictEqual(RESULT, 6);
		});
	});

	describe("StaticGet", (): void => {
		it("should throw if the specified static property doesn't exists", (): void => {
			class DummyClass
			{
			}

			const DUMMY: DummyClass = new DummyClass();

			throws((): void => { ReflectUtility.StaticGet(DUMMY, "Key"); });
		});

		it("should return the value of the specified static property", (): void => {
			class DummyClass
			{
				public static Key: string = "value";
			}

			const DUMMY: DummyClass = new DummyClass();

			strictEqual(ReflectUtility.StaticGet(DUMMY, "Key"), "value");
		});
	});

	describe("StaticSet", (): void => {
		it("should throw if the specified static property doesn't exists", (): void => {
			class DummyClass
			{
			}

			const DUMMY: DummyClass = new DummyClass();

			throws((): void => { ReflectUtility.StaticSet(DUMMY, "Key", "value"); });
		});

		it("should set the value of the specified static property", (): void => {
			class DummyClass
			{
				public static Key: string | undefined = undefined;
			}

			const DUMMY: DummyClass = new DummyClass();

			ReflectUtility.StaticSet(DUMMY, "Key", "value");

			strictEqual(DummyClass.Key, "value");
		});
	});

	describe("StaticCall", (): void => {
		it("should throw if the specified static member doesn't exists", (): void => {
			class DummyClass
			{
			}

			const DUMMY: DummyClass = new DummyClass();

			throws((): void => { ReflectUtility.StaticCall(DUMMY, "Key"); });
		});

		it("should throw if the specified static member is not a method", (): void => {
			class DummyClass
			{
				public static Key: string = "value";
			}

			const DUMMY: DummyClass = new DummyClass();

			throws((): void => { ReflectUtility.StaticCall(DUMMY, "Key"); });
		});

		it("should call the specified static method with the provided arguments", (): void => {
			const STUB: SinonStub = stub();

			STUB.returns(6);

			class DummyClass
			{
				public static Add: () => number = STUB;
			}

			const DUMMY: DummyClass = new DummyClass();

			const RESULT: unknown = ReflectUtility.StaticCall(DUMMY, "Add", 1, 2, 3);

			strictEqual(STUB.callCount, 1, "The method should be called exactly once");
			deepStrictEqual(STUB.firstCall.args, [1, 2, 3]);
			strictEqual(RESULT, 6);
		});
	});

	describe("StaticApply", (): void => {
		it("should throw if the specified static member doesn't exists", (): void => {
			class DummyClass
			{
			}

			const DUMMY: DummyClass = new DummyClass();

			throws((): void => { ReflectUtility.StaticApply(DUMMY, "Key", []); });
		});

		it("should throw if the specified static member is not a method", (): void => {
			class DummyClass
			{
				public static Key: string = "value";
			}

			const DUMMY: DummyClass = new DummyClass();

			throws((): void => { ReflectUtility.StaticApply(DUMMY, "Key", []); });
		});

		it("should call the specified static method with the provided arguments", (): void => {
			const STUB: SinonStub = stub();

			STUB.returns(6);

			class DummyClass
			{
				public static Add: () => number = STUB;
			}

			const DUMMY: DummyClass = new DummyClass();

			const RESULT: unknown = ReflectUtility.StaticApply(DUMMY, "Add", [1, 2, 3]);

			strictEqual(STUB.callCount, 1, "The method should be called exactly once");
			deepStrictEqual(STUB.firstCall.args, [1, 2, 3]);
			strictEqual(RESULT, 6);
		});
	});
});
