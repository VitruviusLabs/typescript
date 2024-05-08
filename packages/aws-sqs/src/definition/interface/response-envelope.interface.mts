import type { ReceiveMessageResponseInterface } from "./receive-message-response.interface.mjs";

interface ResponseEnvelopeInterface
{
	ReceiveMessageResponse: ReceiveMessageResponseInterface;
}

export type { ResponseEnvelopeInterface };
