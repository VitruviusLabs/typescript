import type { MessageAttributeInterface } from "./message-attribute.interface.mjs";

interface MessageInterface
{
	Attributes?: Array<MessageAttributeInterface> | null;
	MessageId: string;
	ReceiptHandle: string;
	Body: string;
	MD5OfBody: string;
	MD5OfMessageAttributes?: string | null;
	MessageAttributes?: Record<string, unknown> | null;
}

export type { MessageInterface };
