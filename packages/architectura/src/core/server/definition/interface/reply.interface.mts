import type { JSONObjectType } from "../../../../definition/type/json-object.type.mjs";
import type { ContentTypeEnum } from "../enum/content-type.enum.mjs";
import type { HTTPStatusCodeEnum } from "../enum/http-status-code.enum.mjs";

interface ReplyInterface
{
    status: HTTPStatusCodeEnum;
    payload: Buffer | JSONObjectType | ReadableStream | string;
    contentType?: ContentTypeEnum | string;
}

export type { ReplyInterface };
