import type { MessageInterface } from "../../../message/definition/interface/message.interface.mjs";

interface ReceiveMessageResultInterface
{
	messages?: Array<MessageInterface> | null;
	Message?: MessageInterface | null;
}

export type { ReceiveMessageResultInterface };
