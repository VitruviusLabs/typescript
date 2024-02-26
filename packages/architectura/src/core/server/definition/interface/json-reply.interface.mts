import type { JSONObjectType } from "../../../../definition/type/json-object.type.mjs";
import type { ReplyInterface } from "./reply.interface.mjs";

interface JSONReplyInterface extends Omit<ReplyInterface, "contentType">
{
    payload: JSONObjectType;
}

export type { JSONReplyInterface };
