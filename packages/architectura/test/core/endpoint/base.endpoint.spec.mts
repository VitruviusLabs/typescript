import { deepStrictEqual, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { BaseEndpoint, BaseErrorHook, BasePostHook, BasePreHook, HTTPMethodEnum } from "../../../src/_index.mjs";

describe("BaseEndpoint", (): void =>
{
	describe("getMethod", (): void =>
	{
		it("should return the method", (): void =>
		{
			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.PUT;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			strictEqual(ENDPOINT.getMethod(), HTTPMethodEnum.PUT);
		});
	});

	describe("getRoute", (): void =>
	{
		it("should return the route as is when it's a RegExp", (): void =>
		{
			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: RegExp = /test-dummy/;

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			deepStrictEqual(ENDPOINT.getRoute(), /test-dummy/);
		});

		it("should return the route as a RegExp when it is a string, that RegExp must only match the whole path", (): void =>
		{
			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			deepStrictEqual(ENDPOINT.getRoute(), /^\/test-dummy$/);
		});

		it("should preserve named capturing groups", (): void =>
		{
			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy/(?<slug>[a-z0-9-]+)";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			deepStrictEqual(ENDPOINT.getRoute(), /^\/test-dummy\/(?<slug>[a-z0-9-]+)$/);
		});
	});

	describe("getPreHooks", (): void =>
	{
		it("should return the pre hooks", (): void =>
		{
			class DummyPreHook extends BasePreHook
			{
				public execute(): void { }
			}

			const HOOK: DummyPreHook = new DummyPreHook();

			class DummyEndpoint extends BaseEndpoint
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

	describe("getExcludedGlobalPreHooks", (): void =>
	{
		it("should return the excluded pre hook constructors", (): void =>
		{
			class DummyPreHook extends BasePreHook
			{
				public execute(): void { }
			}

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";
				protected override readonly excludedGlobalPreHooks: Array<typeof BasePreHook> = [DummyPreHook];

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			deepStrictEqual(ENDPOINT.getExcludedGlobalPreHooks(), [DummyPreHook]);
		});
	});

	describe("getPostHooks", (): void =>
	{
		it("should return the post hooks", (): void =>
		{
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

	describe("getExcludedGlobalPostHooks", (): void =>
	{
		it("should return the excluded post hook constructors", (): void =>
		{
			class DummyPostHook extends BasePostHook
			{
				public execute(): void { }
			}

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";
				protected override readonly excludedGlobalPostHooks: Array<typeof BasePostHook> = [DummyPostHook];

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			deepStrictEqual(ENDPOINT.getExcludedGlobalPostHooks(), [DummyPostHook]);
		});
	});

	describe("getErrorHooks", (): void =>
	{
		it("should return the error hooks", (): void =>
		{
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

	describe("getExcludedGlobalErrorHooks", (): void =>
	{
		it("should return the excluded error hook constructors", (): void =>
		{
			class DummyErrorHook extends BaseErrorHook
			{
				public execute(): void { }
			}

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";
				protected override readonly excludedGlobalErrorHooks: Array<typeof BaseErrorHook> = [DummyErrorHook];

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			deepStrictEqual(ENDPOINT.getExcludedGlobalErrorHooks(), [DummyErrorHook]);
		});
	});
});
