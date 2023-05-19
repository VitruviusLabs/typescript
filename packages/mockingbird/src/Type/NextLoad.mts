import type { LoadContext } from "./LoadContext.mjs";

import type { LoadResult } from "./LoadResult.mjs";

type NextLoad = (module_identifier: string, context: LoadContext) => Promise<LoadResult>;

export type { NextLoad };
