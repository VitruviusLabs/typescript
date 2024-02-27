import { ContentTypeEnum } from "../../core/server/definition/enum/content-type.enum.mjs";
import { EXTENSION_TO_MIME_TYPE_MAPPING } from "./mime-types-mapping.mjs";

class ContentType
{
	public static Get(extension: string): string
	{
		return EXTENSION_TO_MIME_TYPE_MAPPING.get(extension) ?? ContentTypeEnum.UNKNOWN;
	}
}

export { ContentType };
