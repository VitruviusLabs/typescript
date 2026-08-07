import { doesNotThrow, strictEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { Singleton } from "../../src/_index.mjs";

describe("Singleton", (): void => {
	describe("constructor", (): void => {
		it("should create an instance of the Singleton class and add it to the internal map.", (): void => {
			class MySingleton extends Singleton {}

			const INSTANCE_1: MySingleton = new MySingleton();

			const INSTANCE_2: MySingleton | undefined = MySingleton.GetInstance();

			strictEqual(INSTANCE_1, INSTANCE_2);
		});

		it("should throw an error when the constructor is called more than once.", (): void => {
			class MySingleton extends Singleton {}

			const WRAPPER = (): void => {
				new MySingleton();
			};

			doesNotThrow(WRAPPER);

			throws(WRAPPER, createErrorTest());
		});
	});

	describe("HasInstance", (): void => {
		it("should return false if there is no instance of the singleton class.", (): void => {
			class MySingleton extends Singleton {}

			strictEqual(MySingleton.HasInstance(), false);
		});

		it("should return true if there is an instance of the singleton class.", (): void => {
			class MySingleton extends Singleton {}

			new MySingleton();

			strictEqual(MySingleton.HasInstance(), true);
		});
	});

	describe("GetInstance", (): void => {
		it("should throw if there is no instance of the singleton class.", (): void => {
			class MySingleton extends Singleton {}

			const WRAPPER = (): void => {
				MySingleton.GetInstance();
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should throw if there is no instance of the singleton class.", (): void => {
			class MySingleton extends Singleton
			{
				public constructor()
				{
					super();
				}
			}

			const WRAPPER = (): void => {
				MySingleton.GetInstance();
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should return the instance of the singleton class.", (): void => {
			class MySingleton extends Singleton {}

			const INSTANCE_1: MySingleton = new MySingleton();

			const INSTANCE_2: MySingleton = MySingleton.GetInstance();

			strictEqual(INSTANCE_1, INSTANCE_2);
		});
	});

	describe("FindInstance", (): void => {
		it("should return undefined if there is no instance of the singleton class.", (): void => {
			class MySingleton extends Singleton {}

			strictEqual(MySingleton.FindInstance(), undefined);
		});

		it("should return the instance of the singleton class.", (): void => {
			class MySingleton extends Singleton {}

			const INSTANCE_1: MySingleton = new MySingleton();

			const INSTANCE_2: MySingleton | undefined = MySingleton.FindInstance();

			strictEqual(INSTANCE_1, INSTANCE_2);
		});
	});

	describe("RemoveInstance", (): void => {
		it("should remove the instance of the singleton class.", (): void => {
			class MySingleton extends Singleton {}

			new MySingleton();

			MySingleton.RemoveInstance();

			const INSTANCE: MySingleton | undefined = MySingleton.FindInstance();

			strictEqual(INSTANCE, undefined);
		});

		it("should do nothing if there is no instance of the singleton class.", (): void => {
			class MySingleton extends Singleton {}

			MySingleton.RemoveInstance();

			const INSTANCE: MySingleton | undefined = MySingleton.FindInstance();

			strictEqual(INSTANCE, undefined);
		});
	});
});
