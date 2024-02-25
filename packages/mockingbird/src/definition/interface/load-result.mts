import type { ModuleFormat } from "../enum/module-format.mjs";
import type { TypedArray } from "../type/typed-array.mjs";

interface LoadResult
{
	format: ModuleFormat;
	shortCircuit: boolean | undefined;
	source: ArrayBuffer | TypedArray | string;
}

export type { LoadResult };
