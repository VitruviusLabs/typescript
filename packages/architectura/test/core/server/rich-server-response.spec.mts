import type { OutgoingHttpHeaders } from "node:http";
import { describe, it } from "node:test";
import { deepStrictEqual, rejects, strictEqual, throws } from "node:assert";
import { createBrotliCompress, createDeflate, createGzip } from "node:zlib";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { getConstructorOf } from "@vitruvius-labs/ts-predicate";
import { ReflectUtility, instanceOf, jsonSerialize } from "@vitruvius-labs/toolbox";
import { ContentEncodingEnum, ContentTypeEnum, type CookieDescriptorInterface, CookieSameSiteEnum, HTTPStatusCodeEnum, type ReplyInterface, RichServerResponse } from "../../../src/_index.mjs";
import { type MockRequestInterface, type MockResponseInterface, mockRequest, mockResponse, nullPrototype } from "../../../mock/_index.mjs";

describe("RichServerResponse", (): void => {
	describe("constructor", (): void => {
		it("should create a new response", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			strictEqual(RESPONSE["locked"], false);
			strictEqual(RESPONSE["processed"], false);
			strictEqual(RESPONSE["content"], undefined);
			deepStrictEqual(RESPONSE["cookies"], new Map());
		});
	});

	describe("GetEncoder", (): void => {
		it("should return the corresponding zlib encoder", (): void => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			const GZIP: unknown = ReflectUtility.StaticCall(RESPONSE, "GetEncoder", ContentEncodingEnum.GZIP);
			const BROTLI: unknown = ReflectUtility.StaticCall(RESPONSE, "GetEncoder", ContentEncodingEnum.BROTLI);
			const DEFLATE: unknown = ReflectUtility.StaticCall(RESPONSE, "GetEncoder", ContentEncodingEnum.DEFLATE);

			/* Zlib do not expose the classes, so we retrieve them indirectly. */
			/* Internal buffers prevent using deepStrictEqual on the created instances. */
			instanceOf(GZIP, getConstructorOf(createGzip()));
			instanceOf(BROTLI, getConstructorOf(createBrotliCompress()));
			instanceOf(DEFLATE, getConstructorOf(createDeflate()));
		});
	});

	describe("json", (): void => {
		it("should reply with the given JSON (object)", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			RESPONSE_MOCK.stubs.replyWith.resolves();

			const PARAMETER: ReplyInterface = {
				status: HTTPStatusCodeEnum.OK,
				contentType: ContentTypeEnum.JSON,
				payload: {
					message: "Hello, World!",
					lorem: "ipsum",
					alpha: "omega",
					id: [1n, 2n, 3n],
				},
			};

			await RESPONSE.json(PARAMETER.payload);

			strictEqual(RESPONSE_MOCK.stubs.replyWith.callCount, 1, "'replyWith' should be called exactly once");
			deepStrictEqual(RESPONSE_MOCK.stubs.replyWith.firstCall.args, [PARAMETER]);
		});

		it("should reply with the given JSON (serialized)", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			RESPONSE_MOCK.stubs.replyWith.resolves();

			const DATA: object = {
				message: "Hello, World!",
				lorem: "ipsum",
				alpha: "omega",
				id: [1n, 2n, 3n],
			};

			const PARAMETER: ReplyInterface = {
				status: HTTPStatusCodeEnum.OK,
				contentType: ContentTypeEnum.JSON,
				payload: jsonSerialize(DATA),
			};

			await RESPONSE.json(PARAMETER.payload);

			strictEqual(RESPONSE_MOCK.stubs.replyWith.callCount, 1, "'replyWith' should be called exactly once");
			deepStrictEqual(RESPONSE_MOCK.stubs.replyWith.firstCall.args, [PARAMETER]);
		});
	});

	describe("html", (): void => {
		it("should reply with the given message (string)", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			RESPONSE_MOCK.stubs.replyWith.resolves();

			const PARAMETER: ReplyInterface = {
				status: HTTPStatusCodeEnum.OK,
				contentType: ContentTypeEnum.HTML,
				payload: "Hello, World!",
			};

			await RESPONSE.html("Hello, World!");

			strictEqual(RESPONSE_MOCK.stubs.replyWith.callCount, 1, "'replyWith' should be called exactly once");
			deepStrictEqual(RESPONSE_MOCK.stubs.replyWith.firstCall.args, [PARAMETER]);
		});

		it("should reply with the given message (Buffer)", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			RESPONSE_MOCK.stubs.replyWith.resolves();

			const PARAMETER: ReplyInterface = {
				status: HTTPStatusCodeEnum.OK,
				contentType: ContentTypeEnum.HTML,
				payload: Buffer.from("Hello, World!"),
			};

			await RESPONSE.html(Buffer.from("Hello, World!"));

			strictEqual(RESPONSE_MOCK.stubs.replyWith.callCount, 1, "'replyWith' should be called exactly once");
			deepStrictEqual(RESPONSE_MOCK.stubs.replyWith.firstCall.args, [PARAMETER]);
		});
	});

	describe("text", (): void => {
		it("should reply with the given message (string)", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			RESPONSE_MOCK.stubs.replyWith.resolves();

			const PARAMETER: ReplyInterface = {
				status: HTTPStatusCodeEnum.OK,
				contentType: ContentTypeEnum.TEXT,
				payload: "Hello, World!",
			};

			await RESPONSE.text("Hello, World!");

			strictEqual(RESPONSE_MOCK.stubs.replyWith.callCount, 1, "'replyWith' should be called exactly once");
			deepStrictEqual(RESPONSE_MOCK.stubs.replyWith.firstCall.args, [PARAMETER]);
		});

		it("should reply with the given message (Buffer)", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			RESPONSE_MOCK.stubs.replyWith.resolves();

			const PARAMETER: ReplyInterface = {
				status: HTTPStatusCodeEnum.OK,
				contentType: ContentTypeEnum.TEXT,
				payload: Buffer.from("Hello, World!"),
			};

			await RESPONSE.text(Buffer.from("Hello, World!"));

			strictEqual(RESPONSE_MOCK.stubs.replyWith.callCount, 1, "'replyWith' should be called exactly once");
			deepStrictEqual(RESPONSE_MOCK.stubs.replyWith.firstCall.args, [PARAMETER]);
		});
	});

	describe("replyWith", (): void => {
		it("should rejects if the response is locked", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			ReflectUtility.Set(RESPONSE, "locked", true);

			await rejects(RESPONSE.replyWith(HTTPStatusCodeEnum.OK));
		});

		it("should set the 'locked' flag when called, and the 'processed' flag when done", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			await RESPONSE.replyWith(HTTPStatusCodeEnum.CREATED);

			strictEqual(RESPONSE["locked"], true);
			strictEqual(RESPONSE["processed"], true);
		});

		it("should set the 'processed' flag when done, even if an error is thrown", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			RESPONSE_MOCK.stubs.end.throws(new Error("For testing purposes"));

			await rejects(RESPONSE.replyWith(HTTPStatusCodeEnum.CREATED), createErrorTest());

			strictEqual(RESPONSE["processed"], true);
		});

		it("should accept a status code and send the response", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			await RESPONSE.replyWith(HTTPStatusCodeEnum.CREATED);

			strictEqual(RESPONSE_MOCK.stubs.write.callCount, 0, "'write' should not be called");
			strictEqual(RESPONSE_MOCK.stubs.end.callCount, 1, "'end' should be called exactly once");

			strictEqual(RESPONSE.statusCode, HTTPStatusCodeEnum.CREATED);
			deepStrictEqual(RESPONSE.getHeaders(), nullPrototype({}));
		});

		it("should add 'Set-Cookie' headers if needed", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			const COOKIES: Map<string, CookieDescriptorInterface> = new Map([
				["dummy", { name: "dummy", value: "empty", httpOnly: false, secure: false }],
				["lorem", { name: "lorem", value: "ipsum", secure: true, maxAge: 42, partitioned: true }],
				["alpha", { name: "alpha", value: "omega", sameSite: CookieSameSiteEnum.STRICT }],
				["hello", { name: "hello", value: "world", expires: new Date("2099-12-31T12:34:56Z") }],
				["scoped", { name: "scoped", value: "test", domain: "example.com", path: "/test" }],
			]);

			const HEADERS: OutgoingHttpHeaders = nullPrototype({
				"set-cookie": [
					"dummy=empty",
					"lorem=ipsum; HttpOnly; Secure; Max-Age=42; Partitioned",
					"alpha=omega; HttpOnly; SameSite=Strict",
					"hello=world; HttpOnly; Expires=Thu, 31 Dec 2099 12:34:56 GMT",
					"scoped=test; HttpOnly; Domain=example.com; Path=/test",
				],
			});

			ReflectUtility.Set(RESPONSE, "cookies", COOKIES);

			await RESPONSE.replyWith(HTTPStatusCodeEnum.OK);

			deepStrictEqual(RESPONSE.getHeaders(), HEADERS);
		});

		it("should process the 'statusCode' property of the parameter", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			const PARAMETER: ReplyInterface = {
				status: HTTPStatusCodeEnum.UNAUTHORIZED,
			};

			await RESPONSE.replyWith(PARAMETER);

			strictEqual(RESPONSE.statusCode, HTTPStatusCodeEnum.UNAUTHORIZED);
		});

		it("should process the 'headers' property of the parameter", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			const HEADERS: OutgoingHttpHeaders = nullPrototype({
				"accept": "text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8",
				"accept-encoding": "br, gzip;q=0.8, deflate;q=0.5",
				"accept-language": "fr-FR,fr;q=0.8,en;q=0.5",
			});

			const PARAMETER: ReplyInterface = {
				headers: {
					"Accept": "text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8",
					"Accept-Encoding": "br, gzip;q=0.8, deflate;q=0.5",
					"Accept-Language": "fr-FR,fr;q=0.8,en;q=0.5",
				},
			};

			await RESPONSE.replyWith(PARAMETER);

			deepStrictEqual(RESPONSE.getHeaders(), HEADERS);
		});

		it("should process the 'cookies' property of the parameter", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			const HEADERS: OutgoingHttpHeaders = nullPrototype({
				"set-cookie": [
					"lorem=ipsum; HttpOnly; Secure",
					"alpha=omega; HttpOnly; SameSite=Strict",
					"hello=world; HttpOnly; Expires=Thu, 31 Dec 2099 12:34:56 GMT",
				],
			});

			const PARAMETER: ReplyInterface = {
				cookies: [
					{ name: "lorem", value: "ipsum", secure: true },
					{ name: "alpha", value: "omega", sameSite: CookieSameSiteEnum.STRICT },
					{ name: "hello", value: "world", expires: new Date("2099-12-31T12:34:56Z") },
				],
			};

			await RESPONSE.replyWith(PARAMETER);

			deepStrictEqual(RESPONSE.getHeaders(), HEADERS);
		});

		it("should process the 'payload' property of the parameter (string)", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			const PARAMETER: ReplyInterface = {
				payload: "Hello, World!",
			};

			await RESPONSE.replyWith(PARAMETER);

			strictEqual(RESPONSE_MOCK.stubs.write.callCount, 1, "'write' should be called exactly once");
			deepStrictEqual(RESPONSE_MOCK.stubs.write.firstCall.args, ["Hello, World!"]);
			strictEqual(RESPONSE_MOCK.stubs.end.callCount, 1, "'end' should be called exactly once");

			strictEqual(RESPONSE.getHeader("Content-Type"), ContentTypeEnum.TEXT);
			strictEqual(RESPONSE["content"], "Hello, World!");
		});

		it("should process the 'payload' property of the parameter (Buffer)", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			const PARAMETER: ReplyInterface = {
				payload: Buffer.from("Hello, World!"),
			};

			await RESPONSE.replyWith(PARAMETER);

			strictEqual(RESPONSE_MOCK.stubs.write.callCount, 1, "'write' should be called exactly once");
			deepStrictEqual(RESPONSE_MOCK.stubs.write.firstCall.args, [Buffer.from("Hello, World!")]);
			strictEqual(RESPONSE_MOCK.stubs.end.callCount, 1, "'end' should be called exactly once");

			strictEqual(RESPONSE.getHeader("Content-Type"), ContentTypeEnum.BINARY);
			deepStrictEqual(RESPONSE["content"], Buffer.from("Hello, World!"));
		});

		it("should process the 'payload' property of the parameter (JSON)", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			const DATA: object = {
				message: "Hello, World!",
				lorem: "ipsum",
				alpha: "omega",
				id: [1n, 2n, 3n],
			};

			const SERIALIZED_DATA: string = jsonSerialize(DATA);

			await RESPONSE.replyWith({
				payload: DATA,
			});

			strictEqual(RESPONSE_MOCK.stubs.write.callCount, 1, "'write' should be called exactly once");
			deepStrictEqual(RESPONSE_MOCK.stubs.write.firstCall.args, [SERIALIZED_DATA]);
			strictEqual(RESPONSE_MOCK.stubs.end.callCount, 1, "'end' should be called exactly once");

			strictEqual(RESPONSE.getHeader("Content-Type"), ContentTypeEnum.JSON);
			strictEqual(RESPONSE["content"], SERIALIZED_DATA);
		});

		it("should ignore the 'contentType' property of the parameter when without a 'payload' property", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			const PARAMETER: ReplyInterface = {
				contentType: ContentTypeEnum.JSON,
			};

			await RESPONSE.replyWith(PARAMETER);

			strictEqual(RESPONSE.getHeader("Content-Type"), undefined);
		});

		it("should process the 'contentType' property of the parameter", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			const DATA: object = {
				message: "Hello, World!",
				lorem: "ipsum",
				alpha: "omega",
				id: [1n, 2n, 3n],
			};

			const PARAMETER: ReplyInterface = {
				contentType: ContentTypeEnum.JSON,
				payload: jsonSerialize(DATA),
			};

			await RESPONSE.replyWith(PARAMETER);

			strictEqual(RESPONSE.getHeader("Content-Type"), ContentTypeEnum.JSON);
			strictEqual(RESPONSE["content"], PARAMETER.payload);
		});

		it.todo("should encode the payload when possible");
	});

	describe("isLocked", (): void => {
		it("should return false if the response is not locked", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			ReflectUtility.Set(RESPONSE, "locked", false);
			strictEqual(RESPONSE.isLocked(), false);
		});

		it("should return true if the response is locked", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			ReflectUtility.Set(RESPONSE, "locked", true);
			strictEqual(RESPONSE.isLocked(), true);
		});
	});

	describe("isProcessed", (): void => {
		it("should return false if the response is not processed", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			ReflectUtility.Set(RESPONSE, "processed", false);
			strictEqual(RESPONSE.isProcessed(), false);
		});

		it("should return true if the response is processed", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			ReflectUtility.Set(RESPONSE, "processed", true);
			strictEqual(RESPONSE.isProcessed(), true);
		});
	});

	describe("hasContent", (): void => {
		it("should return false if the content is empty", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			ReflectUtility.Set(RESPONSE, "content", undefined);
			strictEqual(RESPONSE.hasContent(), false);
		});

		it("should return true if the content is not empty", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			ReflectUtility.Set(RESPONSE, "content", "");
			strictEqual(RESPONSE.hasContent(), true);
		});
	});

	describe("getUnsafeContent", (): void => {
		it("should return the content as-is", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			const BUFFER: Buffer = Buffer.from("Hello, World!");

			ReflectUtility.Set(RESPONSE, "content", BUFFER);
			strictEqual(RESPONSE.getUnsafeContent(), BUFFER);
		});
	});

	describe("getRawContent", (): void => {
		it("should return the content as an empty Buffer if the content is empty", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			ReflectUtility.Set(RESPONSE, "content", undefined);
			deepStrictEqual(RESPONSE.getRawContent(), Buffer.alloc(0));
		});

		it("should return the content as-is if it's a buffer", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			ReflectUtility.Set(RESPONSE, "content", Buffer.from("Hello, World!"));
			deepStrictEqual(RESPONSE.getRawContent(), Buffer.from("Hello, World!"));
		});

		it("should return the content converted as a buffer if it's a string", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			ReflectUtility.Set(RESPONSE, "content", "Hello, World!");
			deepStrictEqual(RESPONSE.getRawContent(), Buffer.from("Hello, World!"));
		});
	});

	describe("getContent", (): void => {
		it("should return the content as an empty string if the content is empty", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			ReflectUtility.Set(RESPONSE, "content", undefined);
			strictEqual(RESPONSE.getContent(), "");
		});

		it("should return the content as a string if it's a buffer", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			ReflectUtility.Set(RESPONSE, "content", Buffer.from("Hello, World!"));
			strictEqual(RESPONSE.getContent(), "Hello, World!");
		});

		it("should return the content as-is if it's a string", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			ReflectUtility.Set(RESPONSE, "content", "Hello, World!");
			strictEqual(RESPONSE.getContent(), "Hello, World!");
		});
	});

	describe("setContent", (): void => {
		it("should throw if the request is locked", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			ReflectUtility.Set(RESPONSE, "locked", true);

			const WRAPPER = (): void => {
				RESPONSE.setContent("Hello, World!");
			};

			throws(WRAPPER, new Error("This response is locked and will no longer accept changes."));
		});

		it("should set the content", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			RESPONSE.setContent("Hello, World!");
			strictEqual(RESPONSE["content"], "Hello, World!");
		});
	});

	describe("getStatusCode", (): void => {
		it("should return the status code", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			ReflectUtility.Set(RESPONSE, "statusCode", HTTPStatusCodeEnum.PAYLOAD_TOO_LARGE);
			strictEqual(RESPONSE.getStatusCode(), HTTPStatusCodeEnum.PAYLOAD_TOO_LARGE);
		});
	});

	describe("setStatusCode", (): void => {
		it("should throw if the request is locked", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			ReflectUtility.Set(RESPONSE, "locked", true);

			const WRAPPER = (): void => {
				RESPONSE.setStatusCode(HTTPStatusCodeEnum.PAYLOAD_TOO_LARGE);
			};

			throws(WRAPPER, new Error("This response is locked and will no longer accept changes."));
		});

		it("should set the status code", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			RESPONSE.setStatusCode(HTTPStatusCodeEnum.PAYLOAD_TOO_LARGE);
			strictEqual(RESPONSE.statusCode, HTTPStatusCodeEnum.PAYLOAD_TOO_LARGE);
		});
	});

	describe("getHeaderRaw", (): void => {
		it("should return the raw header value (missing)", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			strictEqual(RESPONSE.getHeaderRaw("Content-Type"), undefined);
		});

		it("should return the raw header value (number)", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			RESPONSE.setHeader("Content-Length", 42);
			strictEqual(RESPONSE.getHeaderRaw("Content-Length"), 42);
		});

		it("should return the raw header value (string)", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			RESPONSE.setHeader("Content-Type", "text/plain");
			strictEqual(RESPONSE.getHeaderRaw("Content-Type"), "text/plain");
		});

		it("should return the raw header value (array)", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			RESPONSE.setHeader("Set-Cookie", ["lorem=ipsum", "alpha=omega"]);
			deepStrictEqual(RESPONSE.getHeaderRaw("Set-Cookie"), ["lorem=ipsum", "alpha=omega"]);
		});
	});

	describe("getHeaderAll", (): void => {
		it("should return all the values for that header (missing)", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			deepStrictEqual(RESPONSE.getHeaderAll("Content-Type"), []);
		});

		it("should return all the values for that header (number)", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			RESPONSE.setHeader("Content-Length", 42);
			deepStrictEqual(RESPONSE.getHeaderAll("Content-Length"), ["42"]);
		});

		it("should return all the values for that header (string)", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			RESPONSE.setHeader("Content-Type", "text/plain");
			deepStrictEqual(RESPONSE.getHeaderAll("Content-Type"), ["text/plain"]);
		});

		it("should return all the values for that header (array)", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			RESPONSE.setHeader("Set-Cookie", ["lorem=ipsum", "alpha=omega"]);
			deepStrictEqual(RESPONSE.getHeaderAll("Set-Cookie"), ["lorem=ipsum", "alpha=omega"]);
		});
	});

	describe("getHeader", (): void => {
		it("should return the value for that header (missing)", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			deepStrictEqual(RESPONSE.getHeader("Content-Type"), undefined);
		});

		it("should return the value for that header (number)", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			RESPONSE.setHeader("Content-Length", 42);
			deepStrictEqual(RESPONSE.getHeader("Content-Length"), "42");
		});

		it("should return the value for that header (string)", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			RESPONSE.setHeader("Content-Type", "text/plain");
			deepStrictEqual(RESPONSE.getHeader("Content-Type"), "text/plain");
		});

		it("should return the value for that header (array)", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			RESPONSE.setHeader("Set-Cookie", ["lorem=ipsum", "alpha=omega"]);
			deepStrictEqual(RESPONSE.getHeader("Set-Cookie"), "lorem=ipsum");
		});
	});

	describe("setCookie", (): void => {
		it("should throw if the request is locked", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			ReflectUtility.Set(RESPONSE, "locked", true);

			const WRAPPER = (): void => {
				RESPONSE.setCookie({ name: "lorem", value: "ipsum" });
			};

			throws(WRAPPER, new Error("This response is locked and will no longer accept changes."));
		});

		it("should throw if the cookie has both an 'Expires' and 'Max-Age' attribute", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			const WRAPPER = (): void => {
				RESPONSE.setCookie({ name: "lorem", value: "ipsum", expires: new Date("2099-12-31T12:34:56Z"), maxAge: 42 });
			};

			throws(WRAPPER, new Error("A cookie can't have both an 'Expires' and 'Max-Age' attribute."));
		});

		it("should throw if the cookie has 'Same-Site' to 'None' without being secure", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			const WRAPPER = (): void => {
				RESPONSE.setCookie({ name: "lorem", value: "ipsum", sameSite: CookieSameSiteEnum.NONE, secure: false });
			};

			throws(WRAPPER, new Error("A cookie can't have the 'SameSite' attribute equals to 'None' without the 'Secure' attribute."));
		});

		it("should throw if the cookie has 'Same-Site' to 'None' without being secure (default)", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			const WRAPPER = (): void => {
				RESPONSE.setCookie({ name: "lorem", value: "ipsum", sameSite: CookieSameSiteEnum.NONE });
			};

			throws(WRAPPER, new Error("A cookie can't have the 'SameSite' attribute equals to 'None' without the 'Secure' attribute."));
		});

		it("should set the cookie (default)", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			RESPONSE.setCookie({ name: "lorem", value: "ipsum" });
			deepStrictEqual(RESPONSE["cookies"], new Map([["lorem", { name: "lorem", value: "ipsum" }]]));
		});
	});

	describe("findAcceptedEncoding", (): void => {
		it("should return undefined if there is no header 'Accept-Encoding'", (): void => {
			const MOCKED_REQUEST: MockRequestInterface = mockRequest();
			const RESPONSE: RichServerResponse = new RichServerResponse(MOCKED_REQUEST.instance);

			MOCKED_REQUEST.stubs.getHeader.returns(undefined);

			const RESULT: unknown = RESPONSE["findAcceptedEncoding"]();

			strictEqual(MOCKED_REQUEST.stubs.getHeader.callCount, 1, "Request method 'getHeader' should have been called once");
			deepStrictEqual(MOCKED_REQUEST.stubs.getHeader.firstCall.args, ["Accept-Encoding"]);
			strictEqual(RESULT, undefined);
		});

		it("should return undefined if no encoding from the header 'Accept-Encoding' is proposed", (): void => {
			const MOCKED_REQUEST: MockRequestInterface = mockRequest();
			const RESPONSE: RichServerResponse = new RichServerResponse(MOCKED_REQUEST.instance);

			MOCKED_REQUEST.stubs.getHeader.returns("zstd");

			const RESULT: unknown = RESPONSE["findAcceptedEncoding"]();

			strictEqual(MOCKED_REQUEST.stubs.getHeader.callCount, 1, "Request method 'getHeader' should have been called once");
			deepStrictEqual(MOCKED_REQUEST.stubs.getHeader.firstCall.args, ["Accept-Encoding"]);
			strictEqual(RESULT, undefined);
		});

		it("should return the top accepted encoding (brotli)", (): void => {
			const MOCKED_REQUEST: MockRequestInterface = mockRequest();
			const RESPONSE: RichServerResponse = new RichServerResponse(MOCKED_REQUEST.instance);

			MOCKED_REQUEST.stubs.getHeader.returns("br, gzip;q=0.8, deflate;q=0.5");

			const RESULT: unknown = RESPONSE["findAcceptedEncoding"]();

			strictEqual(MOCKED_REQUEST.stubs.getHeader.callCount, 1, "Request method 'getHeader' should have been called once");
			deepStrictEqual(MOCKED_REQUEST.stubs.getHeader.firstCall.args, ["Accept-Encoding"]);
			strictEqual(RESULT, ContentEncodingEnum.BROTLI);
		});

		it("should return the top accepted encoding (gzip)", (): void => {
			const MOCKED_REQUEST: MockRequestInterface = mockRequest();
			const RESPONSE: RichServerResponse = new RichServerResponse(MOCKED_REQUEST.instance);

			MOCKED_REQUEST.stubs.getHeader.returns("br;q=0.8, gzip, deflate;q=0.5");

			const RESULT: unknown = RESPONSE["findAcceptedEncoding"]();

			strictEqual(MOCKED_REQUEST.stubs.getHeader.callCount, 1, "Request method 'getHeader' should have been called once");
			deepStrictEqual(MOCKED_REQUEST.stubs.getHeader.firstCall.args, ["Accept-Encoding"]);
			strictEqual(RESULT, ContentEncodingEnum.GZIP);
		});

		it("should return the top accepted encoding (deflate)", (): void => {
			const MOCKED_REQUEST: MockRequestInterface = mockRequest();
			const RESPONSE: RichServerResponse = new RichServerResponse(MOCKED_REQUEST.instance);

			MOCKED_REQUEST.stubs.getHeader.returns("br;q=0.8, gzip;q=0.5, deflate");

			const RESULT: unknown = RESPONSE["findAcceptedEncoding"]();

			strictEqual(MOCKED_REQUEST.stubs.getHeader.callCount, 1, "Request method 'getHeader' should have been called once");
			deepStrictEqual(MOCKED_REQUEST.stubs.getHeader.firstCall.args, ["Accept-Encoding"]);
			strictEqual(RESULT, ContentEncodingEnum.DEFLATE);
		});
	});
});
