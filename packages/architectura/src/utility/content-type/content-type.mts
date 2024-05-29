import { ContentTypeEnum } from "../../core/server/definition/enum/content-type.enum.mjs";
import { EXTENSION_TO_MIME_TYPE_MAPPING } from "./mime-types-mapping.mjs";

/**
 * Content type utility
 *
 * @sealed
 */
class ContentType
{
	/**
	 * Get content type by file extension.
	 *
	 * @remarks
	 * Returns "application/octet-stream" if the extension is unknown.
	 */
	public static Get(extension: string): string
	{
		return EXTENSION_TO_MIME_TYPE_MAPPING.get(extension) ?? ContentTypeEnum.BINARY;
	}
}

export { ContentType };
