import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { instanceOf } from "@vitruvius-labs/toolbox";
import { DummyDelegate, DummyDelegatedRepository, DummyModel, DummySimpleFactory } from "../../mock/_index.mjs";
import { BaseRepository } from "../../src/_index.mjs";

describe("DelegatedRepository", (): void => {
	describe("constructor", (): void => {
		it("should create a new repository", (): void => {
			const DELEGATE: DummyDelegate = new DummyDelegate();
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyDelegatedRepository = new DummyDelegatedRepository(FACTORY, DELEGATE);

			// @ts-expect-error: BaseRepository is an abstract class
			instanceOf(REPOSITORY, BaseRepository);
			strictEqual(REPOSITORY["factory"], FACTORY);
		});
	});
});
