import type { MessageInterface } from "../definition/interface/message.interface.mjs";
import type { ReceiveMessageResultInterface } from "../definition/interface/receive-message-result.interface.mjs";

import { assertMessageInterface } from "./assert-message-interface.mjs";
import { assertArray, assertStructuredData } from "@vitruvius-labs/ts-predicate/type-assertion";

function assertReceiveMessageResult(value: unknown): asserts value is ReceiveMessageResultInterface
{
	assertStructuredData<ReceiveMessageResultInterface>(value, {
		messages: {
			test: (messages: unknown): asserts messages is Array<MessageInterface> =>
			{
				assertArray(messages, {
					itemTest: assertMessageInterface,
				});
			},
			nullable: true,
			optional: true,
		},
		Message: {
			test: assertMessageInterface,
			nullable: true,
			optional: true,
		},
	});
}

export { assertReceiveMessageResult };
