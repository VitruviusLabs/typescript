import { doesNotThrow, strictEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { Singleton } from "../../src/_index.mjs";

describe("Singleton", (): void => {
	describe("constructor", (): void => {
		it("should create an instance of the Singleton class and add it to the internal map.", (): void => {
			class MySingleton extends Singleton
			{
				public constructor()
				{
					super();
				}
			}

			const INSTANCE: MySingleton = new MySingleton();

			const INSTANCE2: MySingleton | undefined = MySingleton.GetInstance(MySingleton);

			strictEqual(INSTANCE, INSTANCE2);
		});

		it("should throw an error when the constructor is called more than once.", (): void => {
			class MySingleton extends Singleton
			{
				public constructor()
				{
					super();
				}
			}

			const WRAPPER = (): void => {
				new MySingleton();
			};

			doesNotThrow(WRAPPER);

			throws(WRAPPER, createErrorTest());
		});
	});

	describe("GetInstance", (): void => {
		it("should return the instance of the singleton class.", (): void => {
			class MySingleton extends Singleton
			{
				public constructor()
				{
					super();
				}
			}

			const INSTANCE: MySingleton = new MySingleton();

			const INSTANCE2: MySingleton | undefined = MySingleton.GetInstance(MySingleton);

			strictEqual(INSTANCE, INSTANCE2);
		});
	});

	describe("RemoveInstance", (): void => {
		it("should remove the instance of the singleton class.", (): void => {
			class MySingleton extends Singleton
			{
				public constructor()
				{
					super();
				}
			}

			new MySingleton();

			MySingleton.RemoveInstance(MySingleton);

			const INSTANCE2: MySingleton | undefined = MySingleton.FindInstance(MySingleton);

			strictEqual(INSTANCE2, undefined);
		});
	});
});
