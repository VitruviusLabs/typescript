import { isDefined } from "@vitruvius-labs/ts-predicate/type-guard";
import type { MessageInterface } from "../definition/interface/message.interface.mjs";
import type { ReceiveMessageResultInterface } from "../definition/interface/receive-message-result.interface.mjs";

import { Message } from "./message.mjs";

class ReceiveMessageResult
{
	private readonly messages: Array<Message> = [];

	public constructor(parameters: ReceiveMessageResultInterface)
	{
		let messages: Array<MessageInterface> = [];

		if (isDefined(parameters.messages))
		{
			messages = parameters.messages;
		}

		if (isDefined(parameters.Message))
		{
			messages = [parameters.Message];
		}

		if (parameters.messages === undefined && parameters.Message === undefined)
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
