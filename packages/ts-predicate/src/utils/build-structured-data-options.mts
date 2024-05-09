import type { StructuredDataOptions } from "../definition/interface/structured-data-options.mjs";

/** @internal */
function buildStructuredDataOptions(options?: StructuredDataOptions | undefined): Required<StructuredDataOptions>
{
	return {
		allowExtraneousProperties: false,
		...options,
	};
}

export { buildStructuredDataOptions };
