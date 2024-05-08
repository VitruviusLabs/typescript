import type { ReceiveMessageResponseInterface } from "../definition/interface/receive-message-response.interface.mjs";
import { assertReceiveMessageResponse } from "../predicate/assert-receive-message-response.mjs";

import { ReceiveMessageResult } from "./receive-message-result.mjs";
import { ResponseMetadata } from "./response-metadata.mjs";

class ReceiveMessageResponse
{
	private readonly receiveMessageResult?: ReceiveMessageResult;
	private readonly responseMetadata: ResponseMetadata;

	private constructor(value: ReceiveMessageResponseInterface)
	{
		if (value.ReceiveMessageResult !== null)
		{
			this.receiveMessageResult = new ReceiveMessageResult(value.ReceiveMessageResult);
		}

		this.responseMetadata = new ResponseMetadata(value.ResponseMetadata);
	}

	public static Create(value: unknown): ReceiveMessageResponse
	{
		const instantiationInterface: unknown = value;

		assertReceiveMessageResponse(instantiationInterface);

		return new ReceiveMessageResponse(instantiationInterface);
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
