import type { BaseAssertionInstantiationInterface } from "../../src/definition/interface/base-assertion-instantiation.interface.mjs";
import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { FluentAssertion, RootAssertion, VoidAssertion } from "../../src/assertion/_internal.mjs";

describe("VoidAssertion", (): void => {
	describe("constructor", (): void => {
		it("should create a new instance", (): void => {
			const ROOT: RootAssertion = new RootAssertion("root");
			const PARENT: FluentAssertion = new FluentAssertion({ root: ROOT, parent: ROOT, name: "parent" });

			const PARAMETERS: BaseAssertionInstantiationInterface = {
				root: ROOT,
				parent: PARENT,
			};

			const ASSERTION: VoidAssertion = new VoidAssertion(PARAMETERS);

			strictEqual(Reflect.get(ASSERTION, "root"), ROOT);
			strictEqual(Reflect.get(ASSERTION, "parent"), PARENT);
		});
	});
});
