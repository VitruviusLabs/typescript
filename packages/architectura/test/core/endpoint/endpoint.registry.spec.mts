import { deepStrictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import { BaseEndpoint, type EndpointEntryInterface, type EndpointMatchInterface, EndpointRegistry, HTTPMethodEnum, HelloWorldEndpoint } from "../../../src/_index.mjs";

describe("EndpointRegistry", (): void =>
{
	describe("FindEndpoint", (): void =>
	{
		it("should return a map with the HelloWorldEndpoint when no endpoint was registered, but not add it permanently", (): void =>
		{
			const ENDPOINT: HelloWorldEndpoint = new HelloWorldEndpoint();

			const MATCHING_ENDPOINT: EndpointMatchInterface = {
				endpoint: ENDPOINT,
				matchGroups: undefined,
			};

			const EMPTY_MAP: Map<string, BaseEndpoint> = new Map();

			// @ts-expect-error - We need to access this private property for test purposes.
			EndpointRegistry.ENDPOINTS.clear();

			deepStrictEqual(EndpointRegistry.FindEndpoint(HTTPMethodEnum.GET, "/"), MATCHING_ENDPOINT);
			// @ts-expect-error - We need to access this private property for test purposes.
			deepStrictEqual(EndpointRegistry.ENDPOINTS, EMPTY_MAP);
		});

		it("should return the registered endpoint that matches", (): void =>
		{
			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const MATCHING_ENDPOINT: EndpointMatchInterface = {
				endpoint: ENDPOINT,
				matchGroups: undefined,
			};

			// @ts-expect-error - We need to access this private property for test purposes.
			EndpointRegistry.ENDPOINTS.clear();

			// @ts-expect-error - We need to access this private property for test purposes.
			EndpointRegistry.ENDPOINTS.set(
				"dummy-key",
				{
					method: HTTPMethodEnum.GET,
					route: /^\/test-dummy$/,
					endpoint: ENDPOINT,
				}
			);

			deepStrictEqual(EndpointRegistry.FindEndpoint(HTTPMethodEnum.GET, "/test-dummy"), MATCHING_ENDPOINT);

			// @ts-expect-error - We need to access this private property for test purposes.
			EndpointRegistry.ENDPOINTS.clear();
		});

		it("should return undefined if there is no match", (): void =>
		{
			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			// @ts-expect-error - We need to access this private property for test purposes.
			EndpointRegistry.ENDPOINTS.clear();

			// @ts-expect-error - We need to access this private property for test purposes.
			EndpointRegistry.ENDPOINTS.set(
				"dummy-key",
				{
					method: HTTPMethodEnum.GET,
					route: /^\/test-dummy$/,
					endpoint: ENDPOINT,
				}
			);

			// @ts-expect-error - We need to access this private property for test purposes.
			EndpointRegistry.ENDPOINTS.set(
				"dummy-key",
				{
					method: HTTPMethodEnum.POST,
					route: /^\/dummy-test$/,
					endpoint: ENDPOINT,
				}
			);

			deepStrictEqual(EndpointRegistry.FindEndpoint(HTTPMethodEnum.GET, "/dummy-test"), undefined);

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

			const METHOD: HTTPMethodEnum = ENDPOINT.getMethod();
			const ROUTE: RegExp = ENDPOINT.getRoute();

			const POPULATED_MAP: Map<string, EndpointEntryInterface> = new Map([
				[
					`${METHOD}::${ROUTE.toString()}`,
					{
						method: METHOD,
						route: ROUTE,
						endpoint: ENDPOINT,
					},
				],
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
