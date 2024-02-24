import { type Dirent , type ReadStream, type Stats, createReadStream } from "node:fs";

import { type FileHandle, open, readFile, readdir, stat } from "node:fs/promises";

import { dirname } from "node:path";

import { fileURLToPath } from "node:url";

import type { FileSystemErrorInterface } from "./file-system/FileSystemErrorInterface.mjs";


class FileSystemService
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
	 * ComputeRootDirectory
	 */
	public static ComputeRootDirectory(): string
	{
		const FILE_PATH: string = fileURLToPath(import.meta.url);

		const GRANDPARENT_DIRECTORY: string = dirname(dirname(FILE_PATH));

		return GRANDPARENT_DIRECTORY;
	}

	/**
	 * FileExists
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
			if (FileSystemService.IsFileSystemError(error))
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

	public static async DirectoryExists(directory_path: string): Promise<boolean>
	{
		try
		{
			const STAT: Stats = await stat(directory_path);

			return STAT.isDirectory();
		}
		catch (error: unknown)
		{
			if (FileSystemService.IsFileSystemError(error))
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
	 * ReadFile
	 */
	public static async ReadFile(file_path: string): Promise<Buffer | string>
	{
		const EXISTS: boolean = await FileSystemService.FileExists(file_path);

		if (!EXISTS)
		{
			throw new Error(`Requested file ${file_path} does not exists.`);
		}

		const FILE: Buffer | string = await readFile(file_path);

		return FILE;
	}

	/**
	 * ReadFileAsBuffer
	 */
	public static async ReadFileAsBuffer(file_path: string): Promise<Buffer>
	{
		const FILE: Buffer | string = await FileSystemService.ReadFile(file_path);

		if (typeof FILE === "string")
		{
			return Buffer.from(FILE);
		}

		return FILE;
	}

	public static ReadFileAsStream(file_path: string): ReadStream
	{
		const STREAM: ReadStream = createReadStream(file_path);

		return STREAM;
	}

	/**
	 * ReadTextFile
	 */
	public static async ReadTextFile(file_path: string): Promise<string>
	{
		const EXISTS: boolean = await FileSystemService.FileExists(file_path);

		if (!EXISTS)
		{
			throw new Error(`Requested file ${file_path} does not exists.`);
		}

		const FILE: string = await readFile(file_path, { encoding: "utf-8" });

		return FILE;
	}

	/**
	 * OpenFile
	 */
	public static async OpenFile(file_path: string, flags: string): Promise<FileHandle>
	{
		const EXISTS: boolean = await FileSystemService.FileExists(file_path);

		if (!EXISTS)
		{
			throw new Error(`Requested file ${file_path} does not exists.`);
		}

		const FILE: FileHandle = await open(file_path, flags);

		return FILE;
	}

	/**
	 * ReadDirectory
	 */
	public static async ReadDirectory(directory: string): Promise<Array<Dirent>>
	{
		return await readdir(directory, { encoding: "utf-8", withFileTypes: true });
	}
}

export { FileSystemService };
