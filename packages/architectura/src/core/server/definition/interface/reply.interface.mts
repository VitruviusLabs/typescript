import type { JSONObjectType } from "../../../../definition/type/json-object.type.mjs";
import type { ContentTypeEnum } from "../enum/content-type.enum.mjs";
import type { HTTPStatusCodeEnum } from "../enum/http-status-code.enum.mjs";
import type { CookieDescriptorInterface } from "./cookie-descriptor.interface.mjs";

interface ReplyInterface
{
	status?: HTTPStatusCodeEnum;
	headers?: Array<[string, string]> | Headers | Map<string, string> | Record<string, string>;
	cookies?: Array<CookieDescriptorInterface>;
	contentType?: ContentTypeEnum | string;
	payload?: Buffer | JSONObjectType | string;
}

export type { ReplyInterface };
