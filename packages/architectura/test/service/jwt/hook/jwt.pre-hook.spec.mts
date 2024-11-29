import { beforeEach, describe, it } from "node:test";
import { deepStrictEqual, strictEqual } from "node:assert";
import { type SinonStub, stub } from "sinon";
import { JWT, JWTFactory, JWTPreHook } from "../../../../src/_index.mjs";
import { type MockContextInterface, mockContext } from "../../../../mock/_index.mjs";

describe("JWTPreHook", (): void => {
	const JWT_FACTORY_PARSE_STUB: SinonStub = stub(JWTFactory, "Parse");

	beforeEach((): void => {
		JWT_FACTORY_PARSE_STUB.reset();
	});

	describe("constructor", (): void => {
		it("should create a new JWT pre-hook", (): void => {
			const HOOK: JWTPreHook = new JWTPreHook("your-256-bit-secret-here");

			strictEqual(HOOK["secret"], "your-256-bit-secret-here");
		});
	});

	describe("execute", (): void => {
		it("should do nothing without an 'Authorization' header", (): void => {
			const CONTEXT: MockContextInterface = mockContext();

			CONTEXT.request.stubs.getHeader.returns(undefined);

			const HOOK: JWTPreHook = new JWTPreHook("your-256-bit-secret-here");

			HOOK.execute(CONTEXT.instance);

			strictEqual(CONTEXT.request.stubs.getHeader.callCount, 1, "'getHeader' should have been called once");
			strictEqual(CONTEXT.stubs.setContextualItem.callCount, 0, "'setContextualItem' should not have been called");
		});

		it("should do nothing with an 'Authorization' header that's not 'Bearer'", (): void => {
			/* cspell:disable */
			const HEADER: string = "Basic YWxhZGRpbjpvcGVuc2VzYW1l";
			/* cspell:enable */

			const CONTEXT: MockContextInterface = mockContext();

			CONTEXT.request.stubs.getHeader.returns(HEADER);

			const HOOK: JWTPreHook = new JWTPreHook("your-256-bit-secret-here");

			HOOK.execute(CONTEXT.instance);

			strictEqual(CONTEXT.request.stubs.getHeader.callCount, 1, "'getHeader' should have been called once");
			strictEqual(CONTEXT.stubs.setContextualItem.callCount, 0, "'setContextualItem' should not have been called");
		});

		it("should create a JWT from a 'Authorization: Bearer' header and attach it to the context", (): void => {
			const TOKEN: JWT = new JWT("RSA-SHA256", "your-256-bit-secret-here", {});
			const HEADER: string = `Bearer ${TOKEN.toString()}`;

			const CONTEXT: MockContextInterface = mockContext();

			CONTEXT.request.stubs.getHeader.returns(HEADER);
			JWT_FACTORY_PARSE_STUB.returns(TOKEN);

			const HOOK: JWTPreHook = new JWTPreHook("your-256-bit-secret-here");

			HOOK.execute(CONTEXT.instance);

			strictEqual(CONTEXT.request.stubs.getHeader.callCount, 1, "'RichClientRequest.getHeader' should have been called once");
			strictEqual(JWT_FACTORY_PARSE_STUB.callCount, 1, "'JWTFactory.Parse' should have been called once");
			strictEqual(CONTEXT.stubs.setContextualItem.callCount, 1, "'setContextualItem' should have been called once");
			deepStrictEqual(CONTEXT.stubs.setContextualItem.firstCall.args, [JWT, TOKEN]);
		});
	});
});
