import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { ContentTypeEnum, type ExecutionContext, HTTPMethodEnum, HTTPStatusCodeEnum, HelloWorldEndpoint } from "../../src/_index.mjs";
import { mockContext } from "../utils/mock/mock-context.mjs";

describe("HelloWorldEndpoint", (): void => {
	describe("method", (): void => {
		it("should be GET", (): void => {
			const ENDPOINT: HelloWorldEndpoint = new HelloWorldEndpoint();

			strictEqual(Reflect.get(ENDPOINT, "method"), HTTPMethodEnum.GET);
		});
	});

	describe("route", (): void => {
		it("should match everything", (): void => {
			const ENDPOINT: HelloWorldEndpoint = new HelloWorldEndpoint();

			strictEqual(Reflect.get(ENDPOINT, "route"), ".*");
		});
	});

	describe("execute", (): void => {
		it("should respond with 'Hello World!'", async (): Promise<void> => {
			const CONTEXT: ExecutionContext = mockContext();
			const ENDPOINT: HelloWorldEndpoint = new HelloWorldEndpoint();

			await ENDPOINT.execute(CONTEXT);

			strictEqual(Reflect.get(CONTEXT.getResponse(), "statusCode"), HTTPStatusCodeEnum.OK);
			strictEqual(CONTEXT.getResponse().getHeader("Content-Type"), ContentTypeEnum.TEXT);
			strictEqual(Reflect.get(CONTEXT.getResponse(), "content"), "Hello World!");
		});
	});
});
