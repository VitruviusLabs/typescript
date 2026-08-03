import { isArray } from "@vitruvius-labs/ts-predicate";
import { MessageAttribute } from "../message-attribute/message-attribute.mjs";
import type { MessageInterface } from "./definition/interface/message.interface.mjs";

class Message
{
	private readonly attributes: Array<MessageAttribute>;
	private readonly messageId: string;
	private readonly receiptHandle: string;
	private readonly body: string;
	private readonly md5OfBody: string;

	public constructor(parameters: MessageInterface)
	{
		this.attributes = [];
		this.messageId = parameters.MessageId;
		this.receiptHandle = parameters.ReceiptHandle;

		// This is an unfortunate hack that is necessary to circumvent a bug in LocalStack.
		// See: https://github.com/localstack/localstack/issues/8451
		/* c8 ignore next */
		const cleanedBody: string = parameters.Body.replaceAll(/(?:__marker__\\?)/g, "");

		this.body = cleanedBody;
		this.md5OfBody = parameters.MD5OfBody;

		if (isArray(parameters.Attributes))
		{
			for (const attribute of parameters.Attributes)
			{
				this.attributes.push(new MessageAttribute(attribute));
			}
		}
	}

	public getAttributes(): Array<MessageAttribute>
	{
		return this.attributes;
	}

	public getMessageId(): string
	{
		return this.messageId;
	}

	public getReceiptHandle(): string
	{
		return this.receiptHandle;
	}

	public getBody(): string
	{
		return this.body;
	}

	public getMd5OfBody(): string
	{
		return this.md5OfBody;
	}
}

export { Message };
