import type { MessageInterface } from "../definition/interface/message.interface.mjs";
import type { ReceiveMessageResultInterface } from "../definition/interface/receive-message-result.interface.mjs";

import { Message } from "./message.mjs";

class ReceiveMessageResult
{
	private readonly messages: Array<Message> = [];

	public constructor(value: ReceiveMessageResultInterface)
	{
		let messages: Array<MessageInterface> = [];

		if (value.messages !== undefined && value.messages !== null)
		{
			messages = value.messages;
		}

		if (value.Message !== undefined && value.Message !== null)
		{
			messages = [value.Message];
		}

		if (value.messages === undefined && value.Message === undefined)
		{
			throw new Error("The ReceiveMessageResultInterface must contain either a messages property or a Message property.");
		}

		for (const message of messages)
		{
			this.messages.push(new Message(message));
		}
	}

	public getMessages(): Array<Message>
	{
		return this.messages;
	}
}

export { ReceiveMessageResult };
