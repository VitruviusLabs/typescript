import { deepStrictEqual } from "node:assert/strict";
import { after, beforeEach, describe, it } from "node:test";
import { BaseEndpoint, type EndpointEntryInterface, type EndpointMatchInterface, EndpointRegistry, HTTPMethodEnum, HelloWorldEndpoint } from "../../../src/_index.mjs";
import { throws } from "node:assert";

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
			deepStrictEqual(EndpointRegistry["ENDPOINTS"], EMPTY_MAP);
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
				"wrong-path",
				{
					method: HTTPMethodEnum.GET,
					route: /^\/dummy-test$/,
					endpoint: ENDPOINT,
				}
			);

			ENDPOINT_MAP.set(
				"wrong-method",
				{
					method: HTTPMethodEnum.POST,
					route: /^\/test-dummy$/,
					endpoint: ENDPOINT,
				}
			);

			deepStrictEqual(EndpointRegistry.FindEndpoint(HTTPMethodEnum.GET, "/test-dummy"), undefined);
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
			deepStrictEqual(EndpointRegistry["ENDPOINTS"], POPULATED_MAP);
		});

		it("should throw if the endpoint is missing a method and route", (): void => {
			// @ts-expect-error: Badly formed endpoint
			class DummyEndpoint extends BaseEndpoint
			{
			}

			const WRAPPER = (): void => {
				EndpointRegistry.AddEndpoint(DummyEndpoint);
			};

			throws(WRAPPER, new Error("Endpoint is missing properties method and route."));
		});

		it("should throw if the endpoint is already registered", (): void => {
			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			EndpointRegistry.AddEndpoint(ENDPOINT);

			const WRAPPER = (): void => {
				EndpointRegistry.AddEndpoint(ENDPOINT);
			};

			throws(WRAPPER, new Error("Endpoint DummyEndpoint already added."));
		});

		it("should throw if an endpoint is already registered for this method and route combination", (): void => {
			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			class DuplicateEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();
			const DUPLICATE_ENDPOINT: DuplicateEndpoint = new DuplicateEndpoint();

			EndpointRegistry.AddEndpoint(ENDPOINT);

			const WRAPPER = (): void => {
				EndpointRegistry.AddEndpoint(DUPLICATE_ENDPOINT);
			};

			throws(WRAPPER, new Error('An endpoint is already added for method GET and route "/^\\/test-dummy$/u".'));
		});
	});

	describe("AddEndpointsDirectory", (): void => {
		it.skip("should explore a folder recursively and add endpoints to the registry", async (): Promise<void> => {});
		it.skip("should ignore abstract endpoints", async (): Promise<void> => {});
	});
});
