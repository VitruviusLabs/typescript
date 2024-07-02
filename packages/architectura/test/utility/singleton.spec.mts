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

			const INSTANCE_2: MySingleton | undefined = MySingleton.GetInstance(MySingleton);

			strictEqual(INSTANCE, INSTANCE_2);
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

	describe("HasInstance", (): void => {
		it("should return false if there is no instance of the singleton class.", (): void => {
			class MySingleton extends Singleton
			{
				public constructor()
				{
					super();
				}
			}

			strictEqual(MySingleton.HasInstance(MySingleton), false);
		});

		it("should return true if there is an instance of the singleton class.", (): void => {
			class MySingleton extends Singleton
			{
				public constructor()
				{
					super();
				}
			}

			new MySingleton();

			strictEqual(MySingleton.HasInstance(MySingleton), true);
		});
	});

	describe("GetInstance", (): void => {
		it("should throw if there is no instance of the singleton class.", (): void => {
			class MySingleton extends Singleton
			{
				public constructor()
				{
					super();
				}
			}

			const WRAPPER = (): void => {
				MySingleton.GetInstance(MySingleton);
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should throw if there is no instance of the singleton class.", (): void => {
			const WRAPPER = (): void => {
				Singleton.GetInstance(class {});
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should return the instance of the singleton class.", (): void => {
			class MySingleton extends Singleton
			{
				public constructor()
				{
					super();
				}
			}

			const INSTANCE: MySingleton = new MySingleton();

			const INSTANCE_2: MySingleton | undefined = MySingleton.GetInstance(MySingleton);

			strictEqual(INSTANCE, INSTANCE_2);
		});
	});

	describe("FindInstance", (): void => {
		it("should return undefined if there is no instance of the singleton class.", (): void => {
			class MySingleton extends Singleton
			{
				public constructor()
				{
					super();
				}
			}

			strictEqual(MySingleton.FindInstance(MySingleton), undefined);
		});

		it("should return the instance of the singleton class.", (): void => {
			class MySingleton extends Singleton
			{
				public constructor()
				{
					super();
				}
			}

			const INSTANCE: MySingleton = new MySingleton();

			const INSTANCE_2: MySingleton | undefined = MySingleton.FindInstance(MySingleton);

			strictEqual(INSTANCE, INSTANCE_2);
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

			const INSTANCE_2: MySingleton | undefined = MySingleton.FindInstance(MySingleton);

			strictEqual(INSTANCE_2, undefined);
		});
	});
});
