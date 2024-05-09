import { deepStrictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import { BaseEndpoint, EndpointRegistry, HTTPMethodEnum, HelloWorldEndpoint, Singleton } from "../../../src/_index.mjs";

describe("EndpointRegistry", (): void =>
{
	describe("GetEndpoints", (): void =>
	{
		it("should return a map with the HelloWorldEndpoint when no endpoint was registered, but not add it permanently", (): void =>
		{
			let endpoint: HelloWorldEndpoint | undefined = Singleton.FindInstance(HelloWorldEndpoint);

			if (endpoint === undefined)
			{
				endpoint = new HelloWorldEndpoint();
			}

			const EMPTY_MAP: Map<string, BaseEndpoint> = new Map();
			const HELLO_WORLD_MAP: Map<string, BaseEndpoint> = new Map([
				["GET::/^.*$/", endpoint],
			]);

			// @ts-expect-error - We need to access this private property for test purposes.
			EndpointRegistry.ENDPOINTS.clear();

			deepStrictEqual(EndpointRegistry.GetEndpoints(), HELLO_WORLD_MAP);
			// @ts-expect-error - We need to access this private property for test purposes.
			deepStrictEqual(EndpointRegistry.ENDPOINTS, EMPTY_MAP);
		});

		it("should return the registered endpoints", (): void =>
		{
			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const ENDPOINT_MAP: Map<string, BaseEndpoint> = new Map([
				["dummy-key", ENDPOINT],
			]);

			// @ts-expect-error - We need to access this private property for test purposes.
			EndpointRegistry.ENDPOINTS.clear();
			// @ts-expect-error - We need to access this private property for test purposes.
			EndpointRegistry.ENDPOINTS.set("dummy-key", ENDPOINT);

			deepStrictEqual(EndpointRegistry.GetEndpoints(), ENDPOINT_MAP);

			// @ts-expect-error - We need to access this private property for test purposes.
			EndpointRegistry.ENDPOINTS.clear();
		});
	});

	describe("AddEndpoint", (): void =>
	{
		it("should keep the registered endpoint", (): void =>
		{
			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const POPULATED_MAP: Map<string, BaseEndpoint> = new Map([
				["GET::/^\\/test-dummy$/", ENDPOINT],
			]);

			// @ts-expect-error - We need to access this private property for test purposes.
			EndpointRegistry.ENDPOINTS.clear();
			EndpointRegistry.AddEndpoint(ENDPOINT);
			// @ts-expect-error - We need to access this private property for test purposes.
			deepStrictEqual(EndpointRegistry.ENDPOINTS, POPULATED_MAP);
			// @ts-expect-error - We need to access this private property for test purposes.
			EndpointRegistry.ENDPOINTS.clear();
		});
	});
});
