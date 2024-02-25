import type { LoadContext } from "../interface/load-context.mjs";
import type { LoadResult } from "../interface/load-result.mjs";

type NextLoad = (module_identifier: string, context: LoadContext) => Promise<LoadResult>;

export type { NextLoad };
