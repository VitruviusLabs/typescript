import type { MessageInterface } from "./message.interface.mjs";

interface ReceiveMessageResultInterface
{
	messages?: Array<MessageInterface> | null;
	Message?: MessageInterface | null;
}

export type { ReceiveMessageResultInterface };
