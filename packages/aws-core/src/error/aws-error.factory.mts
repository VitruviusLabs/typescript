import { AWSJSONInspector } from "../json/inspector/aws-json.inspector.mjs";
import type { AWSJSONGenericResponseInterface } from "../json/inspector/definition/interface/aws-json-generic-response.interface.mjs";
import { AWSXMLInspector } from "../xml/inspector/aws-xml.inspector.mjs";
import { AWSError } from "./aws.error.mjs";

class AWSErrorFactory
{
	public static CreateFromStringPayload(payload: string): AWSError | undefined
	{
		const xmlInspector: AWSXMLInspector = new AWSXMLInspector(payload);

		if (xmlInspector.isXMLError())
		{
			return new AWSError(
				{
					type: xmlInspector.extractFirstXMLTagContent("Type"),
					code: xmlInspector.extractFirstXMLTagContent("Code"),
					message: xmlInspector.extractFirstXMLTagContent("Message"),
				}
			);
		}

		const jsonInspector: AWSJSONInspector = new AWSJSONInspector(payload);

		if (jsonInspector.isJSONError())
		{
			const contents: AWSJSONGenericResponseInterface | undefined = jsonInspector.safeParse();

			if (contents === undefined || contents.Error === undefined)
			{
				return undefined;
			}

			return new AWSError(
				{
					code: contents.Error.Code,
					type: contents.Error.Type,
					message: contents.Error.Message,
				}
			);
		}

		return undefined;
	}
}

export { AWSErrorFactory };
