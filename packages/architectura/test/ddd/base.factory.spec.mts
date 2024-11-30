import { describe, it } from "node:test";
import { deepStrictEqual, doesNotReject, strictEqual } from "node:assert";
import { type SinonStub, stub } from "sinon";
import { instanceOf } from "@vitruvius-labs/toolbox";
import { DummyBaseFactory, type DummyDelegateDataInterface, type DummyInstantiationInterface, type DummyModel, getDummy } from "../../mock/_index.mjs";
import { BaseFactory } from "../../src/_index.mjs";

describe("BaseFactory", (): void => {
	describe("constructor", (): void => {
		it("should create a new factory", (): void => {
			const FACTORY: DummyBaseFactory = new DummyBaseFactory();

			// @ts-expect-error: BaseFactory is an abstract class
			instanceOf(FACTORY, BaseFactory);
		});
	});

	describe("create", (): void => {
		it("should return a new instance of the model", async (): Promise<void> => {
			const DATA: DummyDelegateDataInterface = {
				uuid: "00000000-0000-0000-0000-000000000000",
				value: "0",
			};

			const CONVERTED_DATA: DummyInstantiationInterface = {
				uuid: "00000000-0000-0000-0000-000000000000",
				value: 0,
			};

			const EXPECTED: DummyModel = getDummy();

			const FACTORY: DummyBaseFactory = new DummyBaseFactory();

			const CONVERT_STUB: SinonStub = stub(FACTORY, "convertRepositoryData");
			const CREATE_STUB: SinonStub = stub(FACTORY, "create");

			CONVERT_STUB.returns(CONVERTED_DATA);
			CREATE_STUB.returns(EXPECTED);

			const RESULT: unknown = FACTORY.createFromRepositoryData(DATA);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(CONVERT_STUB.callCount, 1, "The 'convertRepositoryData' method must be called once");
			strictEqual(CREATE_STUB.callCount, 1, "The 'create' method must be called once");
			strictEqual(CONVERT_STUB.firstCall.calledBefore(CREATE_STUB.firstCall), true, "The 'convertRepositoryData' method must be called before the 'create' method");
			deepStrictEqual(CONVERT_STUB.firstCall.args, [DATA]);
			deepStrictEqual(CREATE_STUB.firstCall.args, [CONVERTED_DATA]);
			strictEqual(await RESULT, EXPECTED);
		});
	});
});
