import { default as assert } from "node:assert/strict";
import { describe, it } from "node:test";
import { BaseEndpoint, EndpointRegistry, HTTPMethodEnum, HelloWorldEndpoint, Singleton } from "../../../src/_index.mjs";

describe("EndpointRegistry", (): void => {
	describe("GetEndpoints", (): void => {
		it("should return the HelloWorldEndpoint when no endpoint was registered", (): void => {
			// @ts-expect-error - We need to access this private property for test purposes.
			assert.deepStrictEqual(EndpointRegistry.ENDPOINTS, new Map());
			assert.deepStrictEqual(EndpointRegistry.GetEndpoints(), new Map([["GET::^.*$", Singleton.GetInstance(HelloWorldEndpoint)]]));
		});

		it("should return the registered endpoints", (): void => {
			class DummyEndpoint extends BaseEndpoint
			{
				public readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				public readonly route: string = "^/dummy?$";

				public execute(): void {}
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			EndpointRegistry.AddEndpoint(ENDPOINT);

			// @ts-expect-error - We need to access this private property for test purposes.
			assert.deepStrictEqual(EndpointRegistry.GetEndpoints(), EndpointRegistry.ENDPOINTS);

			// @ts-expect-error - We need to access this private property for test purposes.
			EndpointRegistry.ENDPOINTS.clear();
		});
	});
});
