import type { MessageInterface } from "../interface/message.interface.mjs";
import type { MessageAttributeInterface } from "../../../message-attribute/definition/interface/message-attribute.interface.mjs";
import { assertArray, assertRecord, assertString, assertStructuredData } from "@vitruvius-labs/ts-predicate";
import { assertMessageAttributeInterface } from "../../../message-attribute/definition/predicate/assert-message-attribute-interface.mjs";

function assertMessageInstantiationInterface(value: unknown): asserts value is MessageInterface
{
	assertStructuredData<MessageInterface>(value, {
		Attributes: {
			test: (attributes: unknown): asserts attributes is Array<MessageAttributeInterface> =>
			{
				assertArray<MessageAttributeInterface>(attributes, {
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
			test: (message_attributes: unknown): asserts message_attributes is Record<string, unknown> =>
			{
				assertRecord<unknown>(message_attributes);
			},
			optional: true,
			nullable: true,
		},
	});
}

export { assertMessageInstantiationInterface };
