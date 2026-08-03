import { isString, isStructuredData } from "@vitruvius-labs/ts-predicate";
import type { AWSJSONErrorInterface } from "../interface/aws-json-error.interface.mjs";

function isAWSJSONErrorInterface(value: unknown): value is AWSJSONErrorInterface
{
	return isStructuredData<AWSJSONErrorInterface>(
		value,
		{
			Code: {
				test: isString,
			},
			Type: {
				test: isString,
			},
			Message: {
				test: isString,
			},
		}
	);
}

export { isAWSJSONErrorInterface };
