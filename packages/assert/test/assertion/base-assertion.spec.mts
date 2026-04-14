import type { BaseAssertionInstantiationInterface } from "../../src/definition/interface/base-assertion-instantiation.interface.mjs";
import { describe, it } from "node:test";
import { doesNotReject, strictEqual, throws } from "node:assert";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { BaseAssertionInternal } from "../../src/assertion/_internal.mjs";
import { mockAssertionInstantiation } from "../../mock/mock-assertion-instantiation.mjs";

describe("BaseAssertionInternal", (): void => {
	describe("constructor", (): void => {
		it("should create a new instance", (): void => {
			const PARAMETERS: Required<BaseAssertionInstantiationInterface> = mockAssertionInstantiation();

			const ASSERTION: BaseAssertionInternal = Reflect.construct(BaseAssertionInternal, [PARAMETERS]);

			strictEqual(Reflect.get(ASSERTION, "root"), PARAMETERS.root);
			strictEqual(Reflect.get(ASSERTION, "parent"), PARAMETERS.parent);
		});

		it("should throw if the root is not a RootAssertionInternal", (): void => {
			const PARAMETERS: Required<BaseAssertionInstantiationInterface> = mockAssertionInstantiation();

			throws(
				(): void => { Reflect.construct(BaseAssertionInternal, [{ root: undefined, parent: PARAMETERS.parent }]); },
				createErrorTest()
			);
		});

		it("should throw if the parent is not a FluentAssertionInternal", (): void => {
			const PARAMETERS: Required<BaseAssertionInstantiationInterface> = mockAssertionInstantiation();

			throws(
				(): void => { Reflect.construct(BaseAssertionInternal, [{ root: PARAMETERS.root, parent: undefined }]); },
				createErrorTest()
			);
		});
	});

	describe("reset", (): void => {
		it("should throw an error if the root assertion is reached", (): void => {
			const PARAMETERS: Required<BaseAssertionInstantiationInterface> = mockAssertionInstantiation();

			throws(
				(): void => { PARAMETERS.root.reset(); },
				createErrorTest()
			);
		});

		it("should return the root assertion", (): void => {
			const PARAMETERS: Required<BaseAssertionInstantiationInterface> = mockAssertionInstantiation();

			const ASSERTION: BaseAssertionInternal = Reflect.construct(BaseAssertionInternal, [PARAMETERS]);

			const RESULT: unknown = ASSERTION.reset();

			strictEqual(RESULT, PARAMETERS.root);
		});
	});

	describe("rewind", (): void => {
		it("should throw an error if the root assertion is reached", (): void => {
			const PARAMETERS: Required<BaseAssertionInstantiationInterface> = mockAssertionInstantiation();

			throws(
				(): void => { PARAMETERS.root.rewind(); },
				createErrorTest()
			);
		});

		it("should return the parent assertion", (): void => {
			const PARAMETERS: Required<BaseAssertionInstantiationInterface> = mockAssertionInstantiation();

			const ASSERTION: BaseAssertionInternal = Reflect.construct(BaseAssertionInternal, [PARAMETERS]);

			const RESULT: unknown = ASSERTION.rewind();

			strictEqual(RESULT, PARAMETERS.parent);
		});
	});

	describe("then", (): void => {
		it("should make the assertion resolve as a promise", async (): Promise<void> => {
			const PARAMETERS: Required<BaseAssertionInstantiationInterface> = mockAssertionInstantiation();

			const ASSERTION: BaseAssertionInternal = Reflect.construct(BaseAssertionInternal, [PARAMETERS]);

			Reflect.set(PARAMETERS.root, "promise", Promise.resolve("promise"));

			const PROMISE: Promise<unknown> = Promise.resolve(ASSERTION);

			await doesNotReject(PROMISE);

			const RESULT: unknown = await PROMISE;

			strictEqual(RESULT, "promise");
		});
	});
});
