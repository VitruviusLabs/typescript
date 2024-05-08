import type { ResponseEnvelopeInterface } from "../definition/interface/response-envelope.interface.mjs";

import { assertReceiveMessageResponse } from "./assert-receive-message-response.mjs";
import { assertStructuredData } from "@vitruvius-labs/ts-predicate/type-assertion";

function assertResponseEnvelope(value: unknown): asserts value is ResponseEnvelopeInterface
{
	assertStructuredData<ResponseEnvelopeInterface>(value, {
		ReceiveMessageResponse: {
			test: assertReceiveMessageResponse,
		},
	});
}

export { assertResponseEnvelope };
