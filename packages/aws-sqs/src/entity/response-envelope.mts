import type { ResponseEnvelopeInterface } from "../definition/interface/response-envelope.interface.mjs";
import { assertResponseEnvelope } from "../predicate/assert-response-envelope.mjs";

import { ReceiveMessageResponse } from "./receive-message-response.mjs";

class ResponseEnvelope
{
	private readonly receiveMessageResponse: ReceiveMessageResponse;

	private constructor(value: ResponseEnvelopeInterface)
	{
		this.receiveMessageResponse = ReceiveMessageResponse.Create(value.ReceiveMessageResponse);
	}

	public static Create(value: unknown): ResponseEnvelope
	{
		const instantiationInterface: unknown = value;

		assertResponseEnvelope(instantiationInterface);

		return new ResponseEnvelope(instantiationInterface);
	}

	public getReceiveMessageResponse(): ReceiveMessageResponse
	{
		return this.receiveMessageResponse;
	}
}

export { ResponseEnvelope };
