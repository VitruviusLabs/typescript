import type { ResponseEnvelopeInterface } from "../definition/interface/response-envelope.interface.mjs";

import { ReceiveMessageResponse } from "./receive-message-response.mjs";

class ResponseEnvelope
{
	private readonly receiveMessageResponse: ReceiveMessageResponse;

	public constructor(parameters: ResponseEnvelopeInterface)
	{
		this.receiveMessageResponse = new ReceiveMessageResponse(parameters.ReceiveMessageResponse);
	}

	public getReceiveMessageResponse(): ReceiveMessageResponse
	{
		return this.receiveMessageResponse;
	}
}

export { ResponseEnvelope };
