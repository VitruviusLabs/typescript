import type { MessageAttributeInterface } from "../../../src/entity/message-attribute/definition/interface/message-attribute.interface.mjs";

function mockDefaultMessageAttributeInterface(): MessageAttributeInterface
{
	return {
		Name: "foo",
		Value: "bar",
	};
}

export { mockDefaultMessageAttributeInterface };
