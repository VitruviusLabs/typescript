import { isString, isStructuredData } from "@vitruvius-labs/ts-predicate";
import type { AWSJSONGenericResponseInterface } from "../interface/aws-json-generic-response.interface.mjs";
import { isAWSJSONErrorInterface } from "./is-aws-json-error-interface.mjs";

function isAWSJSONGenericResponseInterface(value: unknown): value is AWSJSONGenericResponseInterface
{
	return isStructuredData<AWSJSONGenericResponseInterface>(
		value,
		{
			Error: {
				test: isAWSJSONErrorInterface,
				optional: true,
			},
			RequestId: {
				test: isString,
			},
		}
	);
}

export { isAWSJSONGenericResponseInterface };
