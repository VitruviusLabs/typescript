import { type Dirent , type ReadStream, type Stats, createReadStream } from "node:fs";

import { type FileHandle, open, readFile, readdir, stat } from "node:fs/promises";

import { dirname } from "node:path";

import { fileURLToPath } from "node:url";

import type { FileSystemErrorInterface } from "./FileSystem/FileSystemErrorInterface.mjs";

/**
 * This class is a helper class for file system operations.
 *
 * @remarks
 *
 * It allows for easy file system operations such as checking if a file exists, reading a file, and reading a directory.
 * It also handles file system errors that have an incorrect typing in the Node.js core.
 * This is because Node.js hijacks the `Error` class and adds a `code` property to it.
 */
class FileSystem
{
	/**
	 * IsFileSystemError
	 */
	public static IsFileSystemError(error: unknown): error is FileSystemErrorInterface
	{
		// @ts-ignore
		return (error instanceof Error) && (typeof error.code === "string");
	}

	/**
	 * This method will calculate the root directory for the Architectura project.
	 * Do **NOT** use this method for your own project.
	 * It will **NOT** calculate the root directory for your project.
	 *
	 * @remarks
	 * The root directory is calculated by using the `import.meta.url` to get the current file path.
	 * The root directory is either `src` for development or `dist` for production.
	 *
	 * @returns The root directory for the Architectura project.
	 */
	public static ComputeRootDirectory(): string
	{
		const FILE_PATH: string = fileURLToPath(import.meta.url);

		const GRANDPARENT_DIRECTORY: string = dirname(dirname(FILE_PATH));

		return GRANDPARENT_DIRECTORY;
	}

	/**
	 * A helper method to check if a file exists.
	 *
	 * @remarks
	 * This method is asynchronous. It will check if a file exists by using the `fs.promises.stat` method.
	 * Please note the following:
	 * - If the file does not exist, the promise will resolve to `false`.
	 * - If the file exists but the reader got denied permissions, the promise will resolve to `false`.
	 * - If the file exists and the reader has permissions, the promise will resolve to `true`.
	 * - In case of an unhandled error, the promise will resolve to `false`.
	 *
	 * @param file_path - The path to the file.
	 *
	 * @returns A promise that resolves to a boolean indicating if the file exists.
	 */
	public static async FileExists(file_path: string): Promise<boolean>
	{
		try
		{
			const STAT: Stats = await stat(file_path);

			return STAT.isFile();
		}
		catch (error: unknown)
		{
			if (FileSystem.IsFileSystemError(error))
			{
				switch (error.code)
				{
					case "ENOENT":
						return false;

					case "EACCES":
						// @TODO: Remove the use to console.
						// eslint-disable-next-line no-console -- This is a WIP.
						console.log(`Requested file ${file_path} cannot be loaded. File exists but reader got denied permissions. Error code: EACCES.`);

						return false;

					default:
						// @TODO: Remove the use to console.
						// eslint-disable-next-line no-console -- This is a WIP.
						console.log(`Requested file ${file_path} could not be loaded due to an unhandled error. Error code: ${error.code}.`);

						return false;
				}
			}
		}

		return false;
	}

	/**
	 * A helper method to check if a directory exists.
	 *
	 * @remarks
	 * This method is asynchronous. It will check if a directory exists by using the `fs.promises.stat` method.
	 * Please note the following:
	 * - If the directory does not exist, the promise will resolve to `false`.
	 * - If the directory exists but the reader got denied permissions, the promise will resolve to `false`.
	 * - If the directory exists and the reader has permissions, the promise will resolve to `true`.
	 * - In case of an unhandled error, the promise will resolve to `false`.
	 *
	 * @param directory_path - The path to the directory.
	 * @returns A promise that resolves to a boolean indicating if the directory exists.
	 */
	public static async DirectoryExists(directory_path: string): Promise<boolean>
	{
		try
		{
			const STAT: Stats = await stat(directory_path);

			return STAT.isDirectory();
		}
		catch (error: unknown)
		{
			if (FileSystem.IsFileSystemError(error))
			{
				switch (error.code)
				{
					case "ENOENT":
						return false;

					case "EACCES":
						// @TODO: Remove the use to console.
						// eslint-disable-next-line no-console -- This is a WIP.
						console.log(`Requested file ${directory_path} cannot be loaded. File exists but reader got denied permissions. Error code: EACCES.`);

						return false;

					default:
						// @TODO: Remove the use to console.
						// eslint-disable-next-line no-console -- This is a WIP.
						console.log(`Requested file ${directory_path} could not be loaded due to an unhandled error. Error code: ${error.code}.`);

						return false;
				}
			}
		}

		return false;
	}

