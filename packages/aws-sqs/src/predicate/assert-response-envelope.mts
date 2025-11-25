import type { ResponseEnvelopeInterface } from "../definition/interface/response-envelope.interface.mjs";
import { assertStructuredData } from "@vitruvius-labs/ts-predicate";
import { assertReceiveMessageResponse } from "./assert-receive-message-response.mjs";

function assertResponseEnvelope(value: unknown): asserts value is ResponseEnvelopeInterface
{
	assertStructuredData<ResponseEnvelopeInterface>(value, {
		ReceiveMessageResponse: {
			test: assertReceiveMessageResponse,
		},
	});
}

export { assertResponseEnvelope };
