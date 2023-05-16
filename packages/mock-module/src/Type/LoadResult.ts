import type { ModuleFormat } from "./ModuleFormat.js";

import type { TypedArray } from "./TypedArray.js";

interface LoadResult
{
	shortCircuit: boolean | undefined;
	format: ModuleFormat;
	source: ArrayBuffer | TypedArray | string;
}

export type { LoadResult };
