import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, doesNotReject, rejects, strictEqual } from "node:assert";
import { type SinonStub, stub } from "sinon";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { ReflectUtility, instanceOf } from "@vitruvius-labs/toolbox";
import { AssetRegistry, FileSystemService } from "../../../src/_index.mjs";

describe("AssetRegistry", (): void => {
	const FILE_EXISTS_STUB: SinonStub = stub(FileSystemService, "FileExists");
	const ASSERT_DIRECTORY_EXISTENCE_STUB: SinonStub = stub(FileSystemService, "AssertDirectoryExistence");
	const DIRECTORY_MAP: Map<string, string> = Reflect.get(AssetRegistry, "PUBLIC_DIRECTORIES");

	beforeEach((): void => {
		FILE_EXISTS_STUB.reset();
		ASSERT_DIRECTORY_EXISTENCE_STUB.reset();
		DIRECTORY_MAP.clear();
	});

	after((): void => {
		FILE_EXISTS_STUB.restore();
		ASSERT_DIRECTORY_EXISTENCE_STUB.restore();
		DIRECTORY_MAP.clear();
	});

	describe("FindPublicAsset", (): void => {
		it("should return undefined if there is no match", async (): Promise<void> => {
			const RESULT: unknown = AssetRegistry.FindPublicAsset("/picture.png");

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, undefined);
		});

		it("should return undefined if there is a match but no file exists", async (): Promise<void> => {
			FILE_EXISTS_STUB.resolves(false);
			DIRECTORY_MAP.set("/alpha-omega", "/delta");

			const RESULT: unknown = AssetRegistry.FindPublicAsset("/alpha-omega/epsilon/picture.png");

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, undefined);
		});

		it("should return the corresponding public asset path", async (): Promise<void> => {
			FILE_EXISTS_STUB.resolves(true);
			DIRECTORY_MAP.set("/lorem-ipsum", "/foo/bar");
			DIRECTORY_MAP.set("/alpha-omega", "/delta");

			const RESULT_1: unknown = AssetRegistry.FindPublicAsset("/lorem-ipsum/picture.png");
			const RESULT_2: unknown = AssetRegistry.FindPublicAsset("/alpha-omega/epsilon/picture.png");

			instanceOf(RESULT_1, Promise);
			await doesNotReject(RESULT_1);
			strictEqual(await RESULT_1, "/foo/bar/picture.png");

			instanceOf(RESULT_2, Promise);
			await doesNotReject(RESULT_2);
			strictEqual(await RESULT_2, "/delta/epsilon/picture.png");
		});

		it("should ignore hidden folders and files", async (): Promise<void> => {
			FILE_EXISTS_STUB.resolves(true);
			DIRECTORY_MAP.set("/lorem-ipsum", "/foo/bar");
			DIRECTORY_MAP.set("/alpha-omega", "/delta");

			const RESULT_1: unknown = AssetRegistry.FindPublicAsset("/lorem-ipsum/.picture.png");
			const RESULT_2: unknown = AssetRegistry.FindPublicAsset("/alpha-omega/.epsilon/picture.png");

			instanceOf(RESULT_1, Promise);
			await doesNotReject(RESULT_1);
			strictEqual(await RESULT_1, undefined);

			instanceOf(RESULT_2, Promise);
			await doesNotReject(RESULT_2);
			strictEqual(await RESULT_2, undefined);
		});
	});

	describe("AddPublicDirectory", (): void => {
		it("should keep the public directory", async (): Promise<void> => {
			await AssetRegistry.AddPublicDirectory("/lorem-ipsum", "/foo/bar");

			ASSERT_DIRECTORY_EXISTENCE_STUB.resolves();

			deepStrictEqual(ReflectUtility.Get(AssetRegistry, "PUBLIC_DIRECTORIES"), new Map([["/lorem-ipsum", "/foo/bar"]]));
		});

		it("should throw if the directory doesn't exist", (): void => {
			ASSERT_DIRECTORY_EXISTENCE_STUB.rejects();

			const WRAPPER = async (): Promise<void> => {
				await AssetRegistry.AddPublicDirectory("/lorem-ipsum", "/foo/bar");
			};

			rejects(WRAPPER, createErrorTest());
		});
	});
});

export { AssetRegistry };
