import type { MessageAttributeInterface } from "./message-attribute.interface.mjs";

interface MessageInterface
{
  Attributes?: Array<MessageAttributeInterface>;
  MessageId: string;
  ReceiptHandle: string;
  Body: string;
  MD5OfBody: string;
  MD5OfMessageAttributes?: string;
  MessageAttributes?: Record<string, unknown>;
}

export type { MessageInterface };
