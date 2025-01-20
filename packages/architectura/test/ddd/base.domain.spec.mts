import { after, beforeEach, describe, it } from "node:test";
import { DummyDomain } from "../../mock/_index.mjs";
import { type SinonStub, stub } from "sinon";
import { deepStrictEqual } from "assert";

const stubbedBaseDomain: {
	Initialize: SinonStub;
} = {
	Initialize: stub(DummyDomain, "Initialize"),
};

beforeEach((): void => {
	stubbedBaseDomain.Initialize.reset();
	stubbedBaseDomain.Initialize.callThrough();
});

after((): void => {
	stubbedBaseDomain.Initialize.restore();
});

describe("BaseDomain", (): void => {
	describe("InitializeOnce", (): void => {
		it("should call the Initialize method when the Initialized property is false", async (): Promise<void> => {
			await DummyDomain.InitializeOnce();

			deepStrictEqual(stubbedBaseDomain.Initialize.calledOnceWithExactly(), true);
			deepStrictEqual(DummyDomain["Initialized"], true);
		});

		it("should not call the Initialize method when the Initialized property is true", async (): Promise<void> => {
			DummyDomain["Initialized"] = true;

			await DummyDomain.InitializeOnce();

			deepStrictEqual(stubbedBaseDomain.Initialize.called, false);
		});
	});

	describe("Initialize", (): void => {
		it("should exists but do nothing", async (): Promise<void> => {
			await DummyDomain.Initialize();
		});
	});
});
