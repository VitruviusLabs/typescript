import type { MessageInterface } from "../definition/interface/message.interface.mjs";

class Message
{
	private readonly messageId: string;
	private readonly receiptHandle: string;
	private readonly body: string;
	private readonly md5OfBody: string;

	public constructor(parameters: MessageInterface)
	{
		this.messageId = parameters.MessageId;
		this.receiptHandle = parameters.ReceiptHandle;

		// This is an unforunate hack that is necessary to circumvent a bug in LocalStack.
		// See: https://github.com/localstack/localstack/issues/8451
		/* c8 ignore next */
		const cleanedBody: string = parameters.Body.replaceAll(/(?:__marker__\\?)/g, "");

		this.body = cleanedBody;
		this.md5OfBody = parameters.MD5OfBody;
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
