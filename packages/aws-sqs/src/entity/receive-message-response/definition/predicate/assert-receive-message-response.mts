import type { ReceiveMessageResponseInterface } from "../interface/receive-message-response.interface.mjs";
import { assertStructuredData } from "@vitruvius-labs/ts-predicate";
import { assertReceiveMessageResult } from "../../../receive-message-result/definition/predicate/assert-receive-message-result.mjs";
import { assertResponseMetadata } from "../../../response-metadata/definition/predicate/assert-response-metadata.mjs";

function assertReceiveMessageResponse(value: unknown): asserts value is ReceiveMessageResponseInterface
{
	assertStructuredData<ReceiveMessageResponseInterface>(value, {
		ReceiveMessageResult: {
			test: assertReceiveMessageResult,
			nullable: true,
		},
		ResponseMetadata: {
			test: assertResponseMetadata,
		},
	});
}

export { assertReceiveMessageResponse };
