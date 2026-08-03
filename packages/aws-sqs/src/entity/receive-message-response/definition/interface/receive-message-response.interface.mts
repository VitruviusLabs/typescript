import type { ReceiveMessageResultInterface } from "../../../receive-message-result/definition/interface/receive-message-result.interface.mjs";
import type { ResponseMetadataInterface } from "../../../response-metadata/definition/interface/response-metadata.interface.mjs";

interface ReceiveMessageResponseInterface
{
	ReceiveMessageResult: ReceiveMessageResultInterface | null;
	ResponseMetadata: ResponseMetadataInterface;
}

export type { ReceiveMessageResponseInterface };
