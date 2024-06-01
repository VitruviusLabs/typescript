import type { OutgoingHttpHeaders } from "node:http";
import { describe, it } from "node:test";
import { deepStrictEqual, rejects, strictEqual } from "node:assert";
import { createBrotliCompress, createDeflate, createGzip } from "node:zlib";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { getConstructorOf } from "@vitruvius-labs/ts-predicate/helper";
import { ReflectUtility, instanceOf, jsonSerialize } from "@vitruvius-labs/toolbox";
import { ContentEncodingEnum, ContentTypeEnum, type CookieDescriptorInterface, CookieSameSiteEnum, HTTPStatusCodeEnum, type ReplyInterface, RichServerResponse } from "../../../src/_index.mjs";
import { type MockResponseInterface, mockRequest, mockResponse, nullPrototype } from "../../../mock/_index.mjs";

describe("RichServerResponse", (): void => {
	describe("constructor", (): void => {
		it("should create a new response", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest().instance);

			strictEqual(ReflectUtility.Get(RESPONSE, "locked"), false);
			strictEqual(ReflectUtility.Get(RESPONSE, "processed"), false);
			strictEqual(ReflectUtility.Get(RESPONSE, "content"), undefined);
			deepStrictEqual(ReflectUtility.Get(RESPONSE, "cookies"), new Map());
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

			strictEqual(ReflectUtility.Get(RESPONSE, "locked"), true);
			strictEqual(ReflectUtility.Get(RESPONSE, "processed"), true);
		});

		it("should set the 'processed' flag when done, even if an error is thrown", async (): Promise<void> => {
			const RESPONSE_MOCK: MockResponseInterface = mockResponse();
			const RESPONSE: RichServerResponse = RESPONSE_MOCK.instance;

			RESPONSE_MOCK.stubs.end.throws(new Error("For testing purposes"));

			await rejects(RESPONSE.replyWith(HTTPStatusCodeEnum.CREATED), createErrorTest());

			strictEqual(ReflectUtility.Get(RESPONSE, "processed"), true);
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
				["lorem", { name: "lorem", value: "ipsum", secure: true }],
				["alpha", { name: "alpha", value: "omega", sameSite: CookieSameSiteEnum.STRICT }],
				["hello", { name: "hello", value: "world", expires: new Date("2099-12-31T12:34:56Z") }],
			]);

			const HEADERS: OutgoingHttpHeaders = nullPrototype({
				"set-cookie": [
					"lorem=ipsum; HttpOnly; Secure",
					"alpha=omega; HttpOnly; SameSite=Strict",
					"hello=world; HttpOnly; Expires=Thu, 31 Dec 2099 12:34:56 GMT",
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
			strictEqual(ReflectUtility.Get(RESPONSE, "content"), "Hello, World!");
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
			deepStrictEqual(ReflectUtility.Get(RESPONSE, "content"), Buffer.from("Hello, World!"));
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
			strictEqual(ReflectUtility.Get(RESPONSE, "content"), SERIALIZED_DATA);
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
			strictEqual(ReflectUtility.Get(RESPONSE, "content"), PARAMETER.payload);
		});
	});
});
