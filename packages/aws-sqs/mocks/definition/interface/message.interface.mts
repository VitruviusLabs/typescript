import type { MessageInterface } from "../../../src/definition/interface/message.interface.mjs";
import { mockDefaultMessageAttributeInterface } from "./message-attribute.interface.mjs";

function mockDefaultMessageInterface(): MessageInterface
{
	return {
		Attributes: [mockDefaultMessageAttributeInterface()],
		MessageId: "1e78e7e5-1647-4282-b98b-ef4f1856d453",
		ReceiptHandle: "6967be4b-781b-4e0e-b3f8-f26d4e38fc0d",
		Body: JSON.stringify({
			foo: "bar",
		}),
		MD5OfBody: "9bb58f26192e4ba00f01e2e7b136bbd8",
	};
}

export { mockDefaultMessageInterface };
