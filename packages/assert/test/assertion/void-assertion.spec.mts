import type { BaseAssertionInstantiationInterface } from "../../src/definition/interface/base-assertion-instantiation.interface.mjs";
import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { FluentAssertionInternal, RootAssertionInternal, VoidAssertionInternal } from "../../src/assertion/_internal.mjs";

describe("VoidAssertionInternal", (): void => {
	describe("constructor", (): void => {
		it("should create a new instance", (): void => {
			const ROOT: RootAssertionInternal = new RootAssertionInternal("root");
			const PARENT: FluentAssertionInternal = new FluentAssertionInternal({ root: ROOT, parent: ROOT, name: "parent" });

			const PARAMETERS: BaseAssertionInstantiationInterface = {
				root: ROOT,
				parent: PARENT,
			};

			const ASSERTION: VoidAssertionInternal = new VoidAssertionInternal(PARAMETERS);

			strictEqual(Reflect.get(ASSERTION, "root"), ROOT);
			strictEqual(Reflect.get(ASSERTION, "parent"), PARENT);
		});
	});
});
