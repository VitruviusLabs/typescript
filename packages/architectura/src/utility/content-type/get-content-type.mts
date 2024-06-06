import { ContentTypeEnum } from "../../core/server/definition/enum/content-type.enum.mjs";
import { EXTENSION_TO_MIME_TYPE_MAPPING } from "./mime-types-mapping.mjs";

/**
 * Get content type by file extension.
 *
 * @remarks
 * Returns "application/octet-stream" if the extension is unknown.
 */
function getContentType(extension: string): string
{
	const EXTENSION: string = extension.startsWith(".") ? extension.slice(1) : extension;

	return EXTENSION_TO_MIME_TYPE_MAPPING.get(EXTENSION) ?? ContentTypeEnum.BINARY;
}

export { getContentType };
