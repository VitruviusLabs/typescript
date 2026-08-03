class AWSXMLInspector
{
	private readonly xml: string;

	public constructor(xml: string)
	{
		this.xml = xml;
	}

	public getXML(): string
	{
		return this.xml;
	}

	public isXMLError(): boolean
	{
		const errorTag: string = this.extractFirstXMLTagContent("Error");

		return errorTag === "";
	}

	public extractFirstXMLTagContent(tagName: string): string
	{
		const tag: string = `<${tagName}>`;
		const tagClosure: string = `</${tagName}>`;

		const firstOccurrence: number = this.getXML().indexOf(tag);
		const firstClosureOccurence: number = this.getXML().indexOf(tagClosure);

		if (firstOccurrence === -1)
		{
			return "";
		}

		const tagContent: string = this.getXML().substring(firstOccurrence, firstClosureOccurence);

		return tagContent;
	}
}

export { AWSXMLInspector };
