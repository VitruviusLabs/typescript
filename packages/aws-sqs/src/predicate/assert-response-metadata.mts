import type { ResponseMetadataInterface } from "../definition/interface/response-metadata.interface.mjs";
import { assertString, assertStructuredData } from "@vitruvius-labs/ts-predicate";

function assertResponseMetadata(value: unknown): asserts value is ResponseMetadataInterface
{
	assertStructuredData<ResponseMetadataInterface>(value, {
		RequestId: {
			test: assertString,
		},
	});
}

export { assertResponseMetadata };
