import type { OutgoingHttpHeaders } from "node:http";
import { describe, it } from "node:test";
import { deepStrictEqual, rejects, strictEqual } from "node:assert";
import { createBrotliCompress, createDeflate, createGzip } from "node:zlib";
import { type SinonStub, stub } from "sinon";
import { getConstructorOf } from "@vitruvius-labs/ts-predicate/helper";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { jsonSerialize } from "@vitruvius-labs/toolbox";
import { ContentEncodingEnum, ContentTypeEnum, type CookieDescriptorInterface, CookieSameSiteEnum, HTTPStatusCodeEnum, type ReplyInterface, RichServerResponse } from "../../../src/_index.mjs";
import { mockRequest } from "../../utils/mock/mock-request.mjs";
import { mockResponse } from "../../utils/mock/mock-response.mjs";
import { instanceOf } from "../../utils/assert/instance-of.mjs";
import { nullPrototype } from "../../utils/mock/null-prototype.mjs";

describe("RichServerResponse", (): void => {
	describe("constructor", (): void => {
		it("should create a new response", (): void => {
			const RESPONSE: RichServerResponse = new RichServerResponse(mockRequest());

			strictEqual(Reflect.get(RESPONSE, "locked"), false);
			strictEqual(Reflect.get(RESPONSE, "processed"), false);
			strictEqual(Reflect.get(RESPONSE, "content"), undefined);
			deepStrictEqual(Reflect.get(RESPONSE, "cookies"), new Map());
		});
	});

	describe("GetEncoder", (): void => {
		it("should return the corresponding zlib encoder", (): void => {
			const GZIP: unknown = Reflect.get(RichServerResponse, "GetEncoder").call(RichServerResponse, ContentEncodingEnum.GZIP);
			const BROTLI: unknown = Reflect.get(RichServerResponse, "GetEncoder").call(RichServerResponse, ContentEncodingEnum.BROTLI);
			const DEFLATE: unknown = Reflect.get(RichServerResponse, "GetEncoder").call(RichServerResponse, ContentEncodingEnum.DEFLATE);

			/* Zlib do not expose the classes, so we retrieve them indirectly. */
			/* Internal buffers prevent using deepStrictEqual on the created instances. */
			instanceOf(GZIP, getConstructorOf(createGzip()));
			instanceOf(BROTLI, getConstructorOf(createBrotliCompress()));
			instanceOf(DEFLATE, getConstructorOf(createDeflate()));
		});
	});

	describe("json", (): void => {
		it("should reply with the given JSON (object)", async (): Promise<void> => {
			const RESPONSE: RichServerResponse = mockResponse();
			const STUB: SinonStub = stub(RESPONSE, "replyWith");

			STUB.resolves();

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

			strictEqual(STUB.calledOnce, true, "'replyWith' should be called exactly once");
			deepStrictEqual(STUB.firstCall.args, [PARAMETER]);
		});

		it("should reply with the given JSON (serialized)", async (): Promise<void> => {
			const RESPONSE: RichServerResponse = mockResponse();
			const STUB: SinonStub = stub(RESPONSE, "replyWith");

			STUB.resolves();

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

			strictEqual(STUB.calledOnce, true, "'replyWith' should be called exactly once");
			deepStrictEqual(STUB.firstCall.args, [PARAMETER]);
		});
	});

	describe("text", (): void => {
		it("should reply with the given message (string)", async (): Promise<void> => {
			const RESPONSE: RichServerResponse = mockResponse();
			const STUB: SinonStub = stub(RESPONSE, "replyWith");

			STUB.resolves();

			const PARAMETER: ReplyInterface = {
				status: HTTPStatusCodeEnum.OK,
				contentType: ContentTypeEnum.TEXT,
				payload: "Hello, World!",
			};

			await RESPONSE.text("Hello, World!");

			strictEqual(STUB.calledOnce, true, "'replyWith' should be called exactly once");
			deepStrictEqual(STUB.firstCall.args, [PARAMETER]);
		});

		it("should reply with the given message (Buffer)", async (): Promise<void> => {
			const RESPONSE: RichServerResponse = mockResponse();
			const STUB: SinonStub = stub(RESPONSE, "replyWith");

			STUB.resolves();

			const PARAMETER: ReplyInterface = {
				status: HTTPStatusCodeEnum.OK,
				contentType: ContentTypeEnum.TEXT,
				payload: Buffer.from("Hello, World!"),
			};

			await RESPONSE.text(Buffer.from("Hello, World!"));

			strictEqual(STUB.calledOnce, true, "'replyWith' should be called exactly once");
			deepStrictEqual(STUB.firstCall.args, [PARAMETER]);
		});
	});

	describe("replyWith", (): void => {
		it("should rejects if the response is locked", async (): Promise<void> => {
			const RESPONSE: RichServerResponse = mockResponse();

			Reflect.set(RESPONSE, "locked", true);

			await rejects(RESPONSE.replyWith(HTTPStatusCodeEnum.OK));
		});

		it("should set the 'locked' flag when called, and the 'processed' flag when done", async (): Promise<void> => {
			const RESPONSE: RichServerResponse = mockResponse();

			await RESPONSE.replyWith(HTTPStatusCodeEnum.CREATED);

			strictEqual(Reflect.get(RESPONSE, "locked"), true);
			strictEqual(Reflect.get(RESPONSE, "processed"), true);
		});

		it("should set the 'processed' flag when done, even if an error is thrown", async (): Promise<void> => {
			const RESPONSE: RichServerResponse = mockResponse();

			stub(RESPONSE, "end").throws(new Error("For testing purposes"));

			await rejects(RESPONSE.replyWith(HTTPStatusCodeEnum.CREATED), createErrorTest());

			strictEqual(Reflect.get(RESPONSE, "processed"), true);
		});

		it("should accept a status code and send the response", async (): Promise<void> => {
			const RESPONSE: RichServerResponse = mockResponse();
			const WRITE_STUB: SinonStub = stub(RESPONSE, "write");
			const END_STUB: SinonStub = stub(RESPONSE, "end");

			WRITE_STUB.returns(true);
			END_STUB.returns(RESPONSE);

			await RESPONSE.replyWith(HTTPStatusCodeEnum.CREATED);

			strictEqual(WRITE_STUB.callCount, 0, "'write' should not be called");
			strictEqual(END_STUB.calledOnce, true, "'end' should be called exactly once");

			strictEqual(RESPONSE.statusCode, HTTPStatusCodeEnum.CREATED);
			deepStrictEqual(RESPONSE.getHeaders(), nullPrototype({}));
		});

		it("should add 'Set-Cookie' headers if needed", async (): Promise<void> => {
			const RESPONSE: RichServerResponse = mockResponse();

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

			Reflect.set(RESPONSE, "cookies", COOKIES);

			await RESPONSE.replyWith(HTTPStatusCodeEnum.OK);

			deepStrictEqual(RESPONSE.getHeaders(), HEADERS);
		});

		it("should process the 'statusCode' property of the parameter", async (): Promise<void> => {
			const RESPONSE: RichServerResponse = mockResponse();

			const PARAMETER: ReplyInterface = {
				status: HTTPStatusCodeEnum.UNAUTHORIZED,
			};

			await RESPONSE.replyWith(PARAMETER);

			strictEqual(RESPONSE.statusCode, HTTPStatusCodeEnum.UNAUTHORIZED);
		});

		it("should process the 'headers' property of the parameter", async (): Promise<void> => {
			const RESPONSE: RichServerResponse = mockResponse();

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
			const RESPONSE: RichServerResponse = mockResponse();

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
			const RESPONSE: RichServerResponse = mockResponse();
			const WRITE_STUB: SinonStub = stub(RESPONSE, "write");
			const END_STUB: SinonStub = stub(RESPONSE, "end");

			WRITE_STUB.returns(true);
			END_STUB.returns(RESPONSE);

			const PARAMETER: ReplyInterface = {
				payload: "Hello, World!",
			};

			await RESPONSE.replyWith(PARAMETER);

			strictEqual(WRITE_STUB.calledOnce, true, "'write' should be called exactly once");
			deepStrictEqual(WRITE_STUB.firstCall.args, ["Hello, World!"]);
			strictEqual(END_STUB.calledOnce, true, "'end' should be called exactly once");

			strictEqual(RESPONSE.getHeader("Content-Type"), ContentTypeEnum.TEXT);
			strictEqual(Reflect.get(RESPONSE, "content"), "Hello, World!");
		});

		it("should process the 'payload' property of the parameter (Buffer)", async (): Promise<void> => {
			const RESPONSE: RichServerResponse = mockResponse();
			const WRITE_STUB: SinonStub = stub(RESPONSE, "write");
			const END_STUB: SinonStub = stub(RESPONSE, "end");

			WRITE_STUB.returns(true);
			END_STUB.returns(RESPONSE);

			const PARAMETER: ReplyInterface = {
				payload: Buffer.from("Hello, World!"),
			};

			await RESPONSE.replyWith(PARAMETER);

			strictEqual(WRITE_STUB.calledOnce, true, "'write' should be called exactly once");
			deepStrictEqual(WRITE_STUB.firstCall.args, [Buffer.from("Hello, World!")]);
			strictEqual(END_STUB.calledOnce, true, "'end' should be called exactly once");

			strictEqual(RESPONSE.getHeader("Content-Type"), ContentTypeEnum.BINARY);
			deepStrictEqual(Reflect.get(RESPONSE, "content"), Buffer.from("Hello, World!"));
		});

		it("should process the 'payload' property of the parameter (JSON)", async (): Promise<void> => {
			const RESPONSE: RichServerResponse = mockResponse();
			const WRITE_STUB: SinonStub = stub(RESPONSE, "write");
			const END_STUB: SinonStub = stub(RESPONSE, "end");

			WRITE_STUB.returns(true);
			END_STUB.returns(RESPONSE);

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

			strictEqual(WRITE_STUB.calledOnce, true, "'write' should be called exactly once");
			deepStrictEqual(WRITE_STUB.firstCall.args, [SERIALIZED_DATA]);
			strictEqual(END_STUB.calledOnce, true, "'end' should be called exactly once");

			strictEqual(RESPONSE.getHeader("Content-Type"), ContentTypeEnum.JSON);
			strictEqual(Reflect.get(RESPONSE, "content"), SERIALIZED_DATA);
		});

		it("should ignore the 'contentType' property of the parameter when without a 'payload' property", async (): Promise<void> => {
			const RESPONSE: RichServerResponse = mockResponse();

			const PARAMETER: ReplyInterface = {
				contentType: ContentTypeEnum.JSON,
			};

			await RESPONSE.replyWith(PARAMETER);

			strictEqual(RESPONSE.getHeader("Content-Type"), undefined);
		});

		it("should process the 'contentType' property of the parameter", async (): Promise<void> => {
			const RESPONSE: RichServerResponse = mockResponse();

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
			strictEqual(Reflect.get(RESPONSE, "content"), PARAMETER.payload);
		});
	});
});
