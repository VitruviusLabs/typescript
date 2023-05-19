import type { ModuleFormat } from "./ModuleFormat.mjs";

import type { TypedArray } from "./TypedArray.mjs";

interface LoadResult
{
	shortCircuit: boolean | undefined;
	format: ModuleFormat;
	source: ArrayBuffer | TypedArray | string;
}

export type { LoadResult };
