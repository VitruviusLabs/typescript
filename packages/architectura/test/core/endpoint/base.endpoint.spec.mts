import { deepStrictEqual, doesNotThrow, strictEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { ReflectUtility } from "@vitruvius-labs/toolbox";
import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";
import { BaseEndpoint, BaseErrorHook, BasePostHook, BasePreHook, HTTPMethodEnum } from "../../../src/_index.mjs";
import { type MockContextInterface, mockContext } from "../../../mock/_index.mjs";

describe("BaseEndpoint", (): void => {
	describe("getPreHooks", (): void => {
		it("should return the pre hooks", (): void => {
			class DummyPreHook extends BasePreHook
			{
				public execute(): void { }
			}

			const HOOK: DummyPreHook = new DummyPreHook();

			class DummyEndpoint extends BaseEndpoint<{ query: unknown; path: unknown; payload: unknown; response: unknown }>
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";
				protected override readonly preHooks: Array<BasePreHook> = [HOOK];

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			deepStrictEqual(ENDPOINT.getPreHooks(), [HOOK]);
		});
	});

	describe("getExcludedGlobalPreHooks", (): void => {
		it("should return the excluded pre hook constructors", (): void => {
			class DummyPreHook extends BasePreHook
			{
				public execute(): void { }
			}

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";
				protected override readonly excludedGlobalPreHooks: Array<ConstructorOf<BasePreHook>> = [DummyPreHook];

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			deepStrictEqual(ENDPOINT.getExcludedGlobalPreHooks(), [DummyPreHook]);
		});
	});

	describe("getPostHooks", (): void => {
		it("should return the post hooks", (): void => {
			class DummyPostHook extends BasePostHook
			{
				public execute(): void { }
			}

			const HOOK: DummyPostHook = new DummyPostHook();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";
				protected override readonly postHooks: Array<BasePostHook> = [HOOK];

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			deepStrictEqual(ENDPOINT.getPostHooks(), [HOOK]);
		});
	});

	describe("getExcludedGlobalPostHooks", (): void => {
		it("should return the excluded post hook constructors", (): void => {
			class DummyPostHook extends BasePostHook
			{
				public execute(): void { }
			}

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";
				protected override readonly excludedGlobalPostHooks: Array<ConstructorOf<BasePostHook>> = [DummyPostHook];

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			deepStrictEqual(ENDPOINT.getExcludedGlobalPostHooks(), [DummyPostHook]);
		});
	});

	describe("getErrorHooks", (): void => {
		it("should return the error hooks", (): void => {
			class DummyErrorHook extends BaseErrorHook
			{
				public execute(): void { }
			}

			const HOOK: DummyErrorHook = new DummyErrorHook();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";
				protected override readonly errorHooks: Array<BaseErrorHook> = [HOOK];

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			deepStrictEqual(ENDPOINT.getErrorHooks(), [HOOK]);
		});
	});

	describe("getExcludedGlobalErrorHooks", (): void => {
		it("should return the excluded error hook constructors", (): void => {
			class DummyErrorHook extends BaseErrorHook
			{
				public execute(): void { }
			}

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";
				protected override readonly excludedGlobalErrorHooks: Array<ConstructorOf<BaseErrorHook>> = [DummyErrorHook];

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			deepStrictEqual(ENDPOINT.getExcludedGlobalErrorHooks(), [DummyErrorHook]);
		});
	});

	describe("getContext", (): void => {
		it("should throw if there's no context", (): void => {
			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const WRAPPER = (): void => {
				ENDPOINT["getContext"]();
			};

			throws(WRAPPER, new Error("This is not a contextual endpoint."));
		});

		it("should return the context", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			let result: unknown = undefined;

			const WRAPPER = (): void => {
				result = ENDPOINT["getContext"]();
			};

			doesNotThrow(WRAPPER);
			strictEqual(result, MOCK_CONTEXT.instance);
		});
	});

	describe("getPathFragment", (): void => {
		it("should throw if the fragment is not a string", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const WRAPPER = (): void => {
				ENDPOINT["getPathFragment"]("query");
			};

			throws(WRAPPER, new Error("The requested fragment is not a string."));
		});

		it("should return the fragment", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			let result: unknown = undefined;

			const WRAPPER = (): void => {
				result = ENDPOINT["getPathFragment"]("query");
			};

			doesNotThrow(WRAPPER);
			strictEqual(result, "query");
		});
	});
});
