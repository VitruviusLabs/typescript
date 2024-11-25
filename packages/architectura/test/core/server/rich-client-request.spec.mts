import { describe, it } from "node:test";
import { deepStrictEqual, doesNotReject, rejects, strictEqual, throws } from "node:assert";
import { type ParsedUrlQuery, parse as parseQuery } from "node:querystring";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { type JSONObjectType, ReflectUtility, instanceOf } from "@vitruvius-labs/toolbox";
import { ContentTypeEnum, HTTPMethodEnum, RichClientRequest } from "../../../src/_index.mjs";
import { type MockRequestInterface, mockRequest, mockSocket } from "../../../mock/core/server/_index.mjs";

describe("RichClientRequest", (): void => {
	describe("constructor", (): void => {
		it("should create a new request", async (): Promise<void> => {
			const REQUEST: RichClientRequest = new RichClientRequest(mockSocket().instance);

			strictEqual(REQUEST["pathMatchGroups"], undefined);
			strictEqual(REQUEST["initialized"], false);
			deepStrictEqual(REQUEST["cookies"], new Map());
			strictEqual(REQUEST["path"], undefined);
			deepStrictEqual(REQUEST["pathFragments"], []);
			deepStrictEqual(REQUEST["query"], parseQuery(""));
			strictEqual(REQUEST["contentType"], undefined);
			strictEqual(REQUEST["boundary"], undefined);

			const BODY: unknown = REQUEST["rawBody"];

			instanceOf(BODY, Promise);
			await doesNotReject(BODY);
			deepStrictEqual(await BODY, Buffer.alloc(0));
		});
	});

	describe("listenForContent", (): void => {
		it("should listen for content and resolve as a Buffer", async (): Promise<void> => {
			const REQUEST_MOCK: MockRequestInterface = mockRequest();
			const REQUEST: RichClientRequest = REQUEST_MOCK.instance;

			const RESULT: unknown = REQUEST["listenForContent"]();

			ReflectUtility.Set(REQUEST, "complete", true);
			REQUEST.emit("data", Buffer.from("Hello, "));
			REQUEST.emit("data", Buffer.from("World!"));
			REQUEST.emit("end");

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, Buffer.from("Hello, World!"));
		});

		it("should reject if the connection is terminated", async (): Promise<void> => {
			const REQUEST_MOCK: MockRequestInterface = mockRequest();
			const REQUEST: RichClientRequest = REQUEST_MOCK.instance;

			const RESULT: unknown = REQUEST["listenForContent"]();

			REQUEST.emit("error", new Error("Payload issue"));

			instanceOf(RESULT, Promise);
			await rejects(RESULT, createErrorTest());
		});

		it("should reject if the message is not completely sent", async (): Promise<void> => {
			const REQUEST_MOCK: MockRequestInterface = mockRequest();
			const REQUEST: RichClientRequest = REQUEST_MOCK.instance;

			const RESULT: unknown = REQUEST["listenForContent"]();

			ReflectUtility.Set(REQUEST, "complete", false);
			REQUEST.emit("data", Buffer.from("Hello, "));
			REQUEST.emit("end");

			instanceOf(RESULT, Promise);
			await rejects(RESULT, createErrorTest());
		});
	});

	describe("initialize", (): void => {
		it("should throw if initialized more than once", (): void => {
			const REQUEST: RichClientRequest = mockRequest().instance;

			ReflectUtility.Set(REQUEST, "initialized", true);

			const WRAPPER = (): void => {
				REQUEST.initialize();
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should remove a trailing slash (without query)", (): void => {
			const REQUEST_MOCK: MockRequestInterface = mockRequest();
			const REQUEST: RichClientRequest = REQUEST_MOCK.instance;

			REQUEST_MOCK.stubs.listenForContent.resolves(Buffer.from("Hello, World!"));

			REQUEST.url = "/api/v1/resource/";

			REQUEST.initialize();

			strictEqual(REQUEST["path"], "/api/v1/resource");
		});

		it("should remove a trailing slash (with query)", (): void => {
			const REQUEST_MOCK: MockRequestInterface = mockRequest();
			const REQUEST: RichClientRequest = REQUEST_MOCK.instance;

			REQUEST_MOCK.stubs.listenForContent.resolves(Buffer.from("Hello, World!"));

			REQUEST.url = "/api/v1/resource/?lorem=ipsum";

			REQUEST.initialize();

			strictEqual(REQUEST["path"], "/api/v1/resource");
		});

		it("should initialize the request (with cookies and URL parameters)", async (): Promise<void> => {
			const REQUEST_MOCK: MockRequestInterface = mockRequest();
			const REQUEST: RichClientRequest = REQUEST_MOCK.instance;
			const PARAMETERS: string = "lorem=ipsum&alpha=omega&id=1&id=2";

			REQUEST_MOCK.stubs.listenForContent.resolves(Buffer.from("Hello, World!"));

			REQUEST.url = `/api/v1/resource?${PARAMETERS}`;
			REQUEST.headers.cookie = "alpha=1; beta=2; delta=3";
			REQUEST.headersDistinct["cookie"] = ["alpha=1; beta=2", "delta=3"];

			REQUEST.initialize();

			strictEqual(REQUEST["pathMatchGroups"], undefined);
			strictEqual(REQUEST["initialized"], true);
			strictEqual(REQUEST["contentType"], undefined);
			strictEqual(REQUEST["boundary"], undefined);
			deepStrictEqual(REQUEST["cookies"], new Map([["alpha", "1"], ["beta", "2"], ["delta", "3"]]));
			strictEqual(REQUEST["path"], "/api/v1/resource");
			deepStrictEqual(REQUEST["pathFragments"], ["api", "v1", "resource"]);
			deepStrictEqual(REQUEST["query"], parseQuery(PARAMETERS));
			strictEqual(REQUEST_MOCK.stubs.listenForContent.callCount, 1, "'listenForContent' should be called exactly once");

			const BODY: unknown = REQUEST["rawBody"];

			instanceOf(BODY, Promise);
			await doesNotReject(BODY);
			deepStrictEqual(await BODY, Buffer.from("Hello, World!"));
		});

		it("should initialize the request (application/json)", async (): Promise<void> => {
			const REQUEST_MOCK: MockRequestInterface = mockRequest();
			const REQUEST: RichClientRequest = REQUEST_MOCK.instance;

			const JSON_BODY: string = JSON.stringify({ lorem: "ipsum" });

			REQUEST_MOCK.stubs.listenForContent.resolves(Buffer.from(JSON_BODY));

			REQUEST.url = "/api/v2/resource";
			REQUEST.headers["content-type"] = "application/json";
			REQUEST.headersDistinct["content-type"] = ["application/json"];

			REQUEST.initialize();

			strictEqual(REQUEST["pathMatchGroups"], undefined);
			strictEqual(REQUEST["initialized"], true);
			strictEqual(REQUEST["contentType"], "application/json");
			strictEqual(REQUEST["boundary"], undefined);
			deepStrictEqual(REQUEST["cookies"], new Map());
			strictEqual(REQUEST["path"], "/api/v2/resource");
			deepStrictEqual(REQUEST["pathFragments"], ["api", "v2", "resource"]);
			deepStrictEqual(REQUEST["query"], parseQuery(""));
			strictEqual(REQUEST_MOCK.stubs.listenForContent.callCount, 1, "'listenForContent' should be called exactly once");

			const BODY: unknown = REQUEST["rawBody"];

			instanceOf(BODY, Promise);
			await doesNotReject(BODY);
			deepStrictEqual(await BODY, Buffer.from(JSON_BODY));
		});

		it("should initialize the request (multipart/form-data)", async (): Promise<void> => {
			const REQUEST_MOCK: MockRequestInterface = mockRequest();
			const REQUEST: RichClientRequest = REQUEST_MOCK.instance;

			REQUEST_MOCK.stubs.listenForContent.resolves(Buffer.from("Hello, World"));

			REQUEST.url = "/api/v3/resource";
			REQUEST.headers["content-type"] = "multipart/form-data; boundary=-----123456789";
			REQUEST.headersDistinct["content-type"] = ["multipart/form-data; boundary=-----123456789"];

			REQUEST.initialize();

			strictEqual(REQUEST["pathMatchGroups"], undefined);
			strictEqual(REQUEST["initialized"], true);
			strictEqual(REQUEST["contentType"], "multipart/form-data");
			strictEqual(REQUEST["boundary"], "-------123456789");
			deepStrictEqual(REQUEST["cookies"], new Map());
			strictEqual(REQUEST["path"], "/api/v3/resource");
			deepStrictEqual(REQUEST["pathFragments"], ["api", "v3", "resource"]);
			deepStrictEqual(REQUEST["query"], parseQuery(""));
			strictEqual(REQUEST_MOCK.stubs.listenForContent.callCount, 1, "'listenForContent' should be called exactly once");

			const BODY: unknown = REQUEST["rawBody"];

			instanceOf(BODY, Promise);
			await doesNotReject(BODY);
			deepStrictEqual(await BODY, Buffer.from("Hello, World"));
		});

		it("should throw if receiving an invalid 'multipart/form-data' header", (): void => {
			const REQUEST: RichClientRequest = mockRequest().instance;

			REQUEST.headers["content-type"] = "multipart/form-data; boundary=";
			REQUEST.headersDistinct["content-type"] = ["multipart/form-data; boundary="];

			const WRAPPER = (): void => {
				REQUEST.initialize();
			};

			throws(WRAPPER, createErrorTest());
		});
	});

	describe("method", (): void => {
		describe("getUnsafeMethod", (): void => {
			it("should return the method, whatever it is", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;
				const VALUES: Array<string | undefined> = [undefined, "", HTTPMethodEnum.GET, HTTPMethodEnum.POST, "SEARCH", "QUERY"];

				for (const VALUE of VALUES)
				{
					ReflectUtility.Set(REQUEST, "method", VALUE);

					strictEqual(REQUEST.getUnsafeMethod(), VALUE);
				}
			});
		});

		describe("hasStandardMethod", (): void => {
			it("should return false if the method is missing or non-standard", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;
				const VALUES: Array<string | undefined> = [undefined, "", "SEARCH", "QUERY", "OPTION"];

				for (const VALUE of VALUES)
				{
					ReflectUtility.Set(REQUEST, "method", VALUE);

					strictEqual(REQUEST.hasStandardMethod(), false);
				}
			});

			it("should return true if the method is standard", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;
				const VALUES: Array<HTTPMethodEnum> = [
					HTTPMethodEnum.GET,
					HTTPMethodEnum.HEAD,
					HTTPMethodEnum.POST,
					HTTPMethodEnum.PUT,
					HTTPMethodEnum.DELETE,
					HTTPMethodEnum.CONNECT,
					HTTPMethodEnum.OPTIONS,
					HTTPMethodEnum.TRACE,
					HTTPMethodEnum.PATCH,
				];

				for (const VALUE of VALUES)
				{
					ReflectUtility.Set(REQUEST, "method", VALUE);

					strictEqual(REQUEST.hasStandardMethod(), true);
				}
			});
		});

		describe("getMethod", (): void => {
			it("should throw if the method is missing or non-standard", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;
				const VALUES: Array<string | undefined> = [undefined, "", "SEARCH", "QUERY", "OPTION"];

				for (const VALUE of VALUES)
				{
					ReflectUtility.Set(REQUEST, "method", VALUE);

					const WRAPPER = (): void => {
						REQUEST.getMethod();
					};

					throws(WRAPPER, createErrorTest());
				}
			});

			it("should return true if the method is standard", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;
				const VALUES: Array<HTTPMethodEnum> = [
					HTTPMethodEnum.GET,
					HTTPMethodEnum.HEAD,
					HTTPMethodEnum.POST,
					HTTPMethodEnum.PUT,
					HTTPMethodEnum.DELETE,
					HTTPMethodEnum.CONNECT,
					HTTPMethodEnum.OPTIONS,
					HTTPMethodEnum.TRACE,
					HTTPMethodEnum.PATCH,
				];

				for (const VALUE of VALUES)
				{
					ReflectUtility.Set(REQUEST, "method", VALUE);

					strictEqual(REQUEST.getMethod(), VALUE);
				}
			});
		});
	});

	describe("URL", (): void => {
		describe("getUnsafeURL", (): void => {
			it("should return the URL, whatever it is", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;
				const VALUES: Array<string | undefined> = [undefined, "", "/", "/api/v1/resource", "/api/v2/resource?lorem=ipsum&alpha=omega"];

				for (const VALUE of VALUES)
				{
					REQUEST.url = VALUE;

					strictEqual(REQUEST.getUnsafeURL(), VALUE);
				}
			});
		});

		describe("hasURL", (): void => {
			it("should return false if the URL is missing", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				REQUEST.url = undefined;

				strictEqual(REQUEST.hasURL(), false);
			});

			it("should return true if the URL exists", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;
				const VALUES: Array<string> = ["", "/", "/api/v1/resource", "/api/v2/resource?lorem=ipsum&alpha=omega"];

				for (const VALUE of VALUES)
				{
					REQUEST.url = VALUE;

					strictEqual(REQUEST.hasURL(), true);
				}
			});
		});

		describe("getURL", (): void => {
			it("should return false if the URL is missing", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				REQUEST.url = undefined;

				const WRAPPER = (): void => {
					REQUEST.getURL();
				};

				throws(WRAPPER, createErrorTest());
			});

			it("should return true if the URL exists", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;
				const VALUES: Array<string> = ["", "/", "/api/v1/resource", "/api/v2/resource?lorem=ipsum&alpha=omega"];

				for (const VALUE of VALUES)
				{
					REQUEST.url = VALUE;

					strictEqual(REQUEST.getURL(), VALUE);
				}
			});
		});
	});

	describe("path", (): void => {
		describe("getUnsafePath", (): void => {
			it("should return the path, whatever it is", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;
				const VALUES: Array<string | undefined> = [undefined, "", "/", "/api/v1/resource", "/api/v2/resource"];

				for (const VALUE of VALUES)
				{
					ReflectUtility.Set(REQUEST, "path", VALUE);

					strictEqual(REQUEST.getUnsafePath(), VALUE);
				}
			});
		});

		describe("hasPath", (): void => {
			it("should return false if the path is missing", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				ReflectUtility.Set(REQUEST, "path", undefined);

				strictEqual(REQUEST.hasPath(), false);
			});

			it("should return true if the path exists", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;
				const VALUES: Array<string> = ["", "/", "/api/v1/resource", "/api/v2/resource"];

				for (const VALUE of VALUES)
				{
					ReflectUtility.Set(REQUEST, "path", VALUE);

					strictEqual(REQUEST.hasPath(), true);
				}
			});
		});

		describe("getPath", (): void => {
			it("should return false if the path is missing", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				ReflectUtility.Set(REQUEST, "path", undefined);

				const WRAPPER = (): void => {
					REQUEST.getPath();
				};

				throws(WRAPPER, createErrorTest());
			});

			it("should return true if the path exists", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;
				const VALUES: Array<string> = ["", "/", "/api/v1/resource", "/api/v2/resource"];

				for (const VALUE of VALUES)
				{
					ReflectUtility.Set(REQUEST, "path", VALUE);

					strictEqual(REQUEST.getPath(), VALUE);
				}
			});
		});
	});

	describe("getPathFragments", (): void => {
		it("should return the paths fragments", (): void => {
			const REQUEST: RichClientRequest = mockRequest().instance;

			const FRAGMENTS: Array<string> = ["api", "v1", "resource"];

			ReflectUtility.Set(REQUEST, "pathFragments", FRAGMENTS);

			deepStrictEqual(REQUEST.getPathFragments(), FRAGMENTS);
		});
	});

	describe("getPathMatchGroups", (): void => {
		it("should return the path match groups (default)", (): void => {
			const REQUEST: RichClientRequest = mockRequest().instance;

			deepStrictEqual(REQUEST.getPathMatchGroups(), {});
		});

		it("should return the path match groups", (): void => {
			const REQUEST: RichClientRequest = mockRequest().instance;

			const PATH_MATCH_GROUPS: NodeJS.Dict<string> = { lorem: "ipsum" };

			ReflectUtility.Set(REQUEST, "pathMatchGroups", PATH_MATCH_GROUPS);

			deepStrictEqual(REQUEST.getPathMatchGroups(), PATH_MATCH_GROUPS);
		});
	});

	describe("query", (): void => {
		describe("getQuery", (): void => {
			it("return the query", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				const PARSED_URL_QUERY: ParsedUrlQuery = parseQuery("lorem=ipsum&alpha=omega&id=1&id=2");

				ReflectUtility.Set(REQUEST, "query", PARSED_URL_QUERY);

				deepStrictEqual(REQUEST.getQuery(), PARSED_URL_QUERY);
			});
		});

		describe("hasQueryItem", (): void => {
			it("should return false if there is no value associated with that query parameter name", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				ReflectUtility.Set(REQUEST, "query", parseQuery("lorem=ipsum&alpha=omega&id=1&id=2"));

				strictEqual(REQUEST.hasQueryItem("ipsum"), false);
				strictEqual(REQUEST.hasQueryItem("omega"), false);
			});

			it("should return true if there is one ore more values associated with that query parameter name", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				ReflectUtility.Set(REQUEST, "query", parseQuery("lorem=ipsum&alpha=omega&id=1&id=2"));

				strictEqual(REQUEST.hasQueryItem("lorem"), true);
				strictEqual(REQUEST.hasQueryItem("alpha"), true);
				strictEqual(REQUEST.hasQueryItem("id"), true);
			});
		});

		describe("getQueryItemAll", (): void => {
			it("should return an empty array if there is no value associated with that query parameter name", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				ReflectUtility.Set(REQUEST, "query", parseQuery("lorem=ipsum&alpha=omega&id=1&id=2"));

				deepStrictEqual(REQUEST.getQueryItemAll("ipsum"), []);
				deepStrictEqual(REQUEST.getQueryItemAll("omega"), []);
			});

			it("should return the array of values associated with that query parameter name", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				ReflectUtility.Set(REQUEST, "query", parseQuery("lorem=ipsum&alpha=omega&id=1&id=2"));

				deepStrictEqual(REQUEST.getQueryItemAll("lorem"), ["ipsum"]);
				deepStrictEqual(REQUEST.getQueryItemAll("alpha"), ["omega"]);
				deepStrictEqual(REQUEST.getQueryItemAll("id"), ["1", "2"]);
			});
		});

		describe("getQueryItem", (): void => {
			it("should return undefined if there is no value associated with that query parameter name", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				ReflectUtility.Set(REQUEST, "query", parseQuery("lorem=ipsum&alpha=omega&id=1&id=2"));

				strictEqual(REQUEST.getQueryItem("ipsum"), undefined);
				strictEqual(REQUEST.getQueryItem("omega"), undefined);
			});

			it("should return the first value associated with that query parameter name", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				ReflectUtility.Set(REQUEST, "query", parseQuery("lorem=ipsum&alpha=omega&id=1&id=2"));

				strictEqual(REQUEST.getQueryItem("lorem"), "ipsum");
				strictEqual(REQUEST.getQueryItem("alpha"), "omega");
				strictEqual(REQUEST.getQueryItem("id"), "1");
			});
		});
	});

	describe("headers", (): void => {
		describe("getRawHeaders", (): void => {
			it("should return the unprocessed headers", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				const RAW_HEADERS: NodeJS.Dict<Array<string>> = {
					"content-type": ["application/json"],
					"cookie": ["alpha=1; beta=2", "delta=3"],
				};

				REQUEST.headersDistinct["cookie"] = ["alpha=1; beta=2", "delta=3"];
				REQUEST.headersDistinct["content-type"] = ["application/json"];

				deepStrictEqual(REQUEST.getRawHeaders(), RAW_HEADERS);
			});
		});

		describe("getHeaders", (): void => {
			it("should return the processed headers", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				const PROCESSED_HEADERS: NodeJS.Dict<string> = {
					"content-type": "application/json",
					"cookie": "alpha=1; beta=2; delta=3",
				};

				REQUEST.headers.cookie = "alpha=1; beta=2; delta=3";
				REQUEST.headers["content-type"] = "application/json";

				deepStrictEqual(REQUEST.getHeaders(), PROCESSED_HEADERS);
			});
		});

		describe("hasHeader", (): void => {
			it("should return false if the header was not received", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				strictEqual(REQUEST.hasHeader("Content-Disposition"), false);
				strictEqual(REQUEST.hasHeader("Content-Length"), false);
				strictEqual(REQUEST.hasHeader("Content-Encoding"), false);
			});

			it("should return true if the header was not received", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				REQUEST.headers.cookie = "alpha=1; beta=2; delta=3";
				REQUEST.headers["content-type"] = "application/json";
				REQUEST.headersDistinct["cookie"] = ["alpha=1; beta=2", "delta=3"];
				REQUEST.headersDistinct["content-type"] = ["application/json"];

				strictEqual(REQUEST.hasHeader("Cookie"), true);
				strictEqual(REQUEST.hasHeader("Content-Type"), true);
			});
		});

		describe("getRawHeader", (): void => {
			it("should return an empty array if no header with that name was received", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				deepStrictEqual(REQUEST.getRawHeader("Content-Disposition"), []);
				deepStrictEqual(REQUEST.getRawHeader("Content-Length"), []);
				deepStrictEqual(REQUEST.getRawHeader("Content-Encoding"), []);
			});

			it("should return an array of all the headers received with that name", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				REQUEST.headersDistinct["cookie"] = ["alpha=1; beta=2", "delta=3"];
				REQUEST.headersDistinct["content-type"] = ["application/json"];

				deepStrictEqual(REQUEST.getRawHeader("Cookie"), ["alpha=1; beta=2", "delta=3"]);
				deepStrictEqual(REQUEST.getRawHeader("Content-Type"), ["application/json"]);
			});
		});

		describe("getHeader", (): void => {
			it("should return undefined if no header with that name was received", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				deepStrictEqual(REQUEST.getHeader("Content-Disposition"), undefined);
				deepStrictEqual(REQUEST.getHeader("Content-Length"), undefined);
				deepStrictEqual(REQUEST.getHeader("Content-Encoding"), undefined);
			});

			it("should return an empty array when no header with the name 'Set-Cookie' was received", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				deepStrictEqual(REQUEST.getHeader("Set-Cookie"), []);
			});

			it("should return the processed header with that name", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				REQUEST.headers.cookie = "alpha=1; beta=2; delta=3";
				REQUEST.headers["content-type"] = "application/json";
				REQUEST.headers["set-cookie"] = ["hello", "world"];

				deepStrictEqual(REQUEST.getHeader("Cookie"), "alpha=1; beta=2; delta=3");
				deepStrictEqual(REQUEST.getHeader("Content-Type"), "application/json");
				deepStrictEqual(REQUEST.getHeader("Set-Cookie"), ["hello", "world"]);
			});
		});
	});

	describe("cookies", (): void => {
		describe("getCookies", (): void => {
			it("should return the cookies mapping", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				const MAPPING: Map<string, string> = new Map([["alpha", "1"], ["beta", "2"], ["delta", "3"]]);

				ReflectUtility.Set(REQUEST, "cookies", MAPPING);

				strictEqual(REQUEST.getCookies(), MAPPING);
			});
		});

		describe("hasCookie", (): void => {
			it("should return false if there is no cookie with that name", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				ReflectUtility.Set(REQUEST, "cookies", new Map([["alpha", "1"], ["beta", "2"], ["delta", "3"]]));

				strictEqual(REQUEST.hasCookie("1"), false);
				strictEqual(REQUEST.hasCookie("2"), false);
				strictEqual(REQUEST.hasCookie("3"), false);
			});

			it("should return true if there is a cookie with that name", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				ReflectUtility.Set(REQUEST, "cookies", new Map([["alpha", "1"], ["beta", "2"], ["delta", "3"]]));

				strictEqual(REQUEST.hasCookie("alpha"), true);
				strictEqual(REQUEST.hasCookie("beta"), true);
				strictEqual(REQUEST.hasCookie("delta"), true);
			});
		});

		describe("getCookie", (): void => {
			it("should return undefined if there is no cookie with that name", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				ReflectUtility.Set(REQUEST, "cookies", new Map([["alpha", "1"], ["beta", "2"], ["delta", "3"]]));

				strictEqual(REQUEST.getCookie("1"), undefined);
				strictEqual(REQUEST.getCookie("2"), undefined);
				strictEqual(REQUEST.getCookie("3"), undefined);
			});

			it("should return true if there is a cookie with that name", (): void => {
				const REQUEST: RichClientRequest = mockRequest().instance;

				ReflectUtility.Set(REQUEST, "cookies", new Map([["alpha", "1"], ["beta", "2"], ["delta", "3"]]));

				strictEqual(REQUEST.getCookie("alpha"), "1");
				strictEqual(REQUEST.getCookie("beta"), "2");
				strictEqual(REQUEST.getCookie("delta"), "3");
			});
		});
	});

	describe("getBoundary", (): void => {
		it("should return the boundary", (): void => {
			const REQUEST: RichClientRequest = mockRequest().instance;

			const BOUNDARY: string = "-------123456789";

			ReflectUtility.Set(REQUEST, "boundary", BOUNDARY);

			strictEqual(REQUEST.getBoundary(), BOUNDARY);
		});
	});

	describe("getContentType", (): void => {
		it("should return the content type", (): void => {
			const REQUEST: RichClientRequest = mockRequest().instance;

			ReflectUtility.Set(REQUEST, "contentType", ContentTypeEnum.JSON);

			strictEqual(REQUEST.getContentType(), ContentTypeEnum.JSON);
		});
	});

	describe("getRawBody", (): void => {
		it("should resolve with a Buffer", async (): Promise<void> => {
			const REQUEST: RichClientRequest = mockRequest().instance;

			ReflectUtility.Set(REQUEST, "rawBody", Promise.resolve(Buffer.from("Hello, World!")));

			const RESULT: unknown = REQUEST.getRawBody();

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, Buffer.from("Hello, World!"));
		});
	});

	describe("getBodyAsString", (): void => {
		it("should resolve with a string", async (): Promise<void> => {
			const REQUEST: RichClientRequest = mockRequest().instance;

			ReflectUtility.Set(REQUEST, "rawBody", Promise.resolve(Buffer.from("Hello, World!")));

			const RESULT: unknown = REQUEST.getBodyAsString();

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, "Hello, World!");
		});

		it("should resolve with a string, even if there is no body", async (): Promise<void> => {
			const REQUEST: RichClientRequest = mockRequest().instance;

			ReflectUtility.Set(REQUEST, "rawBody", Promise.resolve(Buffer.alloc(0)));

			const RESULT: unknown = REQUEST.getBodyAsString();

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, "");
		});
	});

	describe("getBodyAsJSON", (): void => {
		it("should resolve with parsed JSON", async (): Promise<void> => {
			const REQUEST: RichClientRequest = mockRequest().instance;

			const DATA: JSONObjectType = {
				lorem: "ipsum",
				alpha: "omega",
				id: [1, 2],
			};

			ReflectUtility.Set(REQUEST, "rawBody", Promise.resolve(Buffer.from(JSON.stringify(DATA))));

			const RESULT: unknown = REQUEST.getBodyAsJSON();

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, DATA);
		});

		it("should reject if the body cannot be parsed as JSON", async (): Promise<void> => {
			const REQUEST: RichClientRequest = mockRequest().instance;

			ReflectUtility.Set(REQUEST, "rawBody", Promise.resolve(Buffer.from("Hello, World!")));

			await rejects(REQUEST.getBodyAsJSON());
		});

		it("should reject if the parsed JSON is not an object", async (): Promise<void> => {
			const REQUEST: RichClientRequest = mockRequest().instance;

			ReflectUtility.Set(REQUEST, "rawBody", Promise.resolve(Buffer.from("42")));

			await rejects(REQUEST.getBodyAsJSON());
		});
	});

	describe("getBodyAsMultipart", (): void => {
		it.todo("should return the body as a multipart record");
	});
});
