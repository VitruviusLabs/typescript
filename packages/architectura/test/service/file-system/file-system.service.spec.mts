import { describe, it } from "node:test";
import { FileSystemService } from "../../../src/_index.mjs";

describe("FileSystemService", (): void => {
	describe("DirectoryExists", (): void => {
		it.skip("should return false if the path doesn't lead to any entity", async (): Promise<void> => {
			await FileSystemService.DirectoryExists("");
		});

		it.skip("should return false if the entity found is not a directory", async (): Promise<void> => {
			await FileSystemService.DirectoryExists("");
		});

		it.skip("should return true if the entity found is a directory", async (): Promise<void> => {
			await FileSystemService.DirectoryExists("");
		});
	});

	describe("AssertDirectoryExistence", (): void => {
		it.skip("should throw if the path doesn't lead to any entity", async (): Promise<void> => {
			await FileSystemService.AssertDirectoryExistence("");
		});

		it.skip("should throw if the entity found is not a directory", async (): Promise<void> => {
			await FileSystemService.AssertDirectoryExistence("");
		});

		it.skip("should return if the entity found is a directory", async (): Promise<void> => {
			await FileSystemService.AssertDirectoryExistence("");
		});
	});

	describe("ReadDirectory", (): void => {
		it.skip("should return the list of directory's children entities", async (): Promise<void> => {
			await FileSystemService.ReadDirectory("");
		});
	});

	describe("FileExists", (): void => {
		it.skip("should return false if the path doesn't lead to any entity", async (): Promise<void> => {
			await FileSystemService.FileExists("");
		});

		it.skip("should return false if the entity found is not a file", async (): Promise<void> => {
			await FileSystemService.FileExists("");
		});

		it.skip("should return true if the entity found is a file", async (): Promise<void> => {
			await FileSystemService.FileExists("");
		});
	});

	describe("AssertFileExistence", (): void => {
		it.skip("should throe if the path doesn't lead to any entity", async (): Promise<void> => {
			await FileSystemService.AssertFileExistence("");
		});

		it.skip("should throe if the entity found is not a file", async (): Promise<void> => {
			await FileSystemService.AssertFileExistence("");
		});

		it.skip("should return if the entity found is a file", async (): Promise<void> => {
			await FileSystemService.AssertFileExistence("");
		});
	});

	describe("ReadFileAsStream", (): void => {
		it.skip("should return a readable stream of the file", (): void => {
			FileSystemService.ReadFileAsStream("");
		});
	});

	describe("ReadBinaryFile", (): void => {
		it.skip("should resolves to a Buffer with the file content", async (): Promise<void> => {
			await FileSystemService.ReadBinaryFile("");
		});
	});

	describe("ReadTextFile", (): void => {
		it.skip("should resolves to a string with the file content", async (): Promise<void> => {
			await FileSystemService.ReadTextFile("");
		});
	});

	describe("OpenFile", (): void => {
		it.skip("should resolves to a file handle", async (): Promise<void> => {
			await FileSystemService.OpenFile("", "r");
		});
	});

	describe("GetStats", (): void => {
		it.skip("should resolves to undefined if the entity doesn't exists", async (): Promise<void> => {
			await FileSystemService.GetStats("");
		});

		it.skip("should resolves to a Stat object if the entity exists", async (): Promise<void> => {
			await FileSystemService.GetStats("");
		});
	});

	describe("Import", (): void => {
		it.skip("should resolve to the exports of the module", async (): Promise<void> => {
			await FileSystemService.Import("");
		});
	});
});
