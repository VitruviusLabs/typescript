import { describe } from "node:test";
import { BaseDomain } from "../../src/_index.mjs";

describe("BaseDomain", (): void => {
	describe("Initialize", (): void => {
		it("should exists but do nothing", async (): Promise<void> => {
			class DummyDomain extends BaseDomain {}

			await DummyDomain.Initialize();
		});
	});
});
