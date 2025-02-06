import { describe, it } from "node:test";
import { deepStrictEqual, doesNotThrow, strictEqual, throws } from "node:assert";
import { type SinonStub, stub } from "sinon";
import { ValidationError, ValidationResult, Validator } from "../../src/_index.mjs";
import { consumeValue, createValue } from "@vitruvius-labs/testing-ground";

describe("Validator", (): void => {
	describe("constructor", (): void => {
		it("should create a new instance", (): void => {
			const STUB: SinonStub & ((arg: unknown) => asserts arg is number) = stub();

			const RESULT: Validator<number> = new Validator<number>(STUB);

			strictEqual(RESULT["assertor"], STUB);
		});
	});

	describe("assert", (): void => {
		it("should throw if the value is invalid", (): void => {
			const STUB: SinonStub & ((arg: unknown) => asserts arg is number) = stub();
			const VALUE: unknown = createValue<unknown>(Symbol());
			const ERROR: ValidationError = new ValidationError("Test");
			const VALIDATOR: Validator<number> = new Validator<number>(STUB);

			STUB.throws(ERROR);

			throws(
				(): void => {
					VALIDATOR.assert(VALUE);
				},
				ERROR
			);

			strictEqual(STUB.callCount, 1);
			deepStrictEqual(STUB.firstCall.args, [VALUE]);
		});

		it("should return if the value is valid", (): void => {
			const STUB: SinonStub & ((arg: unknown) => asserts arg is number) = stub();
			const VALUE: unknown = createValue<unknown>(Symbol());
			const VALIDATOR: Validator<number> = new Validator<number>(STUB);

			STUB.returns(undefined);

			doesNotThrow((): void => {
				VALIDATOR.assert(VALUE);
				consumeValue<number>(VALUE);
			});

			strictEqual(STUB.callCount, 1);
			deepStrictEqual(STUB.firstCall.args, [VALUE]);
		});
	});

	describe("guard", (): void => {
		it("should return false if the value is invalid", (): void => {
			const STUB: SinonStub & ((arg: unknown) => asserts arg is number) = stub();
			const VALUE: unknown = createValue<unknown>(Symbol());
			const ERROR: ValidationError = new ValidationError("Test");
			const VALIDATOR: Validator<number> = new Validator<number>(STUB);

			STUB.throws(ERROR);

			strictEqual(VALIDATOR.guard(VALUE), false);
			strictEqual(STUB.callCount, 1);
			deepStrictEqual(STUB.firstCall.args, [VALUE]);
		});

		it("should return true if value is valid", (): void => {
			const STUB: SinonStub & ((arg: unknown) => asserts arg is number) = stub();
			const VALUE: unknown = createValue<unknown>(Symbol());
			const VALIDATOR: Validator<number> = new Validator<number>(STUB);

			STUB.returns(undefined);

			strictEqual(VALIDATOR.guard(VALUE), true);
			strictEqual(STUB.callCount, 1);
			deepStrictEqual(STUB.firstCall.args, [VALUE]);

			if (VALIDATOR.guard(VALUE))
			{
				consumeValue<number>(VALUE);
			}
		});
	});

	describe("validate", (): void => {
		it("should return a failed validation result if the value is invalid", (): void => {
			const STUB: SinonStub & ((arg: unknown) => asserts arg is number) = stub();
			const VALUE: unknown = createValue<unknown>(Symbol());
			const ERROR: ValidationError = new ValidationError("Test");
			const VALIDATOR: Validator<number> = new Validator<number>(STUB);

			STUB.throws(ERROR);

			deepStrictEqual(VALIDATOR.validate(VALUE), ERROR);
			strictEqual(STUB.callCount, 1);
			deepStrictEqual(STUB.firstCall.args, [VALUE]);
		});

		it("should return undefined if the value is valid", (): void => {
			const STUB: SinonStub & ((arg: unknown) => asserts arg is number) = stub();
			const VALUE: unknown = createValue<unknown>(Symbol());
			const VALIDATOR: Validator<number> = new Validator<number>(STUB);

			STUB.returns(undefined);

			strictEqual(VALIDATOR.validate(VALUE), undefined);
			strictEqual(STUB.callCount, 1);
			deepStrictEqual(STUB.firstCall.args, [VALUE]);
		});
	});

	describe("evaluate", (): void => {
		it("should return a failure result if the value is invalid", (): void => {
			const STUB: SinonStub & ((arg: unknown) => asserts arg is number) = stub();
			const VALUE: unknown = createValue<unknown>(Symbol());
			const ERROR: ValidationError = new ValidationError("Test");
			const VALIDATOR: Validator<number> = new Validator<number>(STUB);

			STUB.throws(ERROR);

			deepStrictEqual(VALIDATOR.evaluate(VALUE), new ValidationResult(ERROR));
			strictEqual(STUB.callCount, 1);
			deepStrictEqual(STUB.firstCall.args, [VALUE]);
		});

		it("should return a success result if the value is valid", (): void => {
			const STUB: SinonStub & ((arg: unknown) => asserts arg is number) = stub();
			const VALUE: unknown = createValue<unknown>(Symbol());
			const VALIDATOR: Validator<number> = new Validator<number>(STUB);

			STUB.returns(undefined);

			deepStrictEqual(VALIDATOR.evaluate(VALUE), new ValidationResult(VALUE));
			strictEqual(STUB.callCount, 1);
			deepStrictEqual(STUB.firstCall.args, [VALUE]);

			if (VALIDATOR.guard(VALUE))
			{
				consumeValue<number>(VALUE);
			}
		});
	});
});
