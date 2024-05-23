import { type Dirent, type ReadStream, type Stats, createReadStream } from "node:fs";
import { type FileHandle, open, readFile, readdir, stat } from "node:fs/promises";
import { LoggerProxy } from "../../service/logger/logger.proxy.mjs";
import { isErrorWithCode } from "../../predicate/is-error-with-code.mjs";
import { isString } from "@vitruvius-labs/ts-predicate/type-guard";

/**
 * Service for interacting with the file system
 *
 * @sealed
 */
class FileSystemService
{
	/**
	 * Check if a directory exists
	 */
	public static async DirectoryExists(directory_path: string): Promise<boolean>
	{
		const STAT: Stats | undefined = await FileSystemService.GetStats(directory_path);

		if (STAT === undefined)
		{
			return false;
		}

		return STAT.isDirectory();
	}

	/**
	 * Assert that a directory exists
	 *
	 * @throws if the directory does not exist
	 */
	public static async AssertDirectoryExistence(directory_path: string): Promise<void>
	{
		if (!await FileSystemService.DirectoryExists(directory_path))
		{
			throw new Error(`Impossible to find directory ${directory_path}, check that the directory exists, it's readable, and the path is correct.`);
		}
	}

	/**
	 * List the children entities of a directory
	 */
	public static async ReadDirectory(directory: string): Promise<Array<Dirent>>
	{
		return await readdir(directory, { encoding: "utf-8", withFileTypes: true });
	}

	/**
	 * Check if a file exists
	 */
	public static async FileExists(file_path: string): Promise<boolean>
	{
		const STAT: Stats | undefined = await FileSystemService.GetStats(file_path);

		if (STAT === undefined)
		{
			return false;
		}

		return STAT.isFile();
	}

	/**
	 * Assert that a file exists
	 *
	 * @throws if the file does not exist
	 */
	public static async AssertFileExistence(file_path: string): Promise<void>
	{
		if (!await FileSystemService.FileExists(file_path))
		{
			throw new Error(`Impossible to find file ${file_path}, check that the file exists, it's readable, and the path is correct.`);
		}
	}

	/**
	 * Create a read stream for a file
	 */
	public static ReadFileAsStream(file_path: string): ReadStream
	{
		const STREAM: ReadStream = createReadStream(file_path);

		return STREAM;
	}

	/**
	 * Read the content of a file as a buffer
	 *
	 * @throws if the file does not exist
	 */
	public static async ReadBinaryFile(file_path: string): Promise<Buffer>
	{
		await FileSystemService.AssertFileExistence(file_path);

		const FILE: Buffer | string = await readFile(file_path);

		if (isString(FILE))
		{
			return Buffer.from(FILE);
		}

		return FILE;
	}

	/**
	 * Read the content of a file as a string
	 *
	 * @throws if the file does not exist
	 */
	public static async ReadTextFile(file_path: string): Promise<string>
	{
		await FileSystemService.AssertFileExistence(file_path);

		const FILE: string = await readFile(file_path, { encoding: "utf-8" });

		return FILE;
	}

	/**
	 * Create a file handle
	 *
	 * @throws if the file does not exist
	 */
	public static async OpenFile(file_path: string, flags: string): Promise<FileHandle>
	{
		await FileSystemService.AssertFileExistence(file_path);

		const FILE: FileHandle = await open(file_path, flags);

		return FILE;
	}

	/**
	 * Get the informations of a file
	 *
	 * @remarks
	 * Returns undefined if the file does not exist or is not readable.
	 */
	public static async GetStats(path: string): Promise<Stats | undefined>
	{
		try
		{
			return await stat(path);
		}
		catch (error: unknown)
		{
			if (isErrorWithCode(error))
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
			else
			{
				LoggerProxy.Error(error);
			}

			return undefined;
		}
	}

	/**
	 * Import a module
	 *
	 * @remarks
	 * This dynamic import proxy method allows mocking dynamic imports in your tests.
	 */
	public static async Import(path: string): Promise<unknown>
	{
		const MODULE: unknown = await import(path);

		return MODULE;
	}
}

export { FileSystemService };
