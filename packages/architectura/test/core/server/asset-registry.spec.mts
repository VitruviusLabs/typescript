import { afterEach, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, rejects } from "node:assert";
import { stub } from "sinon";
import { AssetRegistry, FileSystemService } from "../../../src/_index.mjs";
import { createErrorTest } from "@vitruvius-labs/testing-ground";

describe("AssetRegistry", (): void => {
	beforeEach((): void => {
		// @ts-expect-error: Access to private property for testing purposes.
		AssetRegistry.PUBLIC_DIRECTORIES.clear();
	});

	afterEach((): void => {
		// @ts-expect-error: Access to private property for testing purposes.
		AssetRegistry.PUBLIC_DIRECTORIES.clear();
	});

	describe("GetPublicDirectories", (): void => {
		it("should return the public directories", (): void => {
			// @ts-expect-error: Access to private property for testing purposes.
			AssetRegistry.PUBLIC_DIRECTORIES.set("/lorem-ipsum", "/foo/bar");

			deepStrictEqual(AssetRegistry.GetPublicDirectories(), new Map([["/lorem-ipsum", "/foo/bar"]]));
		});
	});

	describe("AddPublicDirectory", (): void => {
		beforeEach((): void => {
			// @ts-expect-error: Access to private property for testing purposes.
			AssetRegistry.PUBLIC_DIRECTORIES.clear();
			stub(FileSystemService, "AssertDirectoryExistence");
		});

		afterEach((): void => {
			// @ts-expect-error: Access to private property for testing purposes.
			AssetRegistry.PUBLIC_DIRECTORIES.clear();
			// @ts-expect-error: Restore stubbed function.
			FileSystemService.AssertDirectoryExistence.restore();
		});

		it("should keep the public directory", async (): Promise<void> => {
			await AssetRegistry.AddPublicDirectory("/lorem-ipsum", "/foo/bar");

			// @ts-expect-error: Access to private property for testing purposes.
			deepStrictEqual(AssetRegistry.PUBLIC_DIRECTORIES, new Map([["/lorem-ipsum", "/foo/bar"]]));
		});

		it("should throw if the directory doesn't exist", (): void => {
			const ERROR: Error = new Error("Impossible to find directory /foo/bar, check that the directory exists, it's readable, and the path is correct.");

			// @ts-expect-error: Restore stubbed function.
			FileSystemService.AssertDirectoryExistence.throws(ERROR);

			const WRAPPER = async (): Promise<void> => {
				await AssetRegistry.AddPublicDirectory("/lorem-ipsum", "/foo/bar");
			};

			rejects(WRAPPER, createErrorTest());
		});
	});
});

export { AssetRegistry };
