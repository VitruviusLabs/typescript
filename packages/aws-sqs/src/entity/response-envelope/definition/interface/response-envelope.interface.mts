import type { ReceiveMessageResponseInterface } from "../../../receive-message-response/definition/interface/receive-message-response.interface.mjs";

interface ResponseEnvelopeInterface
{
	ReceiveMessageResponse: ReceiveMessageResponseInterface;
}

export type { ResponseEnvelopeInterface };
