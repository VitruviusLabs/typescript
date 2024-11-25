import { describe, it } from "node:test";
import { match, strictEqual } from "node:assert";
import { ExecutionContext, type RichClientRequest, type RichServerResponse } from "../../../src/_index.mjs";
import { mockRequest } from "../../../mock/core/server/mock-request.mjs";
import { mockResponse } from "../../../mock/core/server/mock-response.mjs";

describe("ExecutionContext", (): void => {
	describe("constructor", (): void => {
		it("should create a new instance of ExecutionContext", (): void => {
			const REQUEST: RichClientRequest = mockRequest().instance;
			const RESPONSE: RichServerResponse = mockResponse().instance;

			const CONTEXT: ExecutionContext = new ExecutionContext({
				request: REQUEST,
				response: RESPONSE,
			});

			match(CONTEXT.uuid, /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/);
			strictEqual(CONTEXT.request, REQUEST);
			strictEqual(CONTEXT.response, RESPONSE);
		});
	});

	describe("getUUID", (): void => {
		it("should return the UUID", (): void => {
			const REQUEST: RichClientRequest = mockRequest().instance;
			const RESPONSE: RichServerResponse = mockResponse().instance;

			const CONTEXT: ExecutionContext = new ExecutionContext({
				request: REQUEST,
				response: RESPONSE,
			});

			strictEqual(CONTEXT.getUUID(), CONTEXT.uuid);
		});
	});

	describe("getRequest", (): void => {
		it("should return the request", (): void => {
			const REQUEST: RichClientRequest = mockRequest().instance;
			const RESPONSE: RichServerResponse = mockResponse().instance;

			const CONTEXT: ExecutionContext = new ExecutionContext({
				request: REQUEST,
				response: RESPONSE,
			});

			strictEqual(CONTEXT.getRequest(), REQUEST);
		});
	});

	describe("getResponse", (): void => {
		it("should return the response", (): void => {
			const REQUEST: RichClientRequest = mockRequest().instance;
			const RESPONSE: RichServerResponse = mockResponse().instance;

			const CONTEXT: ExecutionContext = new ExecutionContext({
				request: REQUEST,
				response: RESPONSE,
			});

			strictEqual(CONTEXT.getResponse(), RESPONSE);
		});
	});
});
