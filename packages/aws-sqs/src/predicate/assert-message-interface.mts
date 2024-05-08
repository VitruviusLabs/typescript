import type { MessageInterface } from "../definition/interface/message.interface.mjs";
import type { MessageAttributeInterface } from "../definition/interface/message-attribute.interface.mjs";

import { assertMessageAttributeInterface } from "./assert-message-attribute-interface.mjs";
import { assertArray, assertRecord, assertString, assertStructuredData } from "@vitruvius-labs/ts-predicate/type-assertion";

function assertMessageInterface(value: unknown): asserts value is MessageInterface
{
	assertStructuredData<MessageInterface>(value, {
		Attributes: {
			test: (scopedValue: unknown): asserts scopedValue is Record<string, unknown> =>
			{
				assertArray<MessageAttributeInterface>(scopedValue, {
					itemTest: assertMessageAttributeInterface,
				});
			},
			optional: true,
			nullable: true,
		},
		MessageId: {
			test: assertString,
		},
		ReceiptHandle: {
			test: assertString,
		},
		Body: {
			test: assertString,
		},
		MD5OfBody: {
			test: assertString,
		},
		MD5OfMessageAttributes: {
			test: assertString,
			optional: true,
			nullable: true,
		},
		MessageAttributes: {
			test: (scopedValue: unknown): asserts scopedValue is Record<string, unknown> =>
			{
				assertRecord<Record<string, unknown>>(scopedValue);
			},
			optional: true,
			nullable: true,
		},
	});
}

export { assertMessageInterface };
