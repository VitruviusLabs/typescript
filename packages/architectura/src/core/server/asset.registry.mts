import { FileSystemService } from "../../service/file-system/file-system.service.mjs";

class AssetRegistry
{
	private static readonly PUBLIC_DIRECTORIES: Map<string, string> = new Map();

	/** @internal */
	public static GetPublicDirectories(): ReadonlyMap<string, string>
	{
		return this.PUBLIC_DIRECTORIES;
	}

	public static async AddPublicDirectory(url_path_start: string, base_directory_path: string): Promise<void>
	{
		await FileSystemService.ConfirmDirectoryExistence(base_directory_path);

		this.PUBLIC_DIRECTORIES.set(
			url_path_start.replace(/\/$/, ""),
			base_directory_path.replace(/\/$/, "")
		);
	}
}

export { AssetRegistry };
