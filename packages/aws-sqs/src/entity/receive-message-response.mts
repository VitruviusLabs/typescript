import type { ReceiveMessageResponseInterface } from "../definition/interface/receive-message-response.interface.mjs";

import { ReceiveMessageResult } from "./receive-message-result.mjs";
import { ResponseMetadata } from "./response-metadata.mjs";

class ReceiveMessageResponse
{
	private readonly receiveMessageResult?: ReceiveMessageResult;
	private readonly responseMetadata: ResponseMetadata;

	public constructor(parameters: ReceiveMessageResponseInterface)
	{
		if (parameters.ReceiveMessageResult !== null)
		{
			this.receiveMessageResult = new ReceiveMessageResult(parameters.ReceiveMessageResult);
		}

		this.responseMetadata = new ResponseMetadata(parameters.ResponseMetadata);
	}

	public getReceiveMessageResult(): ReceiveMessageResult | undefined
	{
		return this.receiveMessageResult;
	}

	public getResponseMetadata(): ResponseMetadata
	{
		return this.responseMetadata;
	}
}

export { ReceiveMessageResponse };
