import type { ReplyInterface } from "../definition/interface/reply.interface.mjs";
import { TypeGuard } from "@vitruvius-labs/ts-predicate";
import { ContentTypeEnum } from "../definition/enum/content-type.enum.mjs";

function resolveContentType(parameters: ReplyInterface): string | undefined
{
	if (parameters.payload === undefined)
	{
		return undefined;
	}

	if (parameters.contentType !== undefined)
	{
		return parameters.contentType;
	}

	if (TypeGuard.isRecord(parameters.payload))
	{
		return ContentTypeEnum.JSON;
	}

	return ContentTypeEnum.TEXT;
}

export { resolveContentType };
