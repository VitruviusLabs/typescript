import { deepStrictEqual } from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { BaseEndpoint, type EndpointEntryInterface, type EndpointMatchInterface, EndpointRegistry, HTTPMethodEnum, HelloWorldEndpoint } from "../../../src/_index.mjs";

describe("EndpointRegistry", (): void => {
	beforeEach((): void => {
		Reflect.get(EndpointRegistry, "ENDPOINTS").clear();
	});

	afterEach((): void => {
		Reflect.get(EndpointRegistry, "ENDPOINTS").clear();
	});

	describe("FindEndpoint", (): void => {
		it("should return a map with the HelloWorldEndpoint when no endpoint was registered, but not add it permanently", (): void => {
			const ENDPOINT: HelloWorldEndpoint = new HelloWorldEndpoint();

			const MATCHING_ENDPOINT: EndpointMatchInterface = {
				endpoint: ENDPOINT,
				matchGroups: undefined,
			};

			const EMPTY_MAP: Map<string, BaseEndpoint> = new Map();

			deepStrictEqual(EndpointRegistry.FindEndpoint(HTTPMethodEnum.GET, "/"), MATCHING_ENDPOINT);
			deepStrictEqual(Reflect.get(EndpointRegistry, "ENDPOINTS"), EMPTY_MAP);
		});

		it("should return the registered endpoint that matches", (): void => {
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

			Reflect.get(EndpointRegistry, "ENDPOINTS").set(
				"dummy-key",
				{
					method: HTTPMethodEnum.GET,
					route: /^\/test-dummy$/,
					endpoint: ENDPOINT,
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

			Reflect.get(EndpointRegistry, "ENDPOINTS").set(
				"dummy-key",
				{
					method: HTTPMethodEnum.GET,
					route: /^\/test-dummy$/,
					endpoint: ENDPOINT,
				}
			);

			Reflect.get(EndpointRegistry, "ENDPOINTS").set(
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
			deepStrictEqual(Reflect.get(EndpointRegistry, "ENDPOINTS"), POPULATED_MAP);
		});
	});

	describe("AddEndpointsDirectory", (): void => {
		it.todo("should explore a folder recursively and add endpoints to the registry", async (): Promise<void> => {});
		it.todo("should ignore abstract endpoints", async (): Promise<void> => {});
	});
});
