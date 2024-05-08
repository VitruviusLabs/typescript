import type { ReceiveMessageResultInterface } from "./receive-message-result.interface.mjs";
import type { ResponseMetadataInterface } from "./response-metadata.interface.mjs";

interface ReceiveMessageResponseInterface
{
  ReceiveMessageResult: ReceiveMessageResultInterface | null;
  ResponseMetadata: ResponseMetadataInterface;
}

export type { ReceiveMessageResponseInterface };
