import { FileSystemService } from "../../service/file-system/file-system.service.mjs";

/**
 * Asset registry.
 *
 * @sealed
 */
class AssetRegistry
{
	private static readonly PUBLIC_DIRECTORIES: Map<string, string> = new Map();

	/**
	 * Retrieve the list of public directories
	 *
	 * @internal
	 */
	public static async FindPublicAsset(request_path: string): Promise<string | undefined>
	{
		// Hidden directories or files are inaccessible
		// Also prevents directory traversal attacks
		if (!request_path.startsWith("/") || request_path.includes("/."))
		{
			return undefined;
		}

		for (const [URL_PATH, DIRECTORY_PATH] of AssetRegistry.PUBLIC_DIRECTORIES)
		{
			if (request_path.startsWith(URL_PATH))
			{
				const ASSET_PATH: string = DIRECTORY_PATH + request_path.slice(URL_PATH.length);

				if (await FileSystemService.FileExists(ASSET_PATH))
				{
					return ASSET_PATH;
				}
			}
		}

		return undefined;
	}

	/**
	 * Add a public directory to the asset registry.
	 *
	 * @remarks
	 * Match a public directory with a URL path start.
	 * Take precedence over endpoints if a matching file is found.
	 * If a file is not found, an attempt to match the request with an endpoint will still be made.
	 */
	public static async AddPublicDirectory(url_path: string, directory_path: string): Promise<void>
	{
		await FileSystemService.AssertDirectoryExistence(directory_path);

		this.PUBLIC_DIRECTORIES.set(
			url_path.replace(/\/$/, ""),
			directory_path.replace(/\/$/, "")
		);
	}
}

export { AssetRegistry };
