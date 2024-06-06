import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { ReflectUtility } from "@vitruvius-labs/toolbox";
import { ContentTypeEnum, type ExecutionContext, HTTPMethodEnum, HTTPStatusCodeEnum, HelloWorldEndpoint } from "../../src/_index.mjs";
import { mockContext } from "../../mock/_index.mjs";

describe("HelloWorldEndpoint", (): void => {
	describe("method", (): void => {
		it("should be GET", (): void => {
			const ENDPOINT: HelloWorldEndpoint = new HelloWorldEndpoint();

			strictEqual(ReflectUtility.Get(ENDPOINT, "method"), HTTPMethodEnum.GET);
		});
	});

	describe("route", (): void => {
		it("should match everything", (): void => {
			const ENDPOINT: HelloWorldEndpoint = new HelloWorldEndpoint();

			strictEqual(ReflectUtility.Get(ENDPOINT, "route"), ".*");
		});
	});

	describe("execute", (): void => {
		it("should respond with 'Hello World!'", async (): Promise<void> => {
			const CONTEXT: ExecutionContext = mockContext().instance;
			const ENDPOINT: HelloWorldEndpoint = new HelloWorldEndpoint();

			await ENDPOINT.execute(CONTEXT);

			strictEqual(ReflectUtility.Get(CONTEXT.getResponse(), "statusCode"), HTTPStatusCodeEnum.OK);
			strictEqual(CONTEXT.getResponse().getHeader("Content-Type"), ContentTypeEnum.TEXT);
			strictEqual(ReflectUtility.Get(CONTEXT.getResponse(), "content"), "Hello World!");
		});
	});
});
