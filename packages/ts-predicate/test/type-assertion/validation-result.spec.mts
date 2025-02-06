import { describe, it } from "node:test";
import { deepStrictEqual, doesNotReject, rejects, strictEqual } from "node:assert";
import { type SinonStub, stub } from "sinon";
import { ValidationError, ValidationResult } from "../../src/_index.mjs";

describe("ValidationResult", (): void => {
	describe("constructor", (): void => {
		it("should create a new instance", (): void => {
			const VALUE: number = 42;

			const RESULT: ValidationResult<number> = new ValidationResult<number>(VALUE);

			strictEqual(RESULT["value"], VALUE);
		});
	});

	describe("onSuccess", (): void => {
		it("should call the callback with the value", (): void => {
			const VALUE: number = 42;
			const RESULT: ValidationResult<number> = new ValidationResult<number>(VALUE);

			const STUB: SinonStub = stub();

			RESULT.onSuccess(STUB);

			strictEqual(STUB.callCount, 1);
			deepStrictEqual(STUB.firstCall.args, [VALUE]);
		});

		it("should not call the callback with the error", (): void => {
			const ERROR: ValidationError = new ValidationError("Test");
			const RESULT: ValidationResult<number> = new ValidationResult<number>(ERROR);

			const STUB: SinonStub = stub();

			RESULT.onSuccess(STUB);

			strictEqual(STUB.callCount, 0);
		});
	});

	describe("onFailure", (): void => {
		it("should call the callback with the error", (): void => {
			const ERROR: ValidationError = new ValidationError("Test");
			const RESULT: ValidationResult<number> = new ValidationResult<number>(ERROR);

			const STUB: SinonStub = stub();

			RESULT.onFailure(STUB);

			strictEqual(STUB.callCount, 1);
			deepStrictEqual(STUB.firstCall.args, [ERROR]);
		});

		it("should not call the callback with the value", (): void => {
			const VALUE: number = 42;
			const RESULT: ValidationResult<number> = new ValidationResult<number>(VALUE);

			const STUB: SinonStub = stub();

			RESULT.onFailure(STUB);

			strictEqual(STUB.callCount, 0);
		});
	});

	describe("then", (): void => {
		it("should be a thenable (value)", async (): Promise<void> => {
			const VALUE: number = 42;
			const RESULT: ValidationResult<number> = new ValidationResult<number>(VALUE);

			const PROMISE: Promise<number> = Promise.resolve(RESULT);

			await doesNotReject(PROMISE);
			strictEqual(await PROMISE, VALUE);
		});

		it("should be a thenable (error)", async (): Promise<void> => {
			const ERROR: ValidationError = new ValidationError("Test");
			const RESULT: ValidationResult<number> = new ValidationResult<number>(ERROR);

			const PROMISE: Promise<number> = Promise.resolve(RESULT);

			await rejects(PROMISE, ERROR);
		});
	});
});
