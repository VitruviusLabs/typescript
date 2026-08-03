import type { AWSJSONErrorInterface } from "./aws-json-error.interface.mjs";

interface AWSJSONGenericResponseInterface
{
	Error?: AWSJSONErrorInterface;
	RequestId: string;
}

export type { AWSJSONGenericResponseInterface };
