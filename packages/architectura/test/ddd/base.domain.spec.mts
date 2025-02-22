import { after, beforeEach, describe, it } from "node:test";
import { DummyDomain } from "../../mock/_index.mjs";
import { type SinonStub, stub } from "sinon";
import { deepStrictEqual, doesNotReject, strictEqual } from "assert";

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
		it("should call the Initialize method when the InitializedPromise property is undefined", async (): Promise<void> => {
			DummyDomain["InitializedPromise"] = undefined;

			await DummyDomain.InitializeOnce();

			deepStrictEqual(stubbedBaseDomain.Initialize.calledOnceWithExactly(), true);
			strictEqual(DummyDomain["InitializedPromise"], stubbedBaseDomain.Initialize.firstCall.returnValue);
		});

		it("should not call the Initialize method when the Initialized property is true", async (): Promise<void> => {
			const resolvers: PromiseWithResolvers<void> = Promise.withResolvers();
			const symbol: unique symbol = Symbol();

			DummyDomain["InitializedPromise"] = resolvers.promise;

			const promise: Promise<void> = DummyDomain.InitializeOnce();

			setTimeout(
				(): void => {
					// @ts-expect-error: For testing purposes
					resolvers.resolve(symbol);
				},
				50
			);

			const result: unknown = await Promise.race([resolvers.promise, promise]);

			strictEqual(result, symbol);

			await doesNotReject(promise);

			deepStrictEqual(stubbedBaseDomain.Initialize.called, false);
		});
	});

	describe("Initialize", (): void => {
		it("should exists but do nothing", async (): Promise<void> => {
			await doesNotReject(DummyDomain.Initialize());
		});
	});
});
