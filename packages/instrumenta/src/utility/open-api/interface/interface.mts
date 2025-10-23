import type { InterfaceInstantiationInterface } from "./definition/interface/interface-instantiation.interface.mjs";

class Interface
{
	private static readonly NameRegularExpression: RegExp = /interface\s+(?<name>\w+)\s*\{?/g;
	private static readonly PropertiesRegularExpression: RegExp = /(?<property>[a-zA-Z]\w*)\??:\s*(?<type>[a-zA-Z][\w<>]*)/g;

	private readonly contents: string;
	private name: string | undefined;
	private readonly properties: Record<string, string> = {};

	public constructor(parameters: InterfaceInstantiationInterface)
	{
		this.contents = parameters.content;
	}

	protected extractName(): void
	{
		const match: RegExpExecArray | null = Interface.NameRegularExpression.exec(this.contents);

		if (match === null)
		{
			return undefined;
		}

		const name: string | undefined = match.groups?.["name"];

		Interface.NameRegularExpression.lastIndex = 0;

		this.name = name;
	}

	protected extractProperties(): void
	{
		let match: RegExpExecArray | null = Interface.PropertiesRegularExpression.exec(this.contents);

		if (match === null)
		{
			return;
		}

		while (match !== null)
		{
			const property: string | undefined = match.groups?.["property"];
			const type: string | undefined = match.groups?.["type"];

			if (property !== undefined && type !== undefined)
			{
				this.properties[property] = type;
			}

			match = Interface.PropertiesRegularExpression.exec(this.contents);
		}

		Interface.PropertiesRegularExpression.lastIndex = 0;
	}
}

export { Interface };
