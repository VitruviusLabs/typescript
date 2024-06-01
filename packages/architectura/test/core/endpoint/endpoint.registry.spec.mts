import { deepStrictEqual } from "node:assert/strict";
import { after, beforeEach, describe, it } from "node:test";
import { ReflectUtility } from "@vitruvius-labs/toolbox";
import { BaseEndpoint, type EndpointEntryInterface, type EndpointMatchInterface, EndpointRegistry, HTTPMethodEnum, HelloWorldEndpoint } from "../../../src/_index.mjs";

describe("EndpointRegistry", (): void => {
	const ENDPOINT_MAP: Map<string, EndpointEntryInterface> = Reflect.get(EndpointRegistry, "ENDPOINTS");

	beforeEach((): void => {
		ENDPOINT_MAP.clear();
	});

	after((): void => {
		ENDPOINT_MAP.clear();
	});

	describe("FindEndpoint", (): void => {
		it("should return a map with the HelloWorldEndpoint when no endpoint was registered, but not add it permanently", (): void => {
			const ENDPOINT: HelloWorldEndpoint = new HelloWorldEndpoint();

			const MATCHING_ENDPOINT: EndpointMatchInterface = {
				endpoint: ENDPOINT,
				contextual: true,
				matchGroups: undefined,
			};

			const EMPTY_MAP: Map<string, BaseEndpoint> = new Map();

			deepStrictEqual(EndpointRegistry.FindEndpoint(HTTPMethodEnum.GET, "/"), MATCHING_ENDPOINT);
			deepStrictEqual(ReflectUtility.Get(EndpointRegistry, "ENDPOINTS"), EMPTY_MAP);
		});

		it("should return the registered endpoint that matches (stateful)", (): void => {
			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const MATCHING_ENDPOINT: EndpointMatchInterface = {
				endpoint: ENDPOINT,
				contextual: false,
				matchGroups: undefined,
			};

			ENDPOINT_MAP.set(
				"dummy-key",
				{
					method: HTTPMethodEnum.GET,
					route: /^\/test-dummy$/,
					endpoint: ENDPOINT,
				}
			);

			deepStrictEqual(EndpointRegistry.FindEndpoint(HTTPMethodEnum.GET, "/test-dummy"), MATCHING_ENDPOINT);
		});

		it("should return the registered endpoint that matches (contextual)", (): void => {
			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const MATCHING_ENDPOINT: EndpointMatchInterface = {
				endpoint: ENDPOINT,
				contextual: true,
				matchGroups: undefined,
			};

			ENDPOINT_MAP.set(
				"dummy-key",
				{
					method: HTTPMethodEnum.GET,
					route: /^\/test-dummy$/,
					endpoint: DummyEndpoint,
				}
			);

			deepStrictEqual(EndpointRegistry.FindEndpoint(HTTPMethodEnum.GET, "/test-dummy"), MATCHING_ENDPOINT);
		});

		it("should return undefined if there is no match", (): void => {
			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ENDPOINT_MAP.set(
				"dummy-key",
				{
					method: HTTPMethodEnum.GET,
					route: /^\/test-dummy$/,
					endpoint: ENDPOINT,
				}
			);

			ENDPOINT_MAP.set(
				"dummy-key",
				{
					method: HTTPMethodEnum.POST,
					route: /^\/dummy-test$/,
					endpoint: ENDPOINT,
				}
			);

			deepStrictEqual(EndpointRegistry.FindEndpoint(HTTPMethodEnum.GET, "/dummy-test"), undefined);
		});
	});

	describe("AddEndpoint", (): void => {
		it("should keep the registered endpoint", (): void => {
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

			EndpointRegistry.AddEndpoint(ENDPOINT);
			deepStrictEqual(ReflectUtility.Get(EndpointRegistry, "ENDPOINTS"), POPULATED_MAP);
		});
	});

	describe("AddEndpointsDirectory", (): void => {
		it.skip("should explore a folder recursively and add endpoints to the registry", async (): Promise<void> => {});
		it.skip("should ignore abstract endpoints", async (): Promise<void> => {});
	});
});
