import { deepStrictEqual, doesNotReject, doesNotThrow, rejects, strictEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { type SinonStub, stub } from "sinon";
import { ReflectUtility } from "@vitruvius-labs/toolbox";
import { type ConstructorOf, ValidationError } from "@vitruvius-labs/ts-predicate";
import { BaseEndpoint, BaseErrorHook, BasePostHook, BasePreHook, HTTPError, HTTPMethodEnum, HTTPStatusCodeEnum } from "../../../src/_index.mjs";
import { type MockContextInterface, mockContext } from "../../../mock/_index.mjs";
import { AccessControlDefinition } from "../../../src/core/endpoint/access-control-definition.mjs";
import { normalizeErrorTree, toError } from "@vitruvius-labs/ts-predicate/helper";

describe("BaseEndpoint", (): void => {
	describe("getAccessControlDefinition", (): void => {
		it("should return the access control definition", (): void => {
			const ACCESS_CONTROL_DEFINITION: AccessControlDefinition = new AccessControlDefinition({
				allowedHeaders: [],
				allowedOrigins: [],
				maxAge: 0,
			});

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";
				protected override readonly accessControlDefinition: AccessControlDefinition = ACCESS_CONTROL_DEFINITION;

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			strictEqual(ENDPOINT.getAccessControlDefinition(), ACCESS_CONTROL_DEFINITION);
		});
	});

	describe("getPreHooks", (): void => {
		it("should return the pre hooks", (): void => {
			class DummyPreHook extends BasePreHook
			{
				public execute(): void { }
			}

			const HOOK: DummyPreHook = new DummyPreHook();

			class DummyEndpoint extends BaseEndpoint<{ query: unknown; path: unknown; payload: unknown; response: unknown }>
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";
				protected override readonly preHooks: Array<BasePreHook> = [HOOK];

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			deepStrictEqual(ENDPOINT.getPreHooks(), [HOOK]);
		});
	});

	describe("getExcludedGlobalPreHooks", (): void => {
		it("should return the excluded pre hook constructors", (): void => {
			class DummyPreHook extends BasePreHook
			{
				public execute(): void { }
			}

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";
				protected override readonly excludedGlobalPreHooks: Array<ConstructorOf<BasePreHook>> = [DummyPreHook];

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			deepStrictEqual(ENDPOINT.getExcludedGlobalPreHooks(), [DummyPreHook]);
		});
	});

	describe("getPostHooks", (): void => {
		it("should return the post hooks", (): void => {
			class DummyPostHook extends BasePostHook
			{
				public execute(): void { }
			}

			const HOOK: DummyPostHook = new DummyPostHook();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";
				protected override readonly postHooks: Array<BasePostHook> = [HOOK];

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			deepStrictEqual(ENDPOINT.getPostHooks(), [HOOK]);
		});
	});

	describe("getExcludedGlobalPostHooks", (): void => {
		it("should return the excluded post hook constructors", (): void => {
			class DummyPostHook extends BasePostHook
			{
				public execute(): void { }
			}

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";
				protected override readonly excludedGlobalPostHooks: Array<ConstructorOf<BasePostHook>> = [DummyPostHook];

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			deepStrictEqual(ENDPOINT.getExcludedGlobalPostHooks(), [DummyPostHook]);
		});
	});

	describe("getErrorHooks", (): void => {
		it("should return the error hooks", (): void => {
			class DummyErrorHook extends BaseErrorHook
			{
				public execute(): void { }
			}

			const HOOK: DummyErrorHook = new DummyErrorHook();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";
				protected override readonly errorHooks: Array<BaseErrorHook> = [HOOK];

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			deepStrictEqual(ENDPOINT.getErrorHooks(), [HOOK]);
		});
	});

	describe("getExcludedGlobalErrorHooks", (): void => {
		it("should return the excluded error hook constructors", (): void => {
			class DummyErrorHook extends BaseErrorHook
			{
				public execute(): void { }
			}

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";
				protected override readonly excludedGlobalErrorHooks: Array<ConstructorOf<BaseErrorHook>> = [DummyErrorHook];

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			deepStrictEqual(ENDPOINT.getExcludedGlobalErrorHooks(), [DummyErrorHook]);
		});
	});

	describe("getContext", (): void => {
		it("should throw if there's no context", (): void => {
			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const WRAPPER = (): void => {
				ENDPOINT["getContext"]();
			};

			throws(WRAPPER, new Error("This is not a contextual endpoint."));
		});

		it("should return the context", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			let result: unknown = undefined;

			const WRAPPER = (): void => {
				result = ENDPOINT["getContext"]();
			};

			doesNotThrow(WRAPPER);
			strictEqual(result, MOCK_CONTEXT.instance);
		});
	});

	describe("getPathFragment", (): void => {
		it("should throw if the fragment does not exist", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);
			MOCK_CONTEXT.request.stubs.getPathMatchGroups.returns({});

			const WRAPPER = (): void => {
				ENDPOINT["getPathFragment"]("uuid");
			};

			throws(WRAPPER, new ValidationError("The value must be a string."));
		});

		it("should return the fragment", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);
			MOCK_CONTEXT.request.stubs.getPathMatchGroups.returns({ uuid: "0000" });

			let result: unknown = undefined;

			const WRAPPER = (): void => {
				result = ENDPOINT["getPathFragment"]("uuid");
			};

			doesNotThrow(WRAPPER);
			strictEqual(result, "0000");
		});
	});

	describe("assertPathFragments", (): void => {
		it("should throw by default", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const WRAPPER = (): void => {
				// @ts-expect-error: Invoking protected method for testing purposes.
				ENDPOINT["assertPathFragments"]({});
			};

			throws(WRAPPER, new Error(`Method "assertPathFragments" needs an override in endpoint ${ENDPOINT.constructor.name}.`));
		});
	});

	describe("getPathFragments", (): void => {
		it("should retrieve the path fragments then test them with the assertor method", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint<{ pathFragments: { uuid: string } }>
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const GROUPS: symbol = Symbol();

			MOCK_CONTEXT.request.stubs.getPathMatchGroups.returns(GROUPS);

			// @ts-expect-error: Stubbing a protected method for testing purposes.
			const ASSERT_PATH_FRAGMENTS_STUB: SinonStub = stub(ENDPOINT, "assertPathFragments");

			ASSERT_PATH_FRAGMENTS_STUB.throws(new Error("The path fragments are invalid."));

			const WRAPPER = (): void => {
				ENDPOINT["getPathFragments"]();
			};

			throws(WRAPPER, new Error("The path fragments are invalid."));
			strictEqual(ASSERT_PATH_FRAGMENTS_STUB.callCount, 1, "'assertPathFragments' should be called once.");
			deepStrictEqual(ASSERT_PATH_FRAGMENTS_STUB.firstCall.args, [GROUPS]);
			strictEqual(MOCK_CONTEXT.request.stubs.getPathMatchGroups.callCount, 1, "'Request.getPathMatchGroups' should be called once.");
			strictEqual(MOCK_CONTEXT.request.stubs.getPathMatchGroups.firstCall.calledBefore(ASSERT_PATH_FRAGMENTS_STUB.firstCall), true, "'Request.getPathMatchGroups' should be called before 'assertPathFragments'.");
		});

		it("should return the path fragments if they pass the assertor", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint<{ pathFragments: { uuid: string } }>
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const GROUPS: symbol = Symbol();

			MOCK_CONTEXT.request.stubs.getPathMatchGroups.returns(GROUPS);

			// @ts-expect-error: Stubbing a protected method for testing purposes.
			const ASSERT_PATH_FRAGMENTS_STUB: SinonStub = stub(ENDPOINT, "assertPathFragments");

			ASSERT_PATH_FRAGMENTS_STUB.returns(undefined);

			let result: unknown = undefined;

			const WRAPPER = (): void => {
				result = ENDPOINT["getPathFragments"]();
			};

			doesNotThrow(WRAPPER);
			strictEqual(result, GROUPS);
		});

		it("should cache the path fragments", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint<{ pathFragments: { uuid: string } }>
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const GROUPS: symbol = Symbol();

			ReflectUtility.Set(ENDPOINT, "pathFragments", GROUPS);

			// @ts-expect-error: Stubbing a protected method for testing purposes.
			const ASSERT_PATH_FRAGMENTS_STUB: SinonStub = stub(ENDPOINT, "assertPathFragments");

			ASSERT_PATH_FRAGMENTS_STUB.returns(undefined);

			let result: unknown = undefined;

			const WRAPPER = (): void => {
				result = ENDPOINT["getPathFragments"]();
			};

			doesNotThrow(WRAPPER);
			strictEqual(result, GROUPS);
			strictEqual(MOCK_CONTEXT.request.stubs.getPathMatchGroups.callCount, 0, "'Request.getPathMatchGroups' should not have been called.");
			strictEqual(ASSERT_PATH_FRAGMENTS_STUB.callCount, 0, "'assertPathFragments' should not have been called.");
		});

		it("should call 'handleValidationError' with the error thrown by 'assertPathFragments'", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const ERROR: ValidationError = new ValidationError("The path is invalid.");

			// @ts-expect-error: Stubbing a protected method for testing purposes.
			const ASSERT_PATH_FRAGMENTS_STUB: SinonStub = stub(ENDPOINT, "assertPathFragments");
			// @ts-expect-error: Stubbing a protected method for testing purposes.
			const HANDLE_VALIDATION_ERROR_STUB: SinonStub = stub(ENDPOINT, "handleValidationError");

			ASSERT_PATH_FRAGMENTS_STUB.throws(ERROR);
			HANDLE_VALIDATION_ERROR_STUB.throws(ERROR);

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const WRAPPER = (): void => {
				ENDPOINT["getPathFragments"]();
			};

			throws(WRAPPER, ERROR);

			strictEqual(ASSERT_PATH_FRAGMENTS_STUB.callCount, 1, "The method 'assertPathFragments' should have been called exactly once.");
			strictEqual(HANDLE_VALIDATION_ERROR_STUB.callCount, 1, "The method 'handleValidationError' should have been called exactly once.");
			deepStrictEqual(HANDLE_VALIDATION_ERROR_STUB.firstCall.args, ["Invalid path", ERROR]);
		});
	});

	describe("assertQuery", (): void => {
		it("should throw by default", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const WRAPPER = (): void => {
				// @ts-expect-error: Invoking protected method for testing purposes.
				ENDPOINT["assertQuery"]({});
			};

			throws(WRAPPER, new Error(`Method "assertQuery" needs an override in endpoint ${ENDPOINT.constructor.name}.`));
		});
	});

	describe("getQuery", (): void => {
		it("should retrieve the query then test it with the assertor method", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint<{ query: { page: string } }>
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const QUERY: symbol = Symbol();

			MOCK_CONTEXT.request.stubs.getQuery.returns(QUERY);

			// @ts-expect-error: Stubbing a protected method for testing purposes.
			const ASSERT_QUERY_STUB: SinonStub = stub(ENDPOINT, "assertQuery");

			ASSERT_QUERY_STUB.throws(new Error("The query is invalid."));

			const WRAPPER = (): void => {
				ENDPOINT["getQuery"]();
			};

			throws(WRAPPER, new Error("The query is invalid."));
			strictEqual(ASSERT_QUERY_STUB.callCount, 1, "'assertQuery' should be called once.");
			deepStrictEqual(ASSERT_QUERY_STUB.firstCall.args, [QUERY]);
			strictEqual(MOCK_CONTEXT.request.stubs.getQuery.callCount, 1, "'Request.getQuery' should be called once.");
			strictEqual(MOCK_CONTEXT.request.stubs.getQuery.firstCall.calledBefore(ASSERT_QUERY_STUB.firstCall), true, "'Request.getQuery' should be called before 'assertQuery'.");
		});

		it("should return the query if it pass the assertor", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint<{ query: { page: string } }>
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const QUERY: symbol = Symbol();

			MOCK_CONTEXT.request.stubs.getQuery.returns(QUERY);

			// @ts-expect-error: Stubbing a protected method for testing purposes.
			const ASSERT_QUERY_STUB: SinonStub = stub(ENDPOINT, "assertQuery");

			ASSERT_QUERY_STUB.returns(undefined);

			let result: unknown = undefined;

			const WRAPPER = (): void => {
				result = ENDPOINT["getQuery"]();
			};

			doesNotThrow(WRAPPER);
			strictEqual(result, QUERY);
		});

		it("should cache the query", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint<{ query: { page: string } }>
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const QUERY: symbol = Symbol();

			ReflectUtility.Set(ENDPOINT, "query", QUERY);

			// @ts-expect-error: Stubbing a protected method for testing purposes.
			const ASSERT_QUERY_STUB: SinonStub = stub(ENDPOINT, "assertQuery");

			ASSERT_QUERY_STUB.returns(undefined);

			let result: unknown = undefined;

			const WRAPPER = (): void => {
				result = ENDPOINT["getQuery"]();
			};

			doesNotThrow(WRAPPER);
			strictEqual(result, QUERY);
			strictEqual(MOCK_CONTEXT.request.stubs.getQuery.callCount, 0, "'Request.getQuery' should not have been called.");
			strictEqual(ASSERT_QUERY_STUB.callCount, 0, "'assertQuery' should not have been called.");
		});

		it("should call 'handleValidationError' with the error thrown by 'assertQuery'", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const ERROR: ValidationError = new ValidationError("The query is invalid.");

			// @ts-expect-error: Stubbing a protected method for testing purposes.
			const ASSERT_QUERY_STUB: SinonStub = stub(ENDPOINT, "assertQuery");
			// @ts-expect-error: Stubbing a protected method for testing purposes.
			const HANDLE_VALIDATION_ERROR_STUB: SinonStub = stub(ENDPOINT, "handleValidationError");

			ASSERT_QUERY_STUB.throws(ERROR);
			HANDLE_VALIDATION_ERROR_STUB.throws(ERROR);

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const WRAPPER = (): void => {
				ENDPOINT["getQuery"]();
			};

			throws(WRAPPER, ERROR);

			strictEqual(ASSERT_QUERY_STUB.callCount, 1, "The method 'assertQuery' should have been called exactly once.");
			strictEqual(HANDLE_VALIDATION_ERROR_STUB.callCount, 1, "The method 'handleValidationError' should have been called exactly once.");
			deepStrictEqual(HANDLE_VALIDATION_ERROR_STUB.firstCall.args, ["Invalid query parameters", ERROR]);
		});
	});

	describe("assertPayload", (): void => {
		it("should throw by default", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const WRAPPER = (): void => {
				// @ts-expect-error: Invoking protected method for testing purposes.
				ENDPOINT["assertPayload"]({});
			};

			throws(WRAPPER, new Error(`Method "assertPayload" needs an override in endpoint ${ENDPOINT.constructor.name}.`));
		});
	});

	describe("getPayload", (): void => {
		it("should retrieve the payload then test it with the assertor method", async (): Promise<void> => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint<{ payload: { page: string } }>
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const PAYLOAD: symbol = Symbol();

			MOCK_CONTEXT.request.stubs.getBodyAsJSON.resolves(PAYLOAD);

			// @ts-expect-error: Stubbing a protected method for testing purposes.
			const ASSERT_PAYLOAD_STUB: SinonStub = stub(ENDPOINT, "assertPayload");

			ASSERT_PAYLOAD_STUB.throws(new Error("The payload is invalid."));

			const RESULT: Promise<unknown> = ENDPOINT["getPayload"]();

			await rejects(RESULT, new Error("The payload is invalid."));
			strictEqual(ASSERT_PAYLOAD_STUB.callCount, 1, "The method 'assertPayload' should have been called once.");
			deepStrictEqual(ASSERT_PAYLOAD_STUB.firstCall.args, [PAYLOAD]);
			strictEqual(MOCK_CONTEXT.request.stubs.getBodyAsJSON.callCount, 1, "'Request.getBodyAsJSON' should have been called once.");
			strictEqual(MOCK_CONTEXT.request.stubs.getBodyAsJSON.firstCall.calledBefore(ASSERT_PAYLOAD_STUB.firstCall), true, "'Request.getBodyAsJSON' should be called before 'assertPayload'.");
		});

		it("should return the payload if it pass the assertor", async (): Promise<void> => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint<{ payload: { page: string } }>
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const PAYLOAD: symbol = Symbol();

			MOCK_CONTEXT.request.stubs.getBodyAsJSON.resolves(PAYLOAD);

			// @ts-expect-error: Stubbing a protected method for testing purposes.
			const ASSERT_PAYLOAD_STUB: SinonStub = stub(ENDPOINT, "assertPayload");

			ASSERT_PAYLOAD_STUB.returns(undefined);

			const RESULT: Promise<unknown> = ENDPOINT["getPayload"]();

			await doesNotReject(RESULT);
			strictEqual(await RESULT, PAYLOAD);
		});

		it("should cache the payload", async (): Promise<void> => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint<{ payload: { page: string } }>
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const PAYLOAD: symbol = Symbol();

			ReflectUtility.Set(ENDPOINT, "payload", PAYLOAD);

			// @ts-expect-error: Stubbing a protected method for testing purposes.
			const ASSERT_PAYLOAD_STUB: SinonStub = stub(ENDPOINT, "assertPayload");

			ASSERT_PAYLOAD_STUB.returns(undefined);

			const RESULT: Promise<unknown> = ENDPOINT["getPayload"]();

			await doesNotReject(RESULT);
			strictEqual(await RESULT, PAYLOAD);
			strictEqual(MOCK_CONTEXT.request.stubs.getBodyAsJSON.callCount, 0, "'Request.getBodyAsJSON' should not have been called.");
			strictEqual(ASSERT_PAYLOAD_STUB.callCount, 0, "The method 'assertPayload' should not have been called.");
		});

		it("should call 'handleValidationError' with the error thrown by 'assertPayload'", async (): Promise<void> => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const ERROR: ValidationError = new ValidationError("The payload is invalid.");

			// @ts-expect-error: Stubbing a protected method for testing purposes.
			const ASSERT_PAYLOAD_STUB: SinonStub = stub(ENDPOINT, "assertPayload");
			// @ts-expect-error: Stubbing a protected method for testing purposes.
			const HANDLE_VALIDATION_ERROR_STUB: SinonStub = stub(ENDPOINT, "handleValidationError");

			MOCK_CONTEXT.request.stubs.getBodyAsJSON.resolves({});
			ASSERT_PAYLOAD_STUB.throws(ERROR);
			HANDLE_VALIDATION_ERROR_STUB.throws(ERROR);

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const RESULT: Promise<unknown> = ENDPOINT["getPayload"]();

			await rejects(RESULT, ERROR);

			strictEqual(ASSERT_PAYLOAD_STUB.callCount, 1, "The method 'assertPayload' should have been called exactly once.");
			strictEqual(HANDLE_VALIDATION_ERROR_STUB.callCount, 1, "The method 'handleValidationError' should have been called exactly once.");
			deepStrictEqual(HANDLE_VALIDATION_ERROR_STUB.firstCall.args, ["Invalid payload", ERROR]);
		});
	});

	describe("buildResponse", (): void => {
		it("should throw by default", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const WRAPPER = (): void => {
				// @ts-expect-error: Invoking protected method for testing purposes.
				ENDPOINT["buildResponse"]({});
			};

			throws(WRAPPER, new Error(`Method "buildResponse" need an override in endpoint ${ENDPOINT.constructor.name}.`));
		});
	});

	describe("getResponse", (): void => {
		it("should return the response", async (): Promise<void> => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint<{ payload: { page: string } }>
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const RESPONSE: symbol = Symbol();

			// @ts-expect-error: Stubbing a protected method for testing purposes.
			const STUB: SinonStub = stub(ENDPOINT, "buildResponse");

			STUB.resolves(RESPONSE);

			const RESULT: Promise<unknown> = ENDPOINT["getResponse"]();

			await doesNotReject(RESULT);
			strictEqual(await RESULT, RESPONSE);
			strictEqual(STUB.callCount, 1, "'buildResponse' should be called once.");
		});

		it("should cache the response", async (): Promise<void> => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint<{ payload: { page: string } }>
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const RESPONSE: symbol = Symbol();

			ReflectUtility.Set(ENDPOINT, "response", RESPONSE);

			// @ts-expect-error: Stubbing a protected method for testing purposes.
			const STUB: SinonStub = stub(ENDPOINT, "buildResponse");

			const RESULT: Promise<unknown> = ENDPOINT["getResponse"]();

			await doesNotReject(RESULT);
			strictEqual(await RESULT, RESPONSE);
			strictEqual(STUB.callCount, 0, "'buildResponse' should not have been called.");
		});
	});

	describe("handleValidationError", (): void => {
		it("should rethrow by default (Error)", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const ERROR: Error = new Error("Test");

			const WRAPPER = (): void => {
				ENDPOINT["handleValidationError"]("Invalid payload", ERROR);
			};

			throws(WRAPPER, ERROR);
		});

		it("should rethrow by default (UnknownError)", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const ERROR: unknown = "The payload is invalid.";

			const WRAPPER = (): void => {
				ENDPOINT["handleValidationError"]("Invalid payload", ERROR);
			};

			throws(WRAPPER, toError(ERROR));
		});

		it("should convert a ValidationError into a HTTPError before throwing it", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyEndpoint extends BaseEndpoint
			{
				protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected readonly route: string = "/test-dummy";

				public execute(): void { }
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			ReflectUtility.Set(ENDPOINT, "context", MOCK_CONTEXT.instance);

			const ERROR: ValidationError = new ValidationError("Test");

			const EXPECTED_ERROR: HTTPError = new HTTPError({
				message: "Invalid payload",
				statusCode: HTTPStatusCodeEnum.UNPROCESSABLE_ENTITY,
				data: normalizeErrorTree(ERROR),
			});

			const WRAPPER = (): void => {
				ENDPOINT["handleValidationError"]("Invalid payload", ERROR);
			};

			throws(WRAPPER, EXPECTED_ERROR);
		});
	});
});
