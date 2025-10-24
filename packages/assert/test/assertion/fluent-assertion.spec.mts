import type { AssertionInstantiationInterface } from "../../src/definition/interface/assertion-instantiation.interface.mjs";
import { describe, it } from "node:test";
import { deepStrictEqual, doesNotReject, doesNotThrow, fail, rejects, strictEqual, throws } from "node:assert";
import { type SinonStub, stub } from "sinon";
import { FluentAssertion } from "../../src/assertion/_internal.mjs";
import { mockAssertionInstantiation } from "../../mock/mock-assertion-instantiation.mjs";
import { mockAssertion } from "../../mock/mock-assertion.mjs";
import { mockChildAssertion } from "../../mock/mock-child-assertion.mjs";
import { mockVoidAssertion } from "../../mock/mock-void-assertion.mjs";
import { createErrorPredicate } from "../../src/error-predicate/create-error-predicate.mjs";

describe("FluentAssertion", (): void => {
	describe("constructor", (): void => {
		it("should create a new instance", (): void => {
			const PARAMETERS: Required<AssertionInstantiationInterface> = mockAssertionInstantiation();

			const ASSERTION: FluentAssertion = Reflect.construct(FluentAssertion, [PARAMETERS]);

			strictEqual(Reflect.get(ASSERTION, "root"), PARAMETERS.root);
			strictEqual(Reflect.get(ASSERTION, "parent"), PARAMETERS.parent);
			strictEqual(Reflect.get(ASSERTION, "name"), PARAMETERS.name);
			strictEqual(Reflect.get(ASSERTION, "actualValue"), Reflect.get(FluentAssertion, "MISSING_VALUE"));
		});
	});

	describe("not", (): void => {
		it("should keep the chain going", (): void => {
			const ASSERTION: FluentAssertion = mockAssertion();

			const RESULT: unknown = ASSERTION.not;

			strictEqual(RESULT, ASSERTION);
		});

		it("should set the negation flag", (): void => {
			const ASSERTION: FluentAssertion = mockAssertion();

			ASSERTION.not;

			strictEqual(Reflect.get(ASSERTION, "negationFlag"), true);
		});

		it("should throw if the flag is already set", (): void => {
			const ASSERTION: FluentAssertion = mockAssertion();

			doesNotThrow((): void => { ASSERTION.not; });

			throws(
				(): void => { ASSERTION.not; },
				createErrorPredicate("Double negation")
			);

			throws(
				(): void => { ASSERTION.not; },
				createErrorPredicate("Double negation")
			);
		});

		it("should return itself", (): void => {
			const ASSERTION: FluentAssertion = mockAssertion();

			strictEqual(ASSERTION.not, ASSERTION, "Expected the getter to return this");
		});
	});

	describe("throws", (): void => {
		it("should throw if negated", (): void => {
			const ASSERTION: FluentAssertion = mockAssertion();

			throws(
				(): void => { ASSERTION.not.throw(); },
				createErrorPredicate('"throws" cannot be negated, use "returns" instead')
			);
		});

		it("should throw if the value is not a callable", (): void => {
			const ASSERTION: FluentAssertion = mockAssertion();

			throws(
				(): void => { ASSERTION.throw(); },
				createErrorPredicate("Expected the tested value to be a function")
			);
		});

		it("should throw if the value does not throw", (): void => {
			const STUB: SinonStub = stub();
			const ASSERTION: FluentAssertion = mockAssertion(STUB);

			STUB.returns(undefined);

			throws(
				(): void => { ASSERTION.throw(); },
				createErrorPredicate("Missing expected exception: Expected the tested value to throw")
			);

			strictEqual(STUB.callCount, 1, "Expected the callable to be called");
		});

		it("should throw if the thrown error does not match the default predicate", (): void => {
			const STUB: SinonStub = stub();
			const ASSERTION: FluentAssertion = mockAssertion(STUB);

			STUB.throws(42);

			throws(
				(): void => { ASSERTION.throw(); },
				createErrorPredicate("Expected the tested value to throw with an instance of Error, but got an integer.")
			);

			strictEqual(STUB.callCount, 1, "Expected the callable to be called");
		});

		it("should throw if the thrown error does not match the custom predicate", (): void => {
			const STUB: SinonStub = stub();
			const ASSERTION: FluentAssertion = mockAssertion(STUB);

			STUB.throws(new Error("Test"));

			throws(
				(): void => { ASSERTION.throw(RangeError); },
				createErrorPredicate("Expected the tested value to throw with an instance of RangeError, but got an instance of Error.")
			);

			strictEqual(STUB.callCount, 1, "Expected the callable to be called");
		});

		it("should return if the thrown error match the default predicate", (): void => {
			const STUB: SinonStub = stub();
			const ASSERTION: FluentAssertion = mockAssertion(STUB);

			STUB.throws(new RangeError("Test"));

			doesNotThrow((): void => { ASSERTION.throw(); });
			strictEqual(STUB.callCount, 1, "Expected the callable to be called");
		});

		it("should return if the thrown error match the custom predicate", (): void => {
			const STUB: SinonStub = stub();
			const ASSERTION: FluentAssertion = mockAssertion(STUB);

			STUB.throws(new RangeError("Test"));

			doesNotThrow((): void => { ASSERTION.throw(RangeError); });
			strictEqual(STUB.callCount, 1, "Expected the callable to be called");
		});

		it("should return a VoidAssertion", (): void => {
			const STUB: SinonStub = stub();
			const ASSERTION: FluentAssertion = mockAssertion(STUB);

			STUB.throws(new Error("Test"));

			deepStrictEqual(ASSERTION.throw(), mockVoidAssertion(ASSERTION));
		});
	});

	describe("returns", (): void => {
		it("should throw if negated", (): void => {
			const ASSERTION: FluentAssertion = mockAssertion();

			throws(
				(): void => { ASSERTION.not.return; },
				createErrorPredicate('"returns" cannot be negated, use "throws" instead')
			);
		});

		it("should throw if the value is not a callable", (): void => {
			const ASSERTION: FluentAssertion = mockAssertion();

			throws(
				(): void => { ASSERTION.return; },
				createErrorPredicate("Expected the tested value to be a function")
			);
		});

		it("should throw if the value throws", (): void => {
			const STUB: SinonStub = stub();
			const ASSERTION: FluentAssertion = mockAssertion(STUB);

			STUB.throws();

			throws(
				(): void => { ASSERTION.return; },
				createErrorPredicate("Got unwanted exception: Expected the tested value to return")
			);

			strictEqual(STUB.callCount, 1, "Expected the callable to be called");
		});

		it("should return if the value returns", (): void => {
			const STUB: SinonStub = stub();
			const ASSERTION: FluentAssertion = mockAssertion(STUB);

			STUB.returns(undefined);

			doesNotThrow((): void => { ASSERTION.return; });
			strictEqual(STUB.callCount, 1, "Expected the callable to be called");
		});

		it("should return a new assertion for the returned value", (): void => {
			const STUB: SinonStub = stub();
			const ASSERTION: FluentAssertion = mockAssertion(STUB);

			STUB.returns(undefined);

			let result: unknown = undefined;

			doesNotThrow((): void => { result = ASSERTION.return; });
			strictEqual(STUB.callCount, 1, "Expected the callable to be called");

			if (result === ASSERTION || !(result instanceof FluentAssertion))
			{
				fail("Expected the returned value to be a new FluentAssertion");
			}

			strictEqual(Reflect.get(result, "parent"), ASSERTION);
		});

		it("should return a new FluentAssertion for the returned value", (): void => {
			const STUB: SinonStub = stub();
			const ASSERTION: FluentAssertion = mockAssertion(STUB);

			STUB.returns(42);

			deepStrictEqual(ASSERTION.return, mockChildAssertion(ASSERTION, 42, "the tested value returned value"));
		});
	});

	describe("rejects", (): void => {
		it("should throw if negated", (): void => {
			const ASSERTION: FluentAssertion = mockAssertion();

			throws(
				(): void => { ASSERTION.not.reject(); },
				createErrorPredicate('"rejects" cannot be negated, use "fulfills" instead')
			);
		});

		it("should reject if the value is not a Promise", async (): Promise<void> => {
			const ASSERTION: FluentAssertion = mockAssertion();

			await rejects(
				async (): Promise<void> => { await ASSERTION.reject(); },
				createErrorPredicate("Expected the tested value to be a function")
			);
		});

		it("should rejects if the value does not reject", async (): Promise<void> => {
			const ASSERTION: FluentAssertion = mockAssertion(Promise.resolve());

			await rejects(
				async (): Promise<void> => { await ASSERTION.reject(); },
				createErrorPredicate("Missing expected exception: Expected the tested value to throw")
			);
		});

		it("should rejects if the thrown error does not match the default predicate", async (): Promise<void> => {
			const ASSERTION: FluentAssertion = mockAssertion(Promise.reject(42));

			await rejects(
				async (): Promise<void> => { await ASSERTION.reject(); },
				createErrorPredicate("Expected the tested value to throw with an instance of Error, but got an integer.")
			);
		});

		it("should rejects if the thrown error does not match the custom predicate", async (): Promise<void> => {
			const ASSERTION: FluentAssertion = mockAssertion(Promise.reject(new Error("Test")));

			await rejects(
				async (): Promise<void> => { await ASSERTION.reject(RangeError); },
				createErrorPredicate("Expected the tested value to throw with an instance of RangeError, but got an instance of Error.")
			);
		});

		it("should fulfills if the thrown error match the default predicate", async (): Promise<void> => {
			const ASSERTION: FluentAssertion = mockAssertion(Promise.reject(new Error("Test")));

			await doesNotReject(async (): Promise<void> => { await ASSERTION.reject(); });
		});

		it("should fulfills if the thrown error match the custom predicate", async (): Promise<void> => {
			const ASSERTION: FluentAssertion = mockAssertion(Promise.reject(new RangeError("Test")));

			await doesNotReject(async (): Promise<void> => { await ASSERTION.reject(RangeError); });
		});

		it("should return a VoidAssertion", (): void => {
			const ASSERTION: FluentAssertion = mockAssertion(Promise.reject(new Error("Test")));

			const RESULT: unknown = ASSERTION.reject();

			deepStrictEqual(RESULT, mockVoidAssertion(ASSERTION));
		});
	});

	describe("fulfills", (): void => {
		it("should throw if negated", (): void => {
			const ASSERTION: FluentAssertion = mockAssertion();

			throws(
				(): void => { ASSERTION.not.fulfill; },
				createErrorPredicate('"fulfills" cannot be negated, use "rejects" instead')
			);
		});

		it("should reject if the value is not a Promise", (): void => {
			const ASSERTION: FluentAssertion = mockAssertion();

			rejects(
				async (): Promise<void> => { await ASSERTION.fulfill; },
				createErrorPredicate("Expected the tested value to be a Promise")
			);
		});

		it("should reject if the value rejects", async (): Promise<void> => {
			const ASSERTION: FluentAssertion = mockAssertion(Promise.reject(new Error("Test")));

			await rejects(
				async (): Promise<void> => { await ASSERTION.fulfill; },
				createErrorPredicate("Got unwanted exception: Expected the tested value to return")
			);
		});

		it("should return if the value returns", (): void => {
			const STUB: SinonStub = stub();
			const ASSERTION: FluentAssertion = mockAssertion(STUB);

			STUB.returns(undefined);

			doesNotThrow((): void => { ASSERTION.return; });
			strictEqual(STUB.callCount, 1, "Expected the callable to be called");
		});

		it("should return a new FluentAssertion for the promised value", async (): Promise<void> => {
			const ASSERTION: FluentAssertion = mockAssertion(Promise.resolve(42));

			const RESULT: unknown = ASSERTION.fulfill;

			await RESULT;

			deepStrictEqual(RESULT, mockChildAssertion(ASSERTION, 42, "the tested value returned value"));
		});
	});
});
