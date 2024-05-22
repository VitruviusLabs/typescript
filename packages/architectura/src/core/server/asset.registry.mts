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
	public static GetPublicDirectories(): ReadonlyMap<string, string>
	{
		return this.PUBLIC_DIRECTORIES;
	}

	/**
	 * Add a public directory to the asset registry.
	 *
	 * @remarks
	 * Match a public directory with a URL path start.
	 * Take precedence over endpoints if a matching file is found.
	 * If a file is not found, an attempt to match the request with an endpoint will still be made.
	 */
	public static async AddPublicDirectory(url_path_start: string, base_directory_path: string): Promise<void>
	{
		await FileSystemService.AssertDirectoryExistence(base_directory_path);

		this.PUBLIC_DIRECTORIES.set(
			url_path_start.replace(/\/$/, ""),
			base_directory_path.replace(/\/$/, "")
		);
	}
}

export { AssetRegistry };
