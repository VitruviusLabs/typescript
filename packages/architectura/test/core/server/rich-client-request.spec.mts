import { afterEach, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, rejects, strictEqual, throws } from "node:assert";
import { type SinonStub, stub } from "sinon";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { RichClientRequest } from "../../../src/_index.mjs";
import { mockRequest } from "../../utils/mock/mock-request.mjs";
import { asStub } from "../../utils/as-stub.mjs";
import { parse as parseQuery } from "node:querystring";
import { resolves } from "../../utils/assert/resolves.mjs";

describe("RichClientRequest", (): void => {
	describe("constructor", (): void => {
		it("should create a new request", async (): Promise<void> => {
			const REQUEST: RichClientRequest = mockRequest();

			strictEqual(Reflect.get(REQUEST, "pathMatchGroups"), undefined);
			strictEqual(Reflect.get(REQUEST, "initialized"), false);
			deepStrictEqual(Reflect.get(REQUEST, "cookies"), new Map());
			strictEqual(Reflect.get(REQUEST, "path"), undefined);
			deepStrictEqual(Reflect.get(REQUEST, "pathFragments"), []);
			deepStrictEqual(Reflect.get(REQUEST, "query"), {});
			strictEqual(Reflect.get(REQUEST, "contentType"), undefined);
			strictEqual(Reflect.get(REQUEST, "boundary"), undefined);
			await resolves(Reflect.get(REQUEST, "rawBody"), Buffer.alloc(0));
		});
	});

	describe("ListenForContent", (): void => {
		it("should listen for content and resolve as a Buffer", async (): Promise<void> => {
			const REQUEST: RichClientRequest = mockRequest();

			const PROMISE: Promise<Buffer> = Reflect.get(RichClientRequest, "ListenForContent").call(RichClientRequest, REQUEST);

			Reflect.set(REQUEST, "complete", true);
			REQUEST.emit("data", Buffer.from("Hello, "));
			REQUEST.emit("data", Buffer.from("World!"));
			REQUEST.emit("end");

			await resolves(PROMISE, Buffer.from("Hello, World!"));
		});

		it("should reject if the connection is terminated", async (): Promise<void> => {
			const REQUEST: RichClientRequest = mockRequest();

			const PROMISE: Promise<Buffer> = Reflect.get(RichClientRequest, "ListenForContent").call(RichClientRequest, REQUEST);

			REQUEST.emit("error", new Error("Payload issue"));

			await rejects(PROMISE, createErrorTest());
		});

		it("should reject if the message is not completely sent", async (): Promise<void> => {
			const REQUEST: RichClientRequest = mockRequest();

			const PROMISE: Promise<Buffer> = Reflect.get(RichClientRequest, "ListenForContent").call(RichClientRequest, REQUEST);

			Reflect.set(REQUEST, "complete", false);
			REQUEST.emit("data", Buffer.from("Hello, "));
			REQUEST.emit("end");

			await rejects(PROMISE, createErrorTest());
		});
	});

	describe("initialize", (): void => {
		beforeEach((): void => {
			// @ts-expect-error: Stub private method
			stub(RichClientRequest, "ListenForContent");
		});

		afterEach((): void => {
			asStub(Reflect.get(RichClientRequest, "ListenForContent")).restore();
		});

		it("should initialize the request", async (): Promise<void> => {
			const STUB: SinonStub = asStub(Reflect.get(RichClientRequest, "ListenForContent"));
			const REQUEST: RichClientRequest = mockRequest();

			STUB.resolves(Buffer.from("Hello, World"));

			REQUEST.url = "/api/v1/resource?key=value";
			REQUEST.headers["content-type"] = "multipart/form-data; boundary=-----123456789";
			REQUEST.headersDistinct["content-type"] = ["multipart/form-data; boundary=-----123456789"];
			REQUEST.headers.cookie = "alpha=1; beta=2; delta=3";
			REQUEST.headersDistinct["cookie"] = ["alpha=1; beta=2", "delta=3"];

			REQUEST.initialize();

			strictEqual(Reflect.get(REQUEST, "initialized"), true);
			strictEqual(Reflect.get(REQUEST, "contentType"), "multipart/form-data");
			strictEqual(Reflect.get(REQUEST, "boundary"), "-------123456789");
			deepStrictEqual(Reflect.get(REQUEST, "cookies"), new Map([["alpha", "1"], ["beta", "2"], ["delta", "3"]]));
			strictEqual(Reflect.get(REQUEST, "path"), "/api/v1/resource");
			deepStrictEqual(Reflect.get(REQUEST, "pathFragments"), ["api", "v1", "resource"]);
			deepStrictEqual(Reflect.get(REQUEST, "query"), parseQuery("key=value"));
			strictEqual(STUB.calledOnce, true, "'ListenForContent' should be called exactly once");
			deepStrictEqual(STUB.firstCall.args, [REQUEST]);
			await resolves(Reflect.get(REQUEST, "rawBody"), Buffer.from("Hello, World"));
		});

		it("should throw if initialized more than once", (): void => {
			const REQUEST: RichClientRequest = mockRequest();

			Reflect.set(REQUEST, "initialized", true);

			const WRAPPER = (): void => {
				REQUEST.initialize();
			};

			throws(WRAPPER, createErrorTest());
		});
	});

	describe("getUnsafeMethod", (): void => {});
	describe("hasStandardMethod", (): void => {});
	describe("getMethod", (): void => {});
	describe("getUnsafeURL", (): void => {});
	describe("hasURL", (): void => {});
	describe("getURL", (): void => {});
	describe("getUnsafePath", (): void => {});
	describe("hasPath", (): void => {});
	describe("getPath", (): void => {});
	describe("getPathFragments", (): void => {});
	describe("getPathMatchGroups", (): void => {});
	describe("getQuery", (): void => {});
	describe("hasQueryItem", (): void => {});
	describe("getQueryItemAll", (): void => {});
	describe("getQueryItem", (): void => {});
	describe("getRawHeaders", (): void => {});
	describe("getHeaders", (): void => {});
	describe("hasHeader", (): void => {});
	describe("getRawHeader", (): void => {});
	describe("getHeader", (): void => {});
	describe("getCookies", (): void => {});
	describe("hasCookie", (): void => {});
	describe("getCookie", (): void => {});
	describe("getBoundary", (): void => {});
	describe("getContentType", (): void => {});
	describe("getRawBody", (): void => {});
	describe("getBodyAsString", (): void => {});
	describe("getBodyAsJSON", (): void => {});
});
