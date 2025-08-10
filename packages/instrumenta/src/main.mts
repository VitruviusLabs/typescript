import { extractInterfaceName } from "./utility/open-api/extract-interface-name.mjs";
import { extractInterfaceProperties } from "./utility/open-api/extract-interface-properties.mjs";
// import { interfaceToOpenAPISchema } from "./utility/open-api/interface-to-open-api-schema.mjs";

const interfaceContent: string = `
import type { SearchFragmentDateInterface } from "../../entity/auxiliary/search-fragment-date/definition/interface/search-fragment-date.interface.mjs";

interface BaseSearchPayloadInterface
{
	page?: number;
	limit?: number;
	uuids?: Array<string>;
	createdAt?: SearchFragmentDateInterface;
}

export type { BaseSearchPayloadInterface };
`;

const name: string | undefined = extractInterfaceName(interfaceContent);
const properties: Record<string, string> = extractInterfaceProperties(interfaceContent);
// const fullResult: string = interfaceToOpenAPISchema(interfaceContent);

console.debug(name);
console.debug(properties);
// console.debug(fullResult);
