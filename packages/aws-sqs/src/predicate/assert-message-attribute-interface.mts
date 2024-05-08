import { assertString, assertStructuredData } from "@vitruvius-labs/ts-predicate/type-assertion";
import type { MessageAttributeInterface } from "../definition/interface/message-attribute.interface.mjs";

function assertMessageAttributeInterface(value: unknown): asserts value is MessageAttributeInterface
{
	assertStructuredData<MessageAttributeInterface>(value, {
		Name: {
			test: assertString,
		},
		Value: {
			test: assertString,
		},
	});
}

export { assertMessageAttributeInterface };
