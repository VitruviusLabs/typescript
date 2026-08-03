import type { MessageInterface } from "../../../message/definition/interface/message.interface.mjs";
import type { ReceiveMessageResultInterface } from "../interface/receive-message-result.interface.mjs";
import { assertArray, assertStructuredData } from "@vitruvius-labs/ts-predicate";
import { assertMessageInstantiationInterface } from "../../../message/definition/predicate/assert-message-instantiation-interface.mjs";

function assertReceiveMessageResult(value: unknown): asserts value is ReceiveMessageResultInterface
{
	assertStructuredData<ReceiveMessageResultInterface>(value, {
		messages: {
			test: (messages: unknown): asserts messages is Array<MessageInterface> =>
			{
				assertArray(messages, {
					itemTest: assertMessageInstantiationInterface,
				});
			},
			nullable: true,
			optional: true,
		},
		Message: {
			test: assertMessageInstantiationInterface,
			nullable: true,
			optional: true,
		},
	});
}

export { assertReceiveMessageResult };
