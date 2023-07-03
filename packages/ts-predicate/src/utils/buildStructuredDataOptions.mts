import type { StructuredDataOptions } from "../index.mjs";

function buildStructuredDataOptions(options?: StructuredDataOptions | undefined): Required<StructuredDataOptions>
{
	return {
		allowExtraneousProperties: false,
		...options
	};
}

export { buildStructuredDataOptions };