	/**
	 * This method is a helper to read a file as Buffer or string.
	 *
	 * @remarks
	 * This method is asynchronous. It will read a file as Buffer or string by using the `fs.promises.readFile` method.
	 *
	 * @param file_path - The path to the file.
	 * @throws It will throw an Error if the file does not exist.
	 * @returns A promise that resolves to a Buffer or string.
	 */
	public static async ReadFile(file_path: string): Promise<Buffer | string>
	{
		const EXISTS: boolean = await FileSystem.FileExists(file_path);

		if (!EXISTS)
		{
			throw new Error(`Requested file ${file_path} does not exists.`);
		}

		const FILE: Buffer | string = await readFile(file_path);

		return FILE;
	}

	/**
	 * This method is a helper to read a file as Buffer.
	 *
	 * @remarks
	 * This method is asynchronous. It will read a file as Buffer by using the `fs.promises.readFile` method.
	 * If the file is a string, it will convert it to a Buffer.
	 *
	 * @param file_path - The path to the file.
	 * @throws It will throw an Error if the file does not exist.
	 * @returns A promise that resolves to a Buffer.
	 */
	public static async ReadFileAsBuffer(file_path: string): Promise<Buffer>
	{
		const FILE: Buffer | string = await FileSystem.ReadFile(file_path);

		if (typeof FILE === "string")
		{
			return Buffer.from(FILE);
		}

		return FILE;
	}

	/**
	 * This method is a helper to read a file as a ReadStream.
	 *
	 * @remarks
	 * This method is synchronous. It will read a file as a ReadStream by using the `fs.createReadStream` method.
	 *
	 * @param file_path - The path to the file.
	 * @returns A ReadStream.
	 */
	public static ReadFileAsStream(file_path: string): ReadStream
	{
		const STREAM: ReadStream = createReadStream(file_path);

		return STREAM;
	}

	/**
	 * This method is a helper to read a file as string.
	 *
	 * @remarks
	 * This method is asynchronous. It will read a file as string by using the `fs.promises.readFile` method.
	 * Please note that this method will read the file as a string using the `utf-8` encoding.
	 *
	 * @param file_path - The path to the file.
	 * @throws It will throw an Error if the file does not exist.
	 * @returns A promise that resolves to a string.
	 */
	public static async ReadTextFile(file_path: string): Promise<string>
	{
		const EXISTS: boolean = await FileSystem.FileExists(file_path);

		if (!EXISTS)
		{
			throw new Error(`Requested file ${file_path} does not exists.`);
		}

		const FILE: string = await readFile(file_path, { encoding: "utf-8" });

		return FILE;
	}

	/**
	 * This method is a helper to open a file.
	 *
	 * @remarks
	 * This method is asynchronous. It will open a file by using the `fs.promises.open` method.
	 * Please note that this method will throw an Error if the file does not exist.
	 *
	 * @param file_path - The path to the file.
	 * @param flags - The flags to use when opening the file.
	 * @throws It will throw an Error if the file does not exist.
	 * @returns A promise that resolves to a FileHandle.
	 */
	public static async OpenFile(file_path: string, flags: number | string): Promise<FileHandle>
	{
		const EXISTS: boolean = await FileSystem.FileExists(file_path);

		if (!EXISTS)
		{
			throw new Error(`Requested file ${file_path} does not exists.`);
		}

		const FILE: FileHandle = await open(file_path, flags);

		return FILE;
	}

	/**
	 * This method is a helper to read a directory.
	 *
	 * @remarks
	 * This method is asynchronous. It will read a directory by using the `fs.promises.readdir` method.
	 * Please note that this method will return an array of Dirent objects.
	 *
	 * @param directory - The path to the directory.
	 * @throws It will throw an Error if the directory does not exist.
	 * @returns A promise that resolves to an array of Dirent objects.
	 */
	public static async ReadDirectory(directory: string): Promise<Array<Dirent>>
	{
		const EXISTS: boolean = await FileSystem.DirectoryExists(directory);

		if (!EXISTS)
		{
			throw new Error(`Requested directory ${directory} does not exists.`);
		}

		return await readdir(directory, { encoding: "utf-8", withFileTypes: true });
	}
}

export { FileSystem };
