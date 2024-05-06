import { type Dirent, type ReadStream, type Stats, createReadStream } from "node:fs";
import { type FileHandle, open, readFile, readdir, stat } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { hasProperty, isInstanceOf, isString } from "@vitruvius-labs/ts-predicate/type-guard";
import type { FileSystemErrorInterface } from "./definition/interface/file-system-error.interface.mjs";
import { LoggerProxy } from "../_index.mjs";

class FileSystemService
{
	public static IsFileSystemError(error: unknown): error is FileSystemErrorInterface
	{
		return (
			isInstanceOf(error, Error)
			&& hasProperty(error, "code")
			&& isString(error.code)
		);
	}

	public static ComputeRootDirectory(): string
	{
		const FILE_PATH: string = fileURLToPath(import.meta.url);

		const GRANDPARENT_DIRECTORY: string = dirname(dirname(FILE_PATH));

		return GRANDPARENT_DIRECTORY;
	}

	public static async DirectoryExists(directory_path: string): Promise<boolean>
	{
		const STAT: Stats | undefined = await FileSystemService.GetStats(directory_path);

		if (STAT === undefined)
		{
			return false;
		}

		return STAT.isDirectory();
	}

	public static async ConfirmDirectoryExistence(directory_path: string): Promise<void>
	{
		if (!await FileSystemService.DirectoryExists(directory_path))
		{
			throw new Error(`Impossible to find directory ${directory_path}, check that the directory exists, it's readable, and the path is correct.`);
		}
	}

	public static async ReadDirectory(directory: string): Promise<Array<Dirent>>
	{
		return await readdir(directory, { encoding: "utf-8", withFileTypes: true });
	}

	public static async FileExists(file_path: string): Promise<boolean>
	{
		const STAT: Stats | undefined = await FileSystemService.GetStats(file_path);

		if (STAT === undefined)
		{
			return false;
		}

		return STAT.isFile();
	}

	public static async ConfirmFileExistence(file_path: string): Promise<void>
	{
		if (!await FileSystemService.FileExists(file_path))
		{
			throw new Error(`Impossible to find file ${file_path}, check that the file exists, it's readable, and the path is correct.`);
		}
	}

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

	private static async GetStats(path: string): Promise<Stats | undefined>
	{
		try
		{
			return await stat(path);
		}
		catch (error: unknown)
		{
			if (FileSystemService.IsFileSystemError(error))
			{
				switch (error.code)
				{
					case "ENOENT":
						break;

					case "EACCES":
						LoggerProxy.Warning(`Requested file ${path} cannot be loaded. File exists but reader got denied permissions. Error code: EACCES.`);
						break;

					default:
						LoggerProxy.Warning(`Requested file ${path} could not be loaded due to an unhandled error. Error code: ${error.code}.`);
				}
			}

			return undefined;
		}
	}
}

export { FileSystemService };
