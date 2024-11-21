import { describe, it } from "node:test";
import { DummyDomain } from "../../mock/_index.mjs";

describe("BaseDomain", (): void => {
	describe("Initialize", (): void => {
		it("should exists but do nothing", async (): Promise<void> => {
			await DummyDomain.Initialize();
		});
	});
});
