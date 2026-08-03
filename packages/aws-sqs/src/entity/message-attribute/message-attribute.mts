import type { MessageAttributeInterface } from "./definition/interface/message-attribute.interface.mjs";

class MessageAttribute
{
	private readonly name: string;
	private readonly value: string;

	public constructor(parameters: MessageAttributeInterface)
	{
		this.name = parameters.Name;
		this.value = parameters.Value;
	}

	public getName(): string
	{
		return this.name;
	}

	public getValue(): string
	{
		return this.value;
	}
}

export { MessageAttribute };
