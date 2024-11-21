import { describe, it } from "node:test";
import { deepStrictEqual, doesNotThrow, strictEqual, throws } from "node:assert";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { ReflectUtility } from "@vitruvius-labs/toolbox";
import { ContextualStorage } from "../../../src/_index.mjs";

describe("ContextualStorage", (): void => {
	describe("findContextualItem", (): void => {
		it("should retrieve an item in the storage if it exists.", (): void => {
			class DummyStorage extends ContextualStorage {}

			const STORAGE: ContextualStorage = new DummyStorage();
			const DATE: Date = new Date();

			ReflectUtility.Set(STORAGE, "contextualItems", new Map([[Date, DATE]]));

			strictEqual(STORAGE.findContextualItem(Date), DATE);
		});

		it("should return undefined if an item doesn't exists in the storage.", (): void => {
			class DummyStorage extends ContextualStorage {}

			const STORAGE: ContextualStorage = new DummyStorage();

			strictEqual(STORAGE.findContextualItem(Date), undefined);
		});
	});

	describe("getContextualItem", (): void => {
		it("should retrieve an item in the storage if it exists.", (): void => {
			class DummyStorage extends ContextualStorage {}

			const STORAGE: ContextualStorage = new DummyStorage();
			const DATE: Date = new Date();

			ReflectUtility.Set(STORAGE, "contextualItems", new Map([[Date, DATE]]));

			strictEqual(STORAGE.getContextualItem(Date), DATE);
		});

		it("should throw if an item doesn't exist in the storage.", (): void => {
			class DummyStorage extends ContextualStorage {}

			const STORAGE: ContextualStorage = new DummyStorage();

			const WRAPPER = (): void => {
				STORAGE.getContextualItem(Date);
			};

			throws(WRAPPER, createErrorTest());
		});
	});

	describe("setContextualItem", (): void => {
		it("should keep an item in the storage.", (): void => {
			class DummyStorage extends ContextualStorage {}

			const STORAGE: ContextualStorage = new DummyStorage();
			const DATE: Date = new Date();

			STORAGE.setContextualItem(Date, DATE);

			deepStrictEqual(STORAGE["contextualItems"], new Map([[Date, DATE]]));
		});

		it("should throw when given an invalid item.", (): void => {
			class DummyStorage extends ContextualStorage {}

			const STORAGE: ContextualStorage = new DummyStorage();

			const WRAPPER = (): void => {
				// @ts-expect-error: Erroneous value for testing purposes.
				STORAGE.setContextualItem(Date, {});
			};

			throws(WRAPPER, createErrorTest());
		});
	});

	describe("removeContextualItem", (): void => {
		it("should remove an item in the storage.", (): void => {
			class DummyStorage extends ContextualStorage {}

			const STORAGE: ContextualStorage = new DummyStorage();

			ReflectUtility.Set(STORAGE, "contextualItems", new Map([[Date, new Date()]]));

			STORAGE.removeContextualItem(Date);

			deepStrictEqual(STORAGE["contextualItems"], new Map());
		});

		it("should do nothing if the item is not there.", (): void => {
			class DummyStorage extends ContextualStorage {}

			const STORAGE: ContextualStorage = new DummyStorage();

			const WRAPPER = (): void => {
				STORAGE.removeContextualItem(Date);
			};

			doesNotThrow(WRAPPER);
		});
	});

	describe("clearContextualItems", (): void => {
		it("should remove all items in the storage.", (): void => {
			class DummyStorage extends ContextualStorage {}

			const STORAGE: ContextualStorage = new DummyStorage();

			ReflectUtility.Set(STORAGE, "contextualItems", new Map([[Date, new Date()]]));

			STORAGE.clearContextualItems();

			deepStrictEqual(STORAGE["contextualItems"], new Map());
		});
	});
});
