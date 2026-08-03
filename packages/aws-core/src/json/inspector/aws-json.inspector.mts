import type { AWSJSONGenericResponseInterface } from "./definition/interface/aws-json-generic-response.interface.mjs";
import { isAWSJSONGenericResponseInterface } from "./definition/predicate/is-aws-json-generic-response-interface.mjs";

class AWSJSONInspector
{
	private readonly json: string;

	public constructor(json: string)
	{
		this.json = json;
	}

	public getJSON(): string
	{
		return this.json;
	}

	public safeParse(): AWSJSONGenericResponseInterface | undefined
	{
		try
		{
			const parsedJSON: unknown = JSON.parse(this.getJSON());

			if (isAWSJSONGenericResponseInterface(parsedJSON))
			{
				return parsedJSON;
			}
		}
		catch
		{
			return undefined;
		}

		return undefined;
	}

	public isJSONError(): boolean
	{
		const parsedJSON: unknown = this.safeParse();

		return isAWSJSONGenericResponseInterface(parsedJSON) && parsedJSON.Error !== undefined;
	}
}

export { AWSJSONInspector };
